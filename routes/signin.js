var express = require('express');
var router = express.Router();

// GET signin 登录页
router.get('/', function(req, res, next) {
  res.render('signin',{ title: '登录' });
});
// POST /signin 用户登录



module.exports = router