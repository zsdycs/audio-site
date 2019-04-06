// 分页
$(function(){
// 通过cookie绑定当前页码，选择页码时修改cookie，上传局部刷新音频列表
var maxpage=parseInt(JSON.parse(getCookie("maxNumPage"))[0].voice_num/10+1)
var nowpage=JSON.parse(getCookie("maxNumPage"))[0].page
isInsufficientPage()
pageinitial(maxpage,nowpage)
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

})