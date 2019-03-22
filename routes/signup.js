var express = require('express');
var router = express.Router();

// GET /signup 注册页
router.get('/', function (req, res, next) {
    res.render('signup',{ title: '注册' })
})


// POST /signup 用户注册


module.exports = router