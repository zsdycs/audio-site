const Order = require('../lib/mongo').Order
const Audio = require('../lib/mongo').AudioList
module.exports = {

  // 创建订单
  create: function create(oneRow) {
    // 更新音频表 sales 字段的值
    var find = {}
    find._id = oneRow.audioId
    Audio.update(find, {
        $inc: {
          sales: 1
        }
      })
      .exec()
    return Order.create(oneRow).exec()
  },
  // 通过用户 id 获取订单列表
  getOrderList: function getOrderList(userId) {
    const find = {}
    find.userId = userId
    return Order
      .find(find)
      .sort({
        "_id": -1
      })
      .exec()
  },

  // 通过用户 id，删除该用户的所有订单
  removeAllOrderByUserId: function removeAllOrderByUserId(userId) {
    const find = {}
    find.userId = userId
    return Order
      .deleteMany(find)
      .exec()
  },

  // 通过文档 id，删除一条订单的文档
  removeOneOrderById: function removeOneOrderById(find) {
    return Order
      .deleteOne(find)
      .exec()
  },

}