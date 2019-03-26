var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin

/* GET */
router.get('/',checkLogin, function(req, res, next) {
  res.render('favorite', { title: '收藏' });
});


module.exports = router