$(function(){
    $(".cart-footer__checkout").css("display","none")
    $(".cart_entry__information-detail").data("position","right center")
    if($('.cart_entry__information-detail').text() == "一次性"){
        $('.cart_entry__information-detail').popup({
            title   : '许可说明',
            content : '这里是关于“一次性”许可证的使用说明'
        });
    }else{
        $('.cart_entry__information-detail').popup({
            title   : '许可说明',
            content : '这里是关于“无限制”许可证的使用说明'
        });
    }
    $(document).on("click","#del-all",function(){
        // 请求清所有订单---->>刷新界面，重新获得订单列表

        console.log("你点击了清除所有的按钮")
    })
    $(document).on("click",".btn-link",function(){
        // 请求删除订单表的该id的商品---->>刷新页面，重新获得订单列表

        console.log("你点击了删除单条订单的按钮")
    })
    //  data-inverted="" data-tooltip="Add users to your feed" data-position="left center"
})