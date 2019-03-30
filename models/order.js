const Order = require('../lib/mongo').Order

module.exports = {
  
  // 创建订单
  create: function create (order) {
    return Order.create(order).exec()
  },

  getOrderlist: function getOrderlist(username){
    const query = {}
    if (username) {
      query.username = username
    }
    return Order
    .find(query)
    .exec()
  }

}