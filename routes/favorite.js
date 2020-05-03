const express = require('express');
const router  = express.Router();
const favorite = require('../models/Favorites')
const comments = require('../models/comments')


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
    // lastName: "456"
  })
  
  

  newUser
  .save()
  // favorite.findByIdAndUpdate("5ea13dfac0c506091897f1b0", { $push: { userBoards: userID } }).exec()
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) //final busqueda de usuario

  .catch(err => {
    console.log(err);

        });
    });

  })





module.exports = router;
