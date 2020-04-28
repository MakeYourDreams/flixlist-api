const express = require('express');
const router  = express.Router();
const commentsModel = require('../../models/comments')




router.get('/', (req, res, next) => {

  })



//create new comment
router.post('/post-comment', (req, res, next) => {
  const commentInfo = req.body;
  commentsModel.create(commentInfo)
  .then(res.redirect('/users'))

  .catch(err => next
    (err))

})


router.get('../users/profile/:id', (req, res, next) => {

  const userID = { _id:req.params.id}

  commentsModel.find(userID)

    .then(commentsDB => { allComments: commentsDB })


      .catch(err => next(err));
});





module.exports = router;