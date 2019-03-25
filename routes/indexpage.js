var express = require('express');
var router = express.Router();

/* GET */ //首页音频列表--->/index/list
router.get('/list', function(req, res, next) {
    res.send('主页音频列表')
});
// POST // 筛选-上传cookie中的筛选信息
router.post('/filtrate', function (req, res, next) {
    res.send('主页音频列表--过滤筛选')
})
// POST // 页码--上传页码
router.post('/pages', function (req, res, next) {
    res.send('主页音频列表-页码')
})

module.exports = router