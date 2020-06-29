const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

// 注册
exports.User = mongolass.model('User', {
  name: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
})
exports.User.index({
  name: 1
}, {
  unique: true
}).exec() // 根据用户名找到用户，用户名全局唯一

// 登录
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

// 写入已购
exports.Order = mongolass.model('Ordre', {
  userId: {
    type: Mongolass.Types.ObjectId,
    require: true
  },
  audioId: {
    type: Mongolass.Types.ObjectId,
    required: true
  },
  name: {
    type: 'string',
    required: true
  },
  price: {
    type: 'string',
    required: true
  },
  license: {
    type: 'string',
    required: true
  },
})
exports.Order.index({
  audioId: 1,
  userId: 1,
  license: 1
}, {
  unique: true
}).exec()

// 侧边筛选 tag 标签
exports.AudiofiltrateTag = mongolass.model('Audio', {
  _id: {
    type: 'string',
    required: true
  },
  music_num: {
    type: 'number',
    required: true
  }
})

// audiolist，根据标签、价格、时间筛选出的音频列表
exports.AudioList = mongolass.model('Audio', {
  _id: {
    type: Mongolass.Types.ObjectId,
    required: true
  },
  fileName: {
    type: 'string',
    required: true
  },
  filePath: {
    type: 'string',
    required: true
  },
  price_one: {
    type: 'number',
    required: true
  },
  price_unlimited: {
    type: 'number',
    required: true
  },
  sales: {
    type: 'number',
    required: true
  }
})

// 音频数量
exports.AudioNum = mongolass.model('Audio')

// 搜索，模糊查询，音频名字，不区分大小写
// audiolist，根据标签、价格、时间筛选出的音频列表
exports.SearchAudio = mongolass.model('Audio', {
  _id: {
    type: Mongolass.Types.ObjectId,
    required: true
  },
  fileName: {
    type: 'string',
    required: true
  },
  filePath: {
    type: 'string',
    required: true
  },
  price_one: {
    type: 'number',
    required: true
  },
  price_unlimited: {
    type: 'number',
    required: true
  },
  sales: {
    type: 'number',
    required: true
  }
})

// 写入收藏表
exports.Favorite = mongolass.model('Favorite', {
  audioId: {
    type: Mongolass.Types.ObjectId,
    required: true
  },
  userId: {
    type: 'string',
    required: true
  }
})