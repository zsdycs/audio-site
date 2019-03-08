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
});
