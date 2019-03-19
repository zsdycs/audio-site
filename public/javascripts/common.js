/* 获取指定cookie */
function getCookie(name) {
    var arrCookie = document.cookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name){
			return arr[1];
		}
    }
    return "";
}
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
  // 侧边栏
  $(function(){
    var url = GetUrlRelativePath();
      if(url != "/"){
        $(".item").removeClass("active")
        $("#cart-item").addClass("active")
      }
  })
  function GetUrlRelativePath(){
　　var url = document.location.toString();
　　var arrUrl = url.split("//");

　　var start = arrUrl[1].indexOf("/");
　　var relUrl = arrUrl[1].substring(start);

　　if(relUrl.indexOf("?") != -1){
　　　relUrl = relUrl.split("?")[0];
　　}
　　return relUrl;
　}
  