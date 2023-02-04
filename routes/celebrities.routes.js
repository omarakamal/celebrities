const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

const fileUploader = require('../config/cloudinary.config');



router.get('/celebrities/create',(req,res)=>{
    res.render('celebrities/new-celebrity')
})


router.post('/celebrities/create',fileUploader.single('celeb-image'),(req,res)=>{
    const {name, occupation, catchPhrase} = req.body
    console.log(req.file)
    console.log(req.file.path)

    CelebrityModel.create({name,occupation,catchPhrase,imageURL:req.file.path})
    .then((result)=>{
        res.redirect('/celebrities')
    })
    .catch((error)=>{
        console.log(error)
        res.redirect('/new-celebrity')
    })
})


//relating to the get request we recieve from the clirent
router.get('/celebrities',(req,res,next)=>{
    CelebrityModel.find()
    .then((result)=>{
        //Where in my APPLICATION is my hbs that I want to show the user
        res.render('celebrities/celebrities',{result})
    })
    .catch((error)=>{
        console.log(error)
        next(error)
    })
})
module.exports = router;
