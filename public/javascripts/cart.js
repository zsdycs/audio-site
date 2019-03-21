// 判断shoppingcart是否有商品
$(function(){
    // 根据shoppingcart cookie绑定数据
    // var data=getCookie("shoppingcart")
    // data=JSON.parse(data)
    // data=JSON.stringify(data)
    // console.log(">>>>:"+data)

    checkshoppingcartnum()

    // 删除商品
    $(document).on("click",".btn-link",function(){
        var id = $(this).data("audio_id")
        var cartList=getCookie("shoppingcart")
        cartList=JSON.parse(cartList)
        // 遍历cookie中相同的id商品
		for(var i=0;i<cartList.length;i++){
			if(cartList[i].id === id){
                cartList.splice(i,1)//移除对应位置的商品信息
                console.log(i)
				break;
			}
        }
        // 更新购物车商品信息cookie
        var exp = new Date();
        exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
        document.cookie = "shoppingcart=" + JSON.stringify(cartList) + ";expires=" + exp.toGMTString()+ ";path=/";
        var cartList=getCookie("shoppingcart")
        cartList=JSON.parse(cartList)
        cartList=JSON.stringify(cartList)
        // console.log("new-del-com>>>>>:"+cartList)
        $(this).parent().parent().parent().parent().parent().parent().remove()
        checkshoppingcartnum()
    })

    $(document).on("click","#del-all",function(){
        var cartList=getCookie("shoppingcart")
        cartList=JSON.parse(cartList)
        // 清空数组
        cartList.splice(0)
        // 更新购物车商品信息cookie
        var exp = new Date();
        exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
        document.cookie = "shoppingcart=" + JSON.stringify(cartList) + ";expires=" + exp.toGMTString()+ ";path=/";
        var cartList=getCookie("shoppingcart")
        cartList=JSON.parse(cartList)
        cartList=JSON.stringify(cartList)
        // console.log("new-del-com>>>>>:"+cartList)
        $(".shopping-cart__group").remove()
        checkshoppingcartnum()
    })


})

// 根据购物车cookie，显示购物车list或no，并关联 "数量"、"总价" 显示
function checkshoppingcartnum(){
    var cartList=JSON.parse(getCookie("shoppingcart"))
    var num = cartList.length
    console.log(num)
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
        $(".cart-header__summary").text("您的购物车中有"+ num +"件商品")
        $(".cart-list").css("display","block")
        $(".cart-no").css("display","none")
    }
}

