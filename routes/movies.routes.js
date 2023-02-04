const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

const router = require('express').Router()

router.get('/movies/create',(req,res)=>{
    Celebrity.find()
    .then(allCelebrities=>{
        res.render("movies/new-movie",{allCelebrities})

    })
})

router.post('/movies/create',(req,res)=>{
    const {title,genre,plot,cast} = req.body
    let newMovie;
    Movie.create({title,genre,plot,cast})
    .then(movieCreated=>{
        newMovie = movieCreated
        console.log("movieCreated", movieCreated)
        res.redirect('/movies/create')
    })
    .then(()=>{ 
        for(i=0;cast.length;i++){
            Celebrity.findById(cast[i])
            .then(celebrity=>{
                celebrity.movies.push(newMovie)
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/movies',(req,res)=>{
    Movie.find()
    .then(allMovies=>{
        res.render('movies/movies',{allMovies})
    })
})


router.get('/movies/:id',(req,res)=>{
    Movie.findById(req.params.id)
    .populate('cast')
    .then(oneMovie=>{
        console.log(oneMovie)
        res.render('movies/movie-details',oneMovie)
    })
})


router.get('/movies/:id/edit',(req,res)=>{
    let allCelebrities;
    Celebrity.find()
    .then(actorsFromDB=>{
        allCelebrities= actorsFromDB
    })

    Movie.findById(req.params.id)
    .then(movieToEdit=>{
        res.render('movies/edit-movies',{movieToEdit,allCelebrities})
    
    })
})

router.post('/movies/:id/edit',(req,res)=>{
    const {title,plot,genre,cast} = req.body
    Movie.create(req.body)
})

module.exports = router