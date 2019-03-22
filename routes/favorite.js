var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.render('favorite', { title: '收藏' });
});


module.exports = router