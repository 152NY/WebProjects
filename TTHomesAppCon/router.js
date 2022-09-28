const {Router} = require('express');
const Todo = require('./model');
const router = Router();



router.get('/', async (req, res) => {
    const todos = await Todo.find({})
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
router.get('/villas', async (req, res) => { 
    const todos = await Todo.find({selector: "Villas"})
    res.render('villas',{
        title: 'list',
        todos
    });
   
})
router.get('/townhouses', async (req, res) => { 
    const todos = await Todo.find({selector: "Townhouses"})
    res.render('townhouses',{
        title: 'list',
        todos
    });
})
router.get('/flats', async (req, res) => { 
    const todos = await Todo.find({selector: "Flats"})
    res.render('flats',{
        title: 'list',
        todos
    });
})
//end of options pages





//country filter
//Spain
router.get('/spainSell', async (req, res) => { 
    const todos = await Todo.find({selector: "Sell", country: "Spain"})
    res.render('spainSell',{
        title: 'list',
        todos
    });
})
router.get('/spainRent', async (req, res) => { 
    const todos = await Todo.find({selector: "Rent", country: "Spain"})
    res.render('spainRent',{
        title: 'list',
        todos
    });
})
router.get('/spainLands', async (req, res) => { 
    const todos = await Todo.find({selector: "Lands/Projects", country: "Spain"})
    res.render('spainLands',{
        title: 'list',
        todos
    });
})
//Thailand
router.get('/thaiSell', async (req, res) => { 
    const todos = await Todo.find({selector: "Sell", country: "Thailand"})
    res.render('thaiSell',{
        title: 'list',
        todos
    });
})
router.get('/thaiRent', async (req, res) => { 
    const todos = await Todo.find({selector: "Rent", country: "Thailand"})
    res.render('thaiRent',{
        title: 'list',
        todos
    });
})
router.get('/thaiLands', async (req, res) => { 
    const todos = await Todo.find({selector: "Lands/Projects", country: "Thailand"});
    res.render('thaiLands',{
        title: 'list',
        todos
    });
})
//end of country filter//


router.post('/viewOnMap', async (req, res) => {
    const object = await Todo.findOne({id: req.body.objID});
    res.render('item', {
        title: 'list',
        object
    })
});


router.post('/create', async (req, res) => {

   
    let path = Array.from(req.files.map(file => file.path).values());
    let pathSTR = new Array();
    for (let i = 0; i < path.length; i++) {
        pathSTR[i] = path[i].replace(/^public/,'.');
    }
    

    const todo = new Todo({
        //block of primary data
        id: req.body.id,
        country: req.body.country,
        selector: req.body.selector,
        address: req.body.address,
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


    await todo.save().then(res.redirect('/'));
    console.log("Data has been saved") 
})
module.exports = router;