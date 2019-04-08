var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin
const OrderModel = require('../models/order')
/* GET */
router.get('/',checkLogin, function(req, res, next) {
  res.render('order', { title: '已购' });
});

// POST,通过userId获得已购订单
router. post('/',checkLogin, function(req, res, next) {
  const userId = req.session.user._id
  OrderModel.getOrderlist(userId)
  .then(function (data) {
    res.send(data)
  })
});

// 清除所有订单
router. post('/del-all',checkLogin, function(req, res, next) {
  const find = req.session.user._id
  OrderModel.removeAllOrderByUserId(find)
  .then(function (data) {
    res.send(data)
  })
});

// 清除一条订单
router. post('/del-one',checkLogin, function(req, res, next) {
  const find = req.body
  OrderModel.removeOneOrderById(find)
  .then(function (data) {
    req.flash('success', '删除成功')
    res.send(data)
  })
});

module.exports = router