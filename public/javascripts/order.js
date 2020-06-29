$(function () {
    // 见结算按钮隐藏
    $(".cart-footer__checkout").css("display", "none")

})
$(document).on("click", "#del-all", function () {
    // 请求清所有订单
    $.ajax({
        type: "post",
        contentType: 'application/json',
        url: "/order/del-all",
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function (data) {
            // console.log(JSON.stringify(data));
            $(".cart-list").css("display", "none")
            $(".cart-no").css("display", "block")
            $(".head-title").text("一条音频都没购买")
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    })
})
$(document).on("click", ".btn-link", function () {
    // 请求删除订单表的该id的商品---->>刷新页面，重新获得订单列表
    var row_id = $(this).data("row_id")
    var updata = {}
    updata._id = row_id
    $.ajax({
        type: "post",
        contentType: 'application/json',
        url: "/order/del-one",
        data: JSON.stringify(updata),
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function (data) {
            // console.log(JSON.stringify(data));
            window.location.reload()
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    })
})