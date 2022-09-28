const {Router} = require('express');
const Building = require('./model');
const router = Router();



router.get('/', async (req, res) => {
    const todos = await Building.find({})
    res.render('index',{
        title: 'list',
        todos
    });
   
})


router.get('/msg', (req, res) => { 
    res.render('msg')
})

router.get('/create', (req, res) => { 
    res.render('create')
})

router.get('/contacts', (req, res) => { 
    res.render('contacts')
})

router.get('/privacyPolicy', (req, res) => { 
    res.render('legal_info/privacyPolicy')
})

router.get('/tc', (req, res) => { 
    res.render('legal_info/tc')
})

router.get('/imprint', (req, res) => { 
    res.render('legal_info/imprint')
})





//Options pages
router.get('/sell', async (req, res) => { 
    const todos = await Building.find()
    res.render('sell',{
        title: 'list',
        todos
    });
})

router.get('/map', async (req, res) => { 
    const todos = await Building.find({selector: 'Townhouses'})
    res.render('map',{
        title: 'list',
        todos
    });
})

router.post('/viewOnMap', async (req, res) => {
    try{
        const object = await Building.findOne({id: req.body.objID});
        res.render('item', {
            title: 'list',
            object
        })
    } catch(e){
        console.log(e);
    }
});

//end of options pages


router.post('/create', async (req, res) => {

   
    let path = Array.from(req.files.map(file => file.path).values());
    let pathSTR = new Array();
    for (let i = 0; i < path.length; i++) {
        pathSTR[i] = path[i].replace(/^public/,'.');
    }
    

    const building = new Building({
        //block of primary data
        id: req.body.id,
        selector: req.body.selector,
        address: req.body.address,
        lng: req.body.lng,
        lat: req.body.lat,
        price: req.body.price,

        //multilang description
        descriptionEN: req.body.descriptionEN,
        descriptionDE: req.body.descriptionDE,
        descriptionRU: req.body.descriptionRU,

        //Photos block
        filePathFirst: pathSTR[0],
        filePathSecond: pathSTR[1],
        filePathThird: pathSTR[2],
        filePathForth: pathSTR[3],
        filePathFifth: pathSTR[4],
        filePathSixth: pathSTR[5],
        filePathSeventh: pathSTR[6]

    });


    await building.save().then(res.redirect('/'));
    console.log("Data has been saved") 
})
module.exports = router;