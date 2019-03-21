var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.render('favorite', { title: '收藏夹' });
  // res.send('hhhh');
});


module.exports = router