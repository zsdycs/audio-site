var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin

/* GET */
router.get('/', checkLogin, function(req, res, next) {
  // 登出成功后跳转到主页
  res.redirect('/')
});


module.exports = router