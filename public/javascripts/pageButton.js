// 分页
// 请求获得音频数量，最大价格，写入cookie，计算页码

var maxpage=11,nowpage=10
$(function(){
    isInsufficientPage()
    pageinitial(maxpage,nowpage)
})
// 点击页码事件
$(document).on("click",".paging",function(){
  $(".paging").removeClass("active")
  $(this).addClass("active")
// 更新当前页码
  nowpage = parseInt($(this).text())
//   上传当前页码

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
  if(parseInt($(".pagefist").text()) > 1 && parseInt($(".pagefist").text()) <= 4){
    for(i=0; i<$(".paging").length; i++){
        $(".paging").eq(i).text(i+1)
    }
  }else if(parseInt($(".pagefist").text()) > 4){
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
// 将当前页码设置为最前项，并给当前页码加 "active"
function pageinitial(maxpage,nowpage){
    for(i=0; i<$(".paging").length; i++){
        $(".paging").eq(i).text(parseInt($(".paging").eq(i).text()) +nowpage-1)
        
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