const AudiofiltrateTag  = require('../lib/mongo').AudiofiltrateTag 
const AudioList  = require('../lib/mongo').AudioList

module.exports = {
  
  // 获取标签项
  getFiltrateTag: function getFiltrateTag(match){
    var str = ""
    console.log(match)
    // match = JSON.parse(match)
    for(var i = 0;i<match.tag.length;i++){
        str += "\"type\":\""+ match.tag[i] +"\","
    }
    // 去除末尾的逗号
    str = str.substring(0, str.lastIndexOf(','));
    str = eval("({"+str+"})")
    return AudiofiltrateTag
    // str:{"type":"xxxx","type":"xxx"}
    .aggregate(
      [
        {$match:str},
        {$unwind:"$type"},
        {$group : {_id: "$type", music_num : {$sum : 1}}},
        {$sort:{"music_num":-1}}
      ]
    )  
    .exec()
  },

  // 获取音频列表，根据侧边标签、价格范围、发布时间
  getAudioList: function getAudioList(find){
  // find = {tag:[xx,xx],price:[xx,xx],time:[xx,xx],sort:xx,page:xx}
  // type ={ $eq: "music",$eq: "music"}
  // price = {$gte:1,$lte:1998}
  // time = {$gte : ISODate("2017-02-01T00:00:00Z"),$lt: ISODate("2019-05-04T00:00:00Z")}
  var type = "",price = "",time ="",sort =find.sort,page =find.page
  for(var i = 0;i<find.tag.length;i++){
    type += "\"$eq\":\""+ find.tag[i] +"\","
  }
  // 去除末尾的逗号
  type = type.substring(0, type.lastIndexOf(','));
  type = eval("({"+type+"})")
  time = "\"$gte\":\""+ find.time[0] +"\","+"\"$gte\":\""+ find.time[1] +"\""
  time = eval("({"+time+"})")
    if(sort == "price"){
      //价格排序
      return AudioList
      .find({
        "type":{ $elemMatch: type},
        "price_one": price,
        "createTime": time
        })
      .sort({"price_one":1})
      .skip(page).limit(10)
      .exec()
    }else if(sort == "sales"){
      //销量排序
      return AudioList
      .find({
        "type":{ $elemMatch: type},
        "price_one": price,
        "createTime": time
      })
      .sort({"sales":-1})
      .skip(page).limit(10)
      .exec()
    }else if(sort == "time"){
      // 日期排序
      return AudioList
      .find({
        "type":{ $elemMatch: type},
        "price_one": price,
        "createTime": time
      })
      .sort({"createTime":-1})
      .skip(page).limit(10)
      .exec()
    }else{
      return AudioList
      .find({
        "type":{ $elemMatch: type},
        "price_one": price,
        "createTime": time
      })
      .skip(page).limit(10)
      .exec()
    }
  }

}