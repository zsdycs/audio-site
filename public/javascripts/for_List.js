// 购物车数据
var List = new Vue({
	el: '#List',
	data: {
        List: [],
	},
	created() {
		////////////下面的是前端测试用的数据//////////////
        var data=[{
            name:"仙女棒",
            price:"21",
            license:"一次性",
            id:2453231,
            one:2132,
            unlimited:231233,
        }]
    ////////////////////////测试用数据结束//////////////
    // 根据地址请求列表数据
        var self=this;
        var url = GetUrlRelativePath();
        console.log("我知道啦，是这里:"+url)
        if(url == "/cart"){
            var data=getCookie("shoppingcart")
            data=JSON.parse(data)
            if(data!=""){
                self.List = data 
            }
        }else if(url == "/order"){
            self.List = data 
            checkOrderNum(data)
        }
	}
});

// 根据order ajax请求，显示订单list或no，并关联 "数量"、"总价" 显示
function checkOrderNum(List){

    var num = List.length
    if(num == 0){
        $(".cart-list").css("display","none")
        $(".cart-no").css("display","block")
    }else{
        var price = 0
        for(var i = 0;i < num;i++){
            price+=parseInt(List[i].price)
        }
        price+=parseInt($("#total-price").text())
        $("#total-price").text(price)
        $(".cart-header__summary").text("已购买"+ num +"条音频的版权")
        $(".cart-list").css("display","block")
        $(".cart-no").css("display","none")
    }
}


// 根据购物车cookie，显示购物车list或no，并关联 "数量"、"总价" 显示
function checkshoppingcartnum(){
    var cartList=JSON.parse(getCookie("shoppingcart"))
    var num = cartList.length
    if(num == 0){
        $(".cart-list").css("display","none")
        $(".cart-no").css("display","block")
    }else{
        var price = 0
        for(var i = 0;i < num;i++){
            price+=parseInt(cartList[i].price)
        }
        price+=parseInt($("#total-price").text())
        $("#total-price").text(price)
        $(".cart-header__summary").text("购物车中有"+ num +"条音频")
        $(".cart-list").css("display","block")
        $(".cart-no").css("display","none")
    }
}