var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.render('cart', { title: '购物车' });
});


module.exports = router
