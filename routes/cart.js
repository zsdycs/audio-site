var router = require('express').Router();

const OrderModel = require('../models/order')
var checkLogin = require('../middleWares/checkForAjax').checkLogin


/* GET */
router.get('/', function (req, res, next) {
  res.render('cart', {
    title: '购物车'
  });
})
// POST 结算
router.post('/', checkLogin, function (req, res, next) {
  if (req.body.length != 0) {
    for (var i = 0; i < req.body.length; i++) {
      req.body[i].userId = req.session.user._id
      var oneRow = req.body[i]
      // 用户信息写入数据库
      OrderModel.create(oneRow)
        .then(function () {
          // 写入 flash
          req.flash('success', '结算成功')
          // 返回结算成功状态
          return res.send({
            "status": "success"
          })
        })
        .catch(function (e) {
          // id 被占用返回 noSuccess
          if (e.message.match('duplicate key')) {
            req.flash('error', '存在已购买的音频')
            res.send({
              "status": "noSuccess"
            })
          }
        })
    }
  } else {
    // 非法请求 length 为 0
    res.send({
      "status": "非法请求"
    })
  }
});

module.exports = router