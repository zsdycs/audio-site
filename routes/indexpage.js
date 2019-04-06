var express = require('express');
var router = express.Router();

const IndexModel = require('../models/index')

/* POST */ //首页音频列表--->/index/list
router.post('/list', function(req, res, next) {
    // console.log("list---"+JSON.stringify(req.body))
    // res.send(req.body)
    IndexModel.getAudioList(req.body)
    .then(function (data) {
        res.send(data)
    })
});
// post filtrateTag
router.post('/filtrate/tag', function (req, res, next) {
    // console.log("tag---"+JSON.stringify(req.body))
    IndexModel.getFiltrateTag(req.body)
    .then(function (data) {
        res.send(data)
    })
})
// POST // 筛选-上传cookie中的筛选信息
router.post('/filtrate', function (req, res, next) {
    res.send('主页音频列表--过滤筛选')
})
// POST // 页码--上传页码
router.post('/pages', function (req, res, next) {
    res.send('主页音频列表-页码')
})

module.exports = router