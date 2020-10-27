const Favorite = require('../lib/mongo').Favorite

module.exports = {

  // 添加到收藏表
  addAudioToLikeById: function addAudioToLikeById(document) {
    return Favorite.create(document).exec()
  },
  // 取消收藏
  cancelAudioLikeById: function cancelAudioLikeById(document) {
    return Favorite
      .deleteOne(document)
      .exec()
  },
  // 通过用户 id 关联 audios 表获取收藏音频信息
  getAudioLikeListByUserId: function getAudioLikeListByUserId(userId) {
    const find = {}
    find.userId = userId
    return Favorite
      .aggregate([{
          $match: find
        },
        {
          $lookup: {
            from: 'audios', // 关联查询表 2
            localField: 'audioId', // 关联表 1 的商品编号ID
            foreignField: '_id', // 匹配表 2 中的 ID 与关联表 1 商品编号 ID 对应
            as: 'audioInfo' // 满足 localField 与 foreignField 的信息加入 audioInfo 集合
          }
        }
      ])
      .exec()
  },
  // 根据用户id返回用户收藏的音频 id
  getAudioIdByUserId: function getAudioIdByUserId(userId) {
    const find = {}
    find.userId = userId
    return Favorite
      .find(find)
      .exec()
  },

}