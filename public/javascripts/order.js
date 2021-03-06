$(function () {
    // 见结算按钮隐藏
    $(".cart-footer__checkout").css("display", "none");
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
            $(".cart-list").css("display", "none");
            $(".cart-no").css("display", "block");
            $(".head-title").text("一条音频都没购买");
        },
        error: function (err) {
            console.error(JSON.stringify(err));
        }
    })
})
$(document).on("click", ".btn-link", function () {
    // 请求删除订单表的该 id 的商品 -> 刷新页面，重新获得订单列表
    var row_id = $(this).data("row_id");
    var upData = {};
    upData._id = row_id;
    $.ajax({
        type: "post",
        contentType: 'application/json',
        url: "/order/del-one",
        data: JSON.stringify(upData),
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function (data) {
            window.location.reload();
        },
        error: function (err) {
            console.error(JSON.stringify(err));
        }
    })
})