const Audio = require('../lib/mongo').Audio

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
    console.log(str)
    return Audio
    // .find({})
    // .sort({'music_num':-1})
    // "type":"xxxx","type":"xxx"
    .aggregate([
        {$unwind:"$type"},
        {$match:{"type":"music"}},
        {$group : {_id: "$type", music_num : {$sum : 1}}},
        {$sort:{"music_num":-1}}
    ])  
    .exec()
  }

}