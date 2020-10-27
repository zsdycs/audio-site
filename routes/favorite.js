var express = require('express');
var router = express.Router();
var checkLogin = require('../middleWares/check').checkLogin
var checkForAjax = require('../middleWares/checkForAjax').checkLogin
const FavoriteModel = require('../models/favorite')

/* GET */
router.get('/', checkLogin, function (req, res, next) {
  res.render('favorite', {
    title: '收藏'
  });
});
// POST 根据用户 id 获取用户收藏音频表
router.post('/', checkLogin, function (req, res, next) {
  const userId = req.session.user._id
  FavoriteModel.getAudioLikeListByUserId(userId)
    .then(function (data) {
      res.send(data)
    })
});

// 添加到收藏表
router.post('/add-like', checkForAjax, function (req, res, next) {
  var document = {}
  document.userId = req.session.user._id
  document.audioId = req.body.audioId
  FavoriteModel.addAudioToLikeById(document)
    .then(function () {
      // 返回添加成功状态
      return res.send({
        "status": "success"
      })
    })
})

// 取消收藏
router.post('/cancel-like', function (req, res, next) {
  var document = {}
  document.userId = req.session.user._id
  document.audioId = req.body.audioId
  FavoriteModel.cancelAudioLikeById(document)
    .then(function () {
      // 返回添加成功状态
      return res.send({
        "status": "success"
      })
    })
})

// 对已登录的用户根据其 id 返回其收藏的音频 id
router.post('/is-like', checkForAjax, function (req, res, next) {
  var userId = req.session.user._id
  FavoriteModel.getAudioIdByUserId(userId)
    .then(function (data) {
      return res.send(data)
    })

})

module.exports = router