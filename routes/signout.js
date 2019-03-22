var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  // 登出成功后跳转到主页
  res.redirect('/')
});


module.exports = router