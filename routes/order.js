var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin

/* GET */
router.get('/',checkLogin, function(req, res, next) {
  res.render('order', { title: '已购' });
});


module.exports = router