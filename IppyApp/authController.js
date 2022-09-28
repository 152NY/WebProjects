const User = require('./models/user');
const Role = require('./models/role');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require('./config');
const Order = require('./schema');


const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    };
    return jwt.sign(payload, secret, {expiresIn:"24h"} );

};


class authController {
    async registration(req, res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибка при регистрации', errors});
            }
            const username = req.body.username;
            const password = req.body.password;
            const name = req.body.name;
            const tel = req.body.tel;

            const candidate = await User.findOne({username}); 
            if (candidate){
                return res.status(400).json({message: 'Пользователь уже существует'});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, name, tel, roles: ["USER"]});
            await user.save();
            return res.json({message: "Пользователь сохранён"});


        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Server Error'});
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username: username});
            

            if(!user){
                return res.status(400).json({message: 'Пользователь не найден'});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message: 'Введён неверный пароль'});
            }

            const token = generateAccessToken(user._id, user.roles);
            // const orders = await Order.find({user: username});

            res.render('myPage',{
                title: 'list',
                user,
                token
            });
            // return res.json({token})

        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Server Error'});
        }
    }

    // async getUsers(req, res){
    //     try {

    //     } catch(e) {

    //     }
    // } 
}
module.exports = new authController();