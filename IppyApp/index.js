const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const todoRoutes = require('./router')
const https = require('https');
const hsts = require('hsts');
const fs = require('fs');
const PORT = process.env.PORT || 80;
const path = require('path');
const mailer = require('express-mailer');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');



const app = express();
const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs'
});



// https config
var options = {
    key: fs.readFileSync('keys/private.pem'),
    cert: fs.readFileSync('keys/certificate.crt')
};

// https only
app.enable('trust proxy');
app.use(function (request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
});



//hsts config
// const hstsMiddleware = hsts({
//     maxAge: 1234000
// });
// app.use((req, res, next) => {
//     if (req.secure) {
//         hstsMiddleware(req, res, next)
//     } else {
//         next()
//     }
// });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes);



const User = require('./models/user');
const Order = require('./schema');

//write folowing strings to use mail
mailer.extend(app, {
    from: '',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: '',
      pass: ''
    }
});

app.post('/order', async (req, res) => {
    let cashback = req.body.cashback;
    let sum = req.body.totalPrice;
    let isCashbackUsed = false;

    if(!cashback){
        sum = sum;
        cashback = 0;
    } else {
        sum = sum - cashback;
        isCashbackUsed = true
    }


    const order = new Order({
        user: req.body.email || "Without Registartion",
        name: req.body.name,
        tel: req.body.tel,
        
        nominalSum: req.body.totalPrice,
        usedCahback: cashback,
        isCashbackUsed: isCashbackUsed,
        totalSum: sum,

        memory: req.body.memory,
        color: req.body.color
    });
    await order.save().then(res.redirect('/thankYou')); //create "Thank You Page"
    console.log("Data has been saved");

    //change user info here
    const user = await User.findOne({username: order.user});
    try {
        if(user == null) {
            console.log("User not found")
            
        } else {
            //cashback formula
            if (isCashbackUsed == true) {
                user.sum = Math.floor(order.totalSum/100);
            } else {
                user.sum += Math.floor(order.totalSum/100);
            }
            await user.save().then(console.log("User data has been changed"));
        }


        //send info to user
        app.mailer.send('partials/msg', {
            from: '',
            to: order.user, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
            subject: "Thank you" // REQUIRED.
        }, function (err) {
        if (err) {
            // handle error
            console.log(err);
            res.send('There was an error sending the email');
            return;
        }
        });
        console.log("Data has been sent to client");


    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Server Error'});
    }
});







async function start() { 
    try {
        await mongoose.connect('').then(
            () => { console.log('...') })
        app.listen(PORT, () => {
            https.createServer(options, app).listen(443);
            console.log('Server has been started');
        });
    }
    catch (error) {
        console.log(error);
    }
}
start();
