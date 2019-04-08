// 购物车数据
var List = new Vue({
	el: '#List',
	data: {
        List: [],
	},
	created() {
		////////////下面的是前端测试用的数据//////////////
        // var data=[
        //     {
        //         name:"仙女棒",
        //         price:"21",
        //         license:"无限制",
        //         audioId:2453231,
        //     },
        //     {
        //         name:"仙女棒",
        //         price:"21",
        //         license:"无限制",
        //         audioId:2453231,
        //     }
        // ]
        /////////////////测试用数据结束//////////////
    // 根据地址请求列表数据
        var self=this;
        var url = GetUrlRelativePath();
        // console.log("我知道啦，是这里:"+url)
        if(url == "/cart"){
            // 将cookie数据渲染到购物车表
            var cartdata=getCookie("shoppingcart")
            cartdata=JSON.parse(cartdata)
            if(cartdata!=""){
                self.List = cartdata 
            }
        }else if(url == "/order"){
            // 将请求获得的数据渲染到已购表
            $.ajax({
                type:"post",
                contentType:'application/json',
                url: "/order",
                dataType: 'json',
                cache: false,
                timeout: 5000,
                success: function (data) {
                    // console.log(JSON.parse(JSON.stringify(data)))
                    self.List = data 
                    checkOrderNum(data)
                },
                error:function (err) {
                    console.log(JSON.stringify(err));
                }
            })
        }
    },
    watch:{    
		List:function(){  
			this.$nextTick(function (){
                // 绑定弹出消息
                $(".cart_entry__information-detail").attr("data-position","right center")
                $('.cart_entry__information-detail').each(function(){
                    if($(this).text() == "一次性"){
                    $(this).popup({
                        title   : '许可说明',
                        content : '这里是关于“一次性”许可证的使用说明，人的灵魂来自一个完美的家园，那里没有任何污秽和丑陋，只有纯净和美丽。'
                    });
                    }else{
                        $(this).popup({
                            title   : '许可说明',
                            content : '这里是关于“无限制”许可证的使用说明，有的人浅薄，有的人金玉其表败絮其中。有一天 你会遇到一个彩虹般绚烂的人，当你遇到这个人后，会觉得其他人都只是浮云而已。'
                        });
                    }
                })
                
			}
		
		)}
    },
});

// 根据order ajax请求，显示订单list或no，并关联 "数量"、"总价" 显示
function checkOrderNum(List){

    var num = List.length
    if(num == 0){
        $(".cart-list").css("display","none")
        $(".cart-no").css("display","block")
        $(".head-title").text("一条音频都没购买")
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