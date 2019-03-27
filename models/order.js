const Order = require('../lib/mongo').Order

module.exports = {
  
  // 注册一个用户
  create: function create (order) {
    return Order.create(order).exec()
  },

  

}