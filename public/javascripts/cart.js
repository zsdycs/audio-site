$(function () {

    // 判断 shoppingCart 是否有商品
    checkShoppingCartNum()

    // 删除商品
    $(document).on("click", ".btn-link", function () {
        var id = $(this).data("audio_id")
        var cartList = getCookie("shoppingCart")
        cartList = JSON.parse(cartList)
        // 遍历cookie中相同的id商品
        for (var i = 0; i < cartList.length; i++) {
            if (cartList[i].audioId == id) {
                cartList.splice(i, 1) // 移除对应位置的商品信息
                break;
            }
        }
        // 更新购物车商品信息 cookie
        var exp = new Date();
        exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); // 24 小时
        document.cookie = "shoppingCart=" + JSON.stringify(cartList) + ";expires=" + exp.toGMTString() + ";path=/";
        var cartList = getCookie("shoppingCart")
        cartList = JSON.parse(cartList)
        cartList = JSON.stringify(cartList)
        $(this).parent().parent().parent().parent().parent().parent().remove()
        checkShoppingCartNum()
    })

    // 清除所有
    $(document).on("click", "#del-all", function () {
        var cartList = getCookie("shoppingCart")
        cartList = JSON.parse(cartList)
        // 清空数组
        cartList.splice(0)
        // 更新购物车商品信息 cookie
        var exp = new Date();
        exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); // 24 小时
        document.cookie = "shoppingCart=" + JSON.stringify(cartList) + ";expires=" + exp.toGMTString() + ";path=/";

        var cartList = getCookie("shoppingCart")
        cartList = JSON.parse(cartList)
        cartList = JSON.stringify(cartList)
        $(".shopping-cart__group").remove()
        checkShoppingCartNum()
    })

    // 更换许可证
    $(document).on("click", ".cart_entry__information-detail", function () {
        $("#select-price").empty()
        // 修改并添加弹框页面数据
        var id = $(this).data("id")
        var name = $(this).data("name")
        var price = $(this).data("price")
        var one = $(this).data("one")
        var unlimited = $(this).data("unlimited")

        $("#select-price").append("<option value =\"" + one + "\">一次性 - ￥" + one + "</option>")
        $("#select-price").append("<option value =\"" + unlimited + "\">无限制 - ￥" + unlimited + "</option>")

        $("#selected-audio-name").text(name)
        $("#selected-price").text(price)

        $("#select-price").find("option[value=" + price + "]").attr("selected", true);

        if (price == one) {
            $("#selected-license").text("一次性")
        } else if (price == unlimited) {
            $("#selected-license").text("无限制")
        }

        $(".s-button").text("确定")
        $(".s-button").data("id", id)

        $("#SelectLicenses").css("display", "block")
        $("body").css({
            overflow: "hidden"
        })
    })

    // 选择许可证
    $(document).on("click", "#select-price", function () {
        var selected = $("#select-price").find("option:selected").text()
        $("#selected-price").text($("#select-price").val())
        if (selected.indexOf("一次性") >= 0) {
            $("#selected-license").text("一次性")
        } else {
            $("#selected-license").text("无限制")
        }
    })

    // 取消加入
    $(document).on("click", ".c-button", function () {
        $("#select-price").empty()
        $("#SelectLicenses").css("display", "none")
        $('body').css('overflow', 'auto');
    })

    // 确认加入
    $(document).on("click", ".s-button", function () {
        // 根据 id 修改 "许可证" 、 "金额" ，写入购物车 cookie
        var exp = new Date();
        exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); // 24 小时
        var id = $(this).data("id")
        var audioList = JSON.parse(getCookie("shoppingCart"))
        // 先判断 cookie 中有无相同的id商品
        for (var i = 0; i < audioList.length; i++) {
            if (audioList[i].audioId == id) {
                audioList[i].price = $("#selected-price").text()
                audioList[i].license = $("#selected-license").text()
                break;
            }
        }
        document.cookie = "shoppingCart=" + JSON.stringify(audioList) + ";expires=" + exp.toGMTString() + ";path=/";
        var data = getCookie("shoppingCart")
        data = JSON.parse(data)
        // 局部刷新
        Vue.set(List.List = data)
        data = JSON.stringify(data)
        $("#select-price").empty()
        $("#SelectLicenses").css("display", "none")
        $('body').css('overflow', 'auto');
    })

    // 结算按钮，提交请求，order 表取自 shoppingCart（id，price 价格，name 名称，license 许可证）
    // 清空购物车，忽略支付，直接跳转到已购买
    $(document).on("click", "#listPostButton", function () {

        var upData = JSON.stringify(JSON.parse(getCookie("shoppingCart")))

        $.ajax({
            type: "post",
            contentType: 'application/json',
            data: upData,
            url: "/cart",
            dataType: 'json',
            cache: false,
            timeout: 5000,
            success: function (data) {
                if (data.status == "notLoggedIn") {
                    window.location.href = '/signin';
                } else if (data.status == "success") {
                    // 清空数组
                    var cartList = getCookie("shoppingCart")
                    cartList = JSON.parse(cartList)
                    cartList.splice(0)
                    // 更新购物车商品信息 cookie
                    var exp = new Date();
                    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24 小时
                    document.cookie = "shoppingCart=" + JSON.stringify(cartList) + ";expires=" + exp.toGMTString() + ";path=/";
                    window.location.href = '/order'

                } else if (data.status == "noSuccess") {
                    window.location.reload()
                } else(
                    console.error("非法请求" + data.status)
                )
            },
            error: function (err) {
                console.error(JSON.stringify(err));
            }
        })
    })

})