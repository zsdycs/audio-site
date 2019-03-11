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

  
});



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
function isInsufficientPage(){
  for(i=0; i<$(".paging").length; i++){
    if(parseInt($(".paging").eq(i).text()) > maxpage){
      $(".paging").eq(i).css("display","none")
    }
  }
}