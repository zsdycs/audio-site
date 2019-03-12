$(document).ready(function () {
  // fix menu when passed
  $('.masthead').visibility({
    once: false,
    onBottomPassed: function () {
      $('.fixed.menu').transition('fade in');
    },
    onBottomPassedReverse: function () {
      $('.fixed.menu').transition('fade out');
    }
  });
  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item')
});

$(function(){
  FiltrateAndAudioByCookie()
  getFiltrateByCookieForRtopList()
  //筛选列表折叠事件
  $(document).on("click",".filtrate-button",function(){
    if($(this).attr("aria-label")=="collapse"){
      $(this).removeClass("open-filtrate")
      $(this).attr("aria-label","spread")
      $(this).next().css("display","none")
    }else{
      $(this).addClass("open-filtrate")
      $(this).attr("aria-label","collapse")
      $(this).next().css("display","block")
    }
  })

  // 排序选项列表
  $('.ui.dropdown').dropdown();
  $(document).on("click",".rank-a",function(){
    // console.log($(this).text()) 
    // ajax排序请求局部刷新audioList
    
    // 修改列表标题
    $('.dropdown-title').html($(this).text())
  })
})

// 分页
// 请求获得最大分页
var maxpage=11,nowpage=1
isInsufficientPage()
$(document).on("click",".paging",function(){
  $(".paging").removeClass("active")
  $(this).addClass("active")
  nowpage = parseInt($(this).text())
})
// 分页→右
$(document).on("click",".toendpage",function(){
  if(parseInt($(".pageend").text()) < maxpage){
    for(i=0; i<$(".paging").length; i++){
      $(".paging").eq(i).text(parseInt($(".paging").eq(i).text()) +4)
      if(parseInt($(".paging").eq(i).text()) == nowpage){
        $(".paging").eq(i).addClass("active")
      }else{
        $(".paging").eq(i).removeClass("active")
      }
      if(parseInt($(".paging").eq(i).text()) > maxpage){
        $(".paging").eq(i).css("display","none")
      }
    }
  }
})
// 分页←左
$(document).on("click",".tofistpage",function(){
  if(parseInt($(".pagefist").text()) > 1){
    $(".paging").css("display","block")
    for(i=0; i<$(".paging").length; i++){
      $(".paging").eq(i).text(parseInt($(".paging").eq(i).text()) -4)
      if(parseInt($(".paging").eq(i).text()) == nowpage){
        $(".paging").eq(i).addClass("active")
      }else{
        $(".paging").eq(i).removeClass("active")
      }
    }
  }
})
// 页码超出隐藏
function isInsufficientPage(){
  for(i=0; i<$(".paging").length; i++){
    if(parseInt($(".paging").eq(i).text()) > maxpage){
      $(".paging").eq(i).css("display","none")
    }
  }
}

// 渲染右边标签项，从cookie获取数据
function getFiltrateByCookieForRtopList(){
  //已选标签列表
  var labeltagList = new Vue({
    el: '#labeltagList',
    data: {
      labeltagList: [],
    },
    created() {
      ////////////测试用数据//////////////
      data=[
        // {
        //   tag_name:'电子',
        // },
        // {
        //   tag_name:'事件',
        // },
      ]
      //////////测试用数据结束////////////
        // }
    var self=this;
    filtrateList=JSON.parse(getCookie("filtrateTagList"))
    for(var i = 0;i<filtrateList[0].tag.length;i++){
      var tag_name=filtrateList[0].tag[i]
      var tag_one = {tag_name:tag_name}
      data.push(tag_one)
    }
    self.labeltagList = data
    // console.log("1---"+data)
    data=JSON.stringify(data)
    // console.log("2---"+data)
    },
    watch:{    
      labeltagList:function(){  
        this.$nextTick(function (){
          labeltagListisloading()
          // console.log('v-for渲染已经完成')
        }
      
      )}
    }
  });
}
function labeltagListisloading(){
  $(".labeltag").removeClass("loader")
}
// 删除所选标签
$(document).on("click",".labeltag",function(){
  // 修改cookie
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
  filtrateList=JSON.parse(getCookie("filtrateTagList"))
  for(var i=0;i<filtrateList[0].tag.length;i++){
    if(filtrateList[0].tag[i] == $(this).text()){
      filtrateList[0].tag.splice(i,1)
        break;
    }
  }
  document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString()+ ";path=/";
  $(this).remove()
  // 刷新页面刷新
  window.location.reload()

})

// 初始化筛选项变量。标签，价格，时间
// 标签
var tag = new Array()
// 价格，最大金额通过请求获得，测试使用固定值
var price = new Array()
price[0] = 1,price[1] = 100
// 时间,状态值=1:所有，2：最近一周，3：最近一个月，4：最近3个月，5：最近1年。
var time = 1
var filtrate = { tag:tag,price:price,time:time },filtrateList = [];
filtrateList.push(filtrate);
// 如果筛选项cookie不存在，写入空筛选项cookie
if(getCookie("filtrateTagList")==""){
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
  document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString()+ ";path=/";
}
// 根据cookie筛选项显示页面筛选项状态，数据绑定
function FiltrateAndAudioByCookie(){
  // 关联标签
  $(".input-check-tag").each(function(){
    filtrateList=JSON.parse(getCookie("filtrateTagList"))
      for(var i=0;i<filtrateList[0].tag.length;i++){
        if(filtrateList[0].tag[i] == $(this).next().text()){
          $(this).prop("checked",true)
        }
      }
  })
  // 关联价格状态
  
  // 关联时间状态

  // 关联右边头部

  // 上传cookie，刷新音频列表

}
// 左边tag选择->写入cookie->上传后右边的音频列表内容刷新->左边选择列表上传给后端，返回新了可选项列表
$(document).on("click",".input-check-tag",function(){
  // 被选中
  if($(this).prop("checked")){
    // 写入cookie
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
    //流程，取出标签，判断是否为空，为空直接添加进数组，不为空通过length添加到空位
    filtrateList=JSON.parse(getCookie("filtrateTagList"))
    // console.log("filtrateList[0].tag.length:"+filtrateList[0].tag.length)
    if(filtrateList[0].tag.length==0){
      filtrateList[0].tag[0] = $(this).next().text()
      // for(var i=0;i<filtrateList[0].tag.length;i++){
      //   console.log(i+":"+filtrateList[0].tag[i])
      // }
    }else{
      filtrateList[0].tag[filtrateList[0].tag.length] = $(this).next().text()
    }
    document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString()+ ";path=/";
    // console.log("ed:"+$(this).next().text())
  }else{
    // 取消选中修改cookie
    // console.log("didn't:"+$(this).next().text())
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
    // 流程，取出标签，遍历找到数组所在位置，移除位置的值
    filtrateList=JSON.parse(getCookie("filtrateTagList"))
    for(var i=0; i<filtrateList[0].tag.length; i++){
      if(filtrateList[0].tag[i] == $(this).next().text()){
        filtrateList[0].tag.splice(i,1)
        break;
      }
    }
    document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString()+ ";path=/";
  }
  // 上传cookie（上传所有筛选项，返回音频列表与可筛选项，刷新列表，可复用函数）
  window.location.reload()
})