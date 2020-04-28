const express = require('express');
const router  = express.Router();
const taskModel = require('../models/task')

/* GET home page */
router.get('/', (req, res, next) => {
  taskModel.find()
  .then(allTaskFromDB => {
    res.render('',{ tasks: allTaskFromDB });
  })
  .catch(err => next(err))
});

module.exports = router;
