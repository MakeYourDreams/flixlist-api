const express = require('express');
const router  = express.Router();
const user = require('../../models/User')

/* GET home page */
router.get('/edit', (req, res, next) => {
  user.find()
  .then(allUserFromDB => {
    console.log(allUserFromDB)
    res.render('./users/edit',{ actualUser: allUserFromDB });
  })
  
  .catch(err => next(err))

  
});

router.get('/delete/:userId', (req, res, next) => {
  user.remove({ _id : req.params.userId })
      .then(res.redirect('/tasks'))


      .catch(err => next(err));
});

// all users routes

router.get('/', (req, res, next) => {

  user.find()
  .then(allUserFromDB => {
    console.log(allUserFromDB)
    res.render('./contacts/allContacts',{ allUsers: allUserFromDB });
  })

      .catch(err => next(err));
});


router.get('/profile/:id', (req, res, next) => {

  const userID = { username:req.params.id}
  user.findOne(userID)
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) //final busqueda de usuario


      .catch(err => next(err));
});

// router.post('/favorites/:id', (req, res, next) => {

//   const userID = { username:req.params.id}
//   user.findOne(req.params.id, function(err, UserFromDB) {
//     if (!UserFromDB)
//         res.status(404).send("data is not found");
//     else
//     user.firstName = req.body

//     user.save().then(UserFromDB => {
//             res.json('Todo updated!');
//         })
//         .catch(err => {
//             res.status(400).send("Update not possible");
//         });
  
//   }) //final busqueda de usuario


//       .catch(err => next(err));
// });


// router.post('/favorites/:userid', (req, res, next) => {

//   var {firstName} = req.body;
//   User.findByIdAndUpdate(id, { $push: { firstName: firstName } }).exec()
//   .then(res.redirect('/tasks'))
  
  
//   .catch(err => next(err));

// })



//Get favorites from user
router.get('/getfavorites/:id', (req, res, next) => {

  const userID = { username:req.params.id}
  user.findOne(userID)
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
  user.findOneAndUpdate(userID, {$push: {favorites: singleMovie}})
  // user.findByIdAndUpdate("5ea13dfac0c506091897f1b0", { $push: { userBoards: userID } }).exec()
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) //final busqueda de usuario


      .catch(err => next(err));
});

//Add user to database
router.get('/adduser/:id', (req, res, next) => {
  const userID = req.params.id


  user.findOne({username: userID}, function(err,obj) { 
    if (obj !== null) {
      return res.status(200).send("user already exists")
    }


  const newUser = new user({
    username: userID,
    // lastName: "456"
  })
  

  newUser
  .save()
  // user.findByIdAndUpdate("5ea13dfac0c506091897f1b0", { $push: { userBoards: userID } }).exec()
    .then(UserFromDB => {
      return res.status(200).send(UserFromDB)
  
  }) //final busqueda de usuario

  .catch(err => {
    console.log(err);

        });
    });

  })





module.exports = router;
