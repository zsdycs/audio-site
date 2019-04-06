var express = require('express');
var router = express.Router();

const IndexModel = require('../models/index')

/* POST */ //首页音频列表--->/index/list
router.post('/list', function(req, res, next) {
    // console.log("list---"+JSON.stringify(req.body))
    IndexModel.getAudioList(req.body)
    .then(function (data) {
        res.send(data)
    })
});
// post filtrateTag 标签及标签下音频数量
router.post('/filtrate/tag', function (req, res, next) {
    // console.log("tag---"+JSON.stringify(req.body))
    IndexModel.getFiltrateTag(req.body)
    .then(function (data) {
        res.send(data)
    })
})
// POST // 获取音频数量
router.post('/pages', function (req, res, next) {
    IndexModel.getAudioNum(req.body)
    .then(function (data) {
        res.send(data)
    })
})

module.exports = router