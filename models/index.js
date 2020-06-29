const AudiofiltrateTag = require('../lib/mongo').AudiofiltrateTag
const AudioList = require('../lib/mongo').AudioList
const AudioNum = require('../lib/mongo').AudioNum
const SearchAudio = require('../lib/mongo').SearchAudio

module.exports = {

  // 获取标签项
  getFiltrateTag: function getFiltrateTag(match) {
    var str = ""
    // console.log(match)
    // match = JSON.parse(match)
    for (var i = 0; i < match.tag.length; i++) {
      str += "\"type\":\"" + match.tag[i] + "\","
    }
    // 去除末尾的逗号
    str = str.substring(0, str.lastIndexOf(','));
    str = eval("({" + str + "})")
    return AudiofiltrateTag
      // str:{"type":"xxxx","type":"xxx"}
      .aggregate(
        [{
            $match: str
          },
          {
            $unwind: "$type"
          },
          {
            $group: {
              _id: "$type",
              music_num: {
                $sum: 1
              }
            }
          },
          {
            $sort: {
              "music_num": -1
            }
          }
        ]
      )
      .exec()
  },

  // 获取音频列表，根据侧边标签、价格范围、发布时间
  getAudioList: function getAudioList(find) {
    // find = {tag:[xx,xx],price:[xx,xx],time:xx,sort:xx,page:xx}
    // type ={ $eq: "music",$eq: "music"}
    // price = {$gte:1,$lte:1998}
    // sort = 排序类型price...
    // page = num
    var type = "",
      price = "",
      time = find.time,
      sort = find.sort,
      page = find.page
    // type处理
    for (var i = 0; i < find.tag.length; i++) {
      type += "\"$eq\":\"" + find.tag[i] + "\","
    }
    // 去除末尾的逗号
    type = type.substring(0, type.lastIndexOf(','));
    type = JSON.parse("{" + type + "}")
    // price处理
    price = "{\"$gte\":" + find.price[0] + "," + "\"$lte\":" + find.price[1] + "}"
    price = JSON.parse(price)

    const t = new Date()
    const today = new Date(t.getFullYear(), t.getMonth() + 1, t.getDate());

    const sevenday = new Date(today.getTime() - 168 * 60 * 60 * 1000);
    const thirtyday = new Date(today.getTime() - 720 * 60 * 60 * 1000);
    const ninetyday = new Date(today.getTime() - 2160 * 60 * 60 * 1000);
    const year = new Date(today.getTime() - 9760 * 60 * 60 * 1000);

    function whattime(time) {
      // 时间设置
      if (time == 1) {
        // 所有
        const end = new Date(1949, 10, 1);
        return end
      } else if (time == 2) {
        // 7 天
        const end = new Date(sevenday.getFullYear(), sevenday.getMonth() + 1, sevenday.getDate());
        return end
      } else if (time == 3) {
        // 30 天
        const end = new Date(thirtyday.getFullYear(), thirtyday.getMonth() + 1, thirtyday.getDate());
        return end
      } else if (time = 4) {
        // 90 天
        const end = new Date(ninetyday.getFullYear(), ninetyday.getMonth() + 1, ninetyday.getDate());
        return end
      } else if (time = 5) {
        // 一年
        const end = new Date(year.getFullYear(), year.getMonth() + 1, year.getDate());
        return end
      }
    }

    // 判断排序类型 -> 返回结果
    if (sort == "price") {
      // 价格排序
      return AudioList
        .find({
          "type": {
            $elemMatch: type
          },
          "price_one": price,
          "createTime": {
            $gte: whattime(time),
            $lte: today
          }
        })
        .sort({
          "price_one": 1
        })
        .skip(page).limit(10)
        .exec()
    } else if (sort == "sales") {
      // 销量排序
      return AudioList
        .find({
          "type": {
            $elemMatch: type
          },
          "price_one": price,
          "createTime": {
            $gte: whattime(time),
            $lte: today
          }
        })
        .sort({
          "sales": -1
        })
        .skip(page).limit(10)
        .exec()
    } else if (sort == "time") {
      // 日期排序
      return AudioList
        .find({
          "type": {
            $elemMatch: type
          },
          "price_one": price,
          "createTime": {
            $gte: whattime(time),
            $lte: today
          }
        })
        .sort({
          "createTime": -1
        })
        .skip(page).limit(10)
        .exec()
    } else {
      return AudioList
        .find({
          "type": {
            $elemMatch: type
          },
          "price_one": price,
          "createTime": {
            $gte: whattime(time),
            $lte: today
          }
        })
        .skip(page).limit(10)
        .exec()
    }
    // ----------------测试-----------------
    // return AudioList
    // .find({
    //   "type":{ $elemMatch: { $eq: "music",$eq: "Loops"}},
    //   "price_one": {$gte:1,$lte:18},
    //   })
    // .sort({"price_one":1})
    // .skip(0).limit(10)
    // .exec()
  },

  getAudioNum: function getAudioNum(find) {

    var type = "",
      price = "",
      time = find.time

    // type 处理
    for (var i = 0; i < find.tag.length; i++) {
      type += "\"$eq\":\"" + find.tag[i] + "\","
    }
    // 去除末尾的逗号
    type = type.substring(0, type.lastIndexOf(','));
    type = JSON.parse("{" + type + "}")

    // price 处理
    price = "{\"$gte\":" + find.price[0] + "," + "\"$lte\":" + find.price[1] + "}"
    price = JSON.parse(price)

    const t = new Date()
    const today = new Date(t.getFullYear(), t.getMonth() + 1, t.getDate());

    const sevenday = new Date(today.getTime() - 168 * 60 * 60 * 1000);
    const thirtyday = new Date(today.getTime() - 720 * 60 * 60 * 1000);
    const ninetyday = new Date(today.getTime() - 2160 * 60 * 60 * 1000);
    const year = new Date(today.getTime() - 9760 * 60 * 60 * 1000);

    function whattime(time) {
      // 时间设置
      if (time == 1) {
        // 所有
        const end = new Date(1949, 10, 1);
        return end
      } else if (time == 2) {
        // 7 天
        const end = new Date(sevenday.getFullYear(), sevenday.getMonth(), sevenday.getDate());
        return end
      } else if (time == 3) {
        // 30 天
        const end = new Date(thirtyday.getFullYear(), thirtyday.getMonth(), thirtyday.getDate());
        return end
      } else if (time = 4) {
        // 90 天
        const end = new Date(ninetyday.getFullYear(), ninetyday.getMonth(), ninetyday.getDate());
        return end
      } else if (time = 5) {
        // 一年
        const end = new Date(year.getFullYear(), year.getMonth(), year.getDate());
        return end
      }
    }

    return AudioNum
      .aggregate([{
          $match: {
            "type": {
              $elemMatch: type
            },
            "price_one": price,
            "createTime": {
              $gte: whattime(time),
              $lte: today
            }
          }
        },
        {
          $group: {
            _id: "$audio",
            voice_num: {
              $sum: 1
            },
            max_price: {
              $max: "$price_unlimited"
            }
          }
        }
      ])
      .exec()
  },


  getAudioBySearch: function getAudioBySearch(fileName) {
    // fileName = {fileName: 'xxx'}
    // fileName: { $regex: 'Ele', $options: 'i'} 
    var str = {
      $options: 'i'
    }
    str.$regex = fileName.fileName
    return SearchAudio
      .find({
        fileName: str
      })
      .skip(fileName.page).limit(10)
      .exec()
  },


}