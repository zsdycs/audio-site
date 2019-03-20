var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.render('order', { title: '订单' });
  // res.send('hhhh');
});


module.exports = router