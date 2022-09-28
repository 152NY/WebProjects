const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const todoRoutes = require('./router');
const fs = require('fs');
const PORT = process.env.PORT || 80;
const path = require('path');
const multer = require('multer');
const mailer = require('express-mailer');
const https = require('https');
// const hsts = require('hsts');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }, 
    extname: 'hbs'
});

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



const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    // filename: (req, file, cb) => {
    //     cb(null, file.originalname);
    // }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"){
            cb(null,true);
    }
    else {
        cb(null, false);
    }
}


// https config
var options = {
    key: fs.readFileSync('keys/private.key'),
    cert: fs.readFileSync('keys/certificate.crt')
};

// https only
app.enable('trust proxy');
app.use(function (request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
})

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


app.use(multer({storage: storageConfig, fileFilter: fileFilter }).array("filedata",7)); 

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes);


app.post('/msg', async (req, res) => {
    const person = {
        objectID: req.body.object,
        name:req.body.name,
        email: req.body.email,
        phone: req.body.tel
    };
    app.mailer.send('msg', {
        from: '',
        to: "", // REQUIRED. This can be a comma delimited string just like a normal email to field. 
        subject: person.objectID + " " + person.name + " " + person.email + " " + person.phone, // REQUIRED.
    }, function (err) {
      if (err) {
        // handle error
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
      res.redirect('/');
    });
});



async function start() {
    try {
        await mongoose.connect('').then( //MongoDB connect
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
