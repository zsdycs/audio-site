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
  // 通过用户id关联audios表获取收藏音频信息
  getAudioLikeListByUserId: function getAudioLikeListByUserId(userId) {
    const find = {}
    find.userId = userId
    return Favorite
      .aggregate([{
          $match: find
        },
        {
          $lookup: {
            from: 'audios', // 关联查询表2
            localField: 'audioId', // 关联表1的商品编号ID
            foreignField: '_id', // 匹配表2中的ID与关联表1商品编号ID对应
            as: 'audioInfo' // 满足 localField与foreignField的信息加入audioInfo集合
          }
        }
      ])
      .exec()
  },
  // 根据用户id返回用户收藏的音频id
  getAudioIdByUserId: function getAudioIdByUserId(userId) {
    const find = {}
    find.userId = userId
    return Favorite
      .find(find)
      .exec()
  },

}