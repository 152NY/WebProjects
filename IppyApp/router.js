const {Router} = require('express');
const router = Router();
const Order = require('./schema');
const controller = require('./authController');
const {check} = require("express-validator");
const User = require('./models/user');



//registration
router.post('/registration', [
        check('username', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть длинной от 8 до 10 символов").isLength({min:8, max:10})
    ],
    controller.registration);

router.post('/login', controller.login);
router.get('/users', controller.getUsers);





router.get('/', (req, res) => {
    res.render('index',{
        title: 'list'
    });
});


router.get('/cart', (req, res) => {
    res.render('cart')
});

router.get('/lk', (req, res) => {
    res.render('lk')
});
router.get('/lkReg', (req, res) => {
    res.render('lkReg')
});
router.get('/login', (req, res) => {
    res.render('myPage')
});
router.get('/thankYou', (req, res) => {
    res.render('thankYou')
});

//iPhones
router.get('/iPhone', (req, res) => {
    res.render('iPhone')
});
router.get('/iPhone14', (req, res) => {
    res.render('iPhone14')
});
router.get('/iPhone14Plus', (req, res) => {
    res.render('iPhone14Plus')
});
router.get('/iPhone14Pro', (req, res) => {
    res.render('iPhone14Pro')
});
router.get('/iPhone14ProMax', (req, res) => {
    res.render('iPhone14ProMax')
});
router.get('/iPhone13', (req, res) => {
    res.render('iPhone13')
});
router.get('/iPhoneSE', (req, res) => {
    res.render('iPhoneSE')
});


//mac
router.get('/mac', (req, res) => {
    res.render('mac')
});
router.get('/MBAM1', (req, res) => {
    res.render('MBAM1')
});
router.get('/MBAM2', (req, res) => {
    res.render('MBAM2')
});
router.get('/MBP13', (req, res) => {
    res.render('MBP13')
});
router.get('/MBP14', (req, res) => {
    res.render('MBP14')
});
router.get('/MBP16', (req, res) => {
    res.render('MBP16')
});
router.get('/otherMac', (req, res) => {
    res.render('otherMac')
});

//watch
router.get('/watch', (req, res) => {
    res.render('aw')
});
router.get('/AWSE', (req, res) => {
    res.render('AWSE')
});
router.get('/AWS8', (req, res) => {
    res.render('AWS8')
});
router.get('/AWU', (req, res) => {
    res.render('AWU')
});

//ipad
router.get('/iPad', (req, res) => {
    res.render('iPad')
});
router.get('/iPad9', (req, res) => {
    res.render('iPad9')
});
router.get('/iPadAir', (req, res) => {
    res.render('iPadAir')
});
router.get('/iPadMini', (req, res) => {
    res.render('iPadMini')
});
router.get('/iPadPro11', (req, res) => {
    res.render('iPadPro11')
});
router.get('/iPadPro12', (req, res) => {
    res.render('iPadPro12')
});

//AirPods
router.get('/airpods', (req, res) => {
    res.render('airpods')
});

//Accessories
router.get('/accessories', (req, res) => {
    res.render('accessories')
});

module.exports = router;
