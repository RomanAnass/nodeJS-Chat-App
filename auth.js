
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/anass', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/views', function(req, res) {
  res.send('views');
});

router.get('/engine', function(req, res) {
    res.send('engine');
});

module.exports = router;