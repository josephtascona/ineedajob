var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'I Need a Job',
    user: req.user
  });
});

module.exports = router;

router.get('/about', function (req, res) {
  res.render('about', { 
    title: 'About this site',
    content: 'Express-generator' ,
    user: req.user
  });
});