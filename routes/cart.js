var router = require('express').Router();

const OrderModel = require('../models/order')
var checkLogin = require('../middlewares/checkForAjax').checkLogin


/* GET */
router.get('/', function(req, res, next) {
  res.render('cart', { title: '购物车' });
})
// post,结算
router.post('/',checkLogin, function(req, res, next) {
  // console.log(req.body.length);
  if(req.body.length != 0){
    for(var i=0;i<req.body.length;i++){
      // console.log(req.session.user.name)
      req.body[i].username = req.session.user.name
      var onerow =  req.body[i]
      // 用户信息写入数据库
      OrderModel.create(onerow)
      .then(function () {
        // 写入 flash
        req.flash('success', '结算成功')
        // 返回结算成功状态
        return res.send({"status":"success"})
      })
      .catch(function (e) {
        // id被占用返回nosuccess
        if (e.message.match('duplicate key')) {
          req.flash('error', '存在已购买的音频')
          res.send({"status":"nosuccess"})
        }
      })
    }
  }else{
    // 非法请求length为0
    res.send({"status":"非法请求"})
  }
});

module.exports = router
