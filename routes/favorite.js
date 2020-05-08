const express = require('express');
const router  = express.Router();
const favorite = require('../models/Favorites')
const filter = require('../models/Filters')

//Get filters from user
router.get('/getfilters/:id', (req, res, next) => {

  const userID = { username:req.params.id}
  filter.findOne(userID)
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB.filters)
  })

      .catch(err => next(err));
});

//Add filters to user
router.get('/addfilters/:id&:filter1&:filter2', (req, res, next) => {

  const userID = { username:req.params.id}
  const filter1 = req.params.filter1
  const filter2 = req.params.filter2
  const singleMovie = req.body;
  filter.findOneAndUpdate(userID, {filter1: filter1})
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  })
  filter.findOneAndUpdate(userID, {filter2: filter2})
  // favorite.findByIdAndUpdate("5ea13dfac0c506091897f1b0", { $push: { userBoards: userID } }).exec()
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) 


      .catch(err => next(err));
});

//Add favorites to user
router.post('/addfavorites/:id', (req, res, next) => {

  const userID = { username:req.params.id}
  // const movID = req.params.movID
  const singleMovie = req.body;
  favorite.findOneAndUpdate(userID, {$push: {favorites: singleMovie}})
  // favorite.findByIdAndUpdate("5ea13dfac0c506091897f1b0", { $push: { userBoards: userID } }).exec()
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) //final busqueda de usuario


      .catch(err => next(err));
});

//Get favorites from user
router.get('/getfavorites/:id', (req, res, next) => {

  const userID = { username:req.params.id}
  favorite.findOne(userID)
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB.favorites)
  })

      .catch(err => next(err));
});

//Add favorites to user
router.post('/addfavorites/:id', (req, res, next) => {

  const userID = { username:req.params.id}
  // const movID = req.params.movID
  const singleMovie = req.body;
  favorite.findOneAndUpdate(userID, {$push: {favorites: singleMovie}})
  // favorite.findByIdAndUpdate("5ea13dfac0c506091897f1b0", { $push: { userBoards: userID } }).exec()
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) //final busqueda de usuario


      .catch(err => next(err));
});

//Add favorites to user
router.get('/removefavorites/:id&:movID', (req, res, next) => {

  const userID = { username:req.params.id}
  const movID = parseInt(req.params.movID)
  const singleMovie = req.body;
  favorite.findOneAndUpdate(userID, {$pull: {favorites: {id: movID}}},
    { safe: true, multi:true, new:true },
    )
  // favorite.findByIdAndUpdate("5ea13dfac0c506091897f1b0", { $push: { userBoards: userID } }).exec()
    .then(UserFromDB => {
      favorite.findOne(userID)
      .then(UserFromDB => {
        return res.status(200).send(UserFromDB.favorites)
    })
  
  }) //final busqueda de usuario


      .catch(err => next(err));
});

//Add user to database
router.get('/adduser/:id', (req, res, next) => {
  const userID = req.params.id


  favorite.findOne({username: userID}, function(err,obj) { 
    if (obj !== null) {
      return res.status(200).send("user already exists")
    }


  const newUser = new favorite({
    username: userID,
  })

  const newUserFilter = new filter({
    username: userID,
  })
  
  

  newUser
  .save()
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) 

  newUserFilter
  .save()
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) 

  .catch(err => {
    console.log(err);

        });
    });

  })





module.exports = router;
