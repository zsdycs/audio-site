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