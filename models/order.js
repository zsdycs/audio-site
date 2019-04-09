const Order = require('../lib/mongo').Order

module.exports = {
  
  // 创建订单
  create: function create (order) {
    return Order.create(order).exec()
  },
  // 通过用户id获取订单列表
  getOrderlist: function getOrderlist(userId){
    const find = {}
      find.userId = userId
    return Order
    .find(find)
    .sort({"_id":-1})
    .exec()
  },

  // 通过用户id，删除该用户的所有订单
  removeAllOrderByUserId: function removeAllOrderByUserId(userId){
    const find = {}
      find.userId = userId
    return Order
    .deleteMany(find)
    .exec()
  },

  // 通过文档id，删除一条订单的文档
  removeOneOrderById: function removeOneOrderById(find){
    // console.log(find)
    return Order
    .deleteOne(find)
    .exec()
  },

}