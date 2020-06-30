// 购物车按钮
$(document).on("click", ".add-cart-button", function () {
  $("#select-price").empty()
  $("#SelectLicenses").css("display", "block")
  $("body").css({
    overflow: "hidden"
  })
  // 关联数据
  // .data("action")
  var one = $(this).data("price_one")
  var unlimited = $(this).data("price_unlimited")
  var name = $(this).data("audioname")
  var audio_id = $(this).data("audio_id")
  $("#select-price").append("<option value =\"" + one + "\">一次性 - ￥" + one + "</option>")
  $("#select-price").append("<option value =\"" + unlimited + "\">无限制 - ￥" + unlimited + "</option>")
  $("#selected-audio-name").text(name)

  $(".s-button").data("audio_id", audio_id)
  $(".s-button").data("one", one)
  $(".s-button").data("unlimited", unlimited)

  $("#selected-price").text($("#select-price").val())
  if ($("#select-price").val() == one) {
    $("#selected-license").text("一次性")
  } else if ($("#select-price").val() == unlimited) {
    $("#selected-license").text("无限制")
  }
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
  $("#SelectLicenses").css("display", "none")
  $("#HadSelect").css("display", "block")
  // 绑定添加成功弹框数据
  $("#hadSelectName").text($("#selected-audio-name").text())
  $("#hadSelectPrice").text($("#selected-price").text())
  $("#hadSelectLicenses").text($("#selected-license").text())

  var id = $(this).data("audio_id")
  var one = $(this).data("one")
  var unlimited = $(this).data("unlimited")

  // 写入购物车 cookie，名字，金额，许可证，id
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); // 24 小时
  var name = $("#hadSelectName").text(),
    price = $("#hadSelectPrice").text(),
    license = $("#hadSelectLicenses").text()
  var audios = {
    audioId: id,
    name: name,
    price: price,
    license: license,
    one: one,
    unlimited: unlimited
  }
  var audioList = []
  // 如果 cooki 为空，直接添加
  if (getCookie("shoppingcart").length == 0) {
    // 添加到 audioList
    audioList.push(audios);
  } else {
    audioList = JSON.parse(getCookie("shoppingcart"))
    // 购物车有商品，判断当前加入是否包含，包含则移除，再添加
    // 先判断 cookie 中有无相同的id商品
    for (var i = 0; i < audioList.length; i++) {
      if (audioList[i].audioId === id) {
        audioList.splice(i, 1)
        audioList.push(audios);
        break;
      }
    }
    // 如果原cookie 中没有当前商品
    if (i === audioList.length) {
      // 添加到 audioList
      audioList.push(audios);
    }
  }
  document.cookie = "shoppingcart=" + JSON.stringify(audioList) + ";expires=" + exp.toGMTString() + ";path=/";
  var data = getCookie("shoppingcart")
  data = JSON.parse(data)
  data = JSON.stringify(data)


})
// 加入成功-马上结算 -> 购物车页！！！不做结算页啦啦啦
$(document).on("click", ".add-s-button", function () {
  window.location.href = "/cart"
  $("#HadSelect").css("display", "none")
  $('body').css('overflow', 'auto');
})
// 返回浏览
$(document).on("click", ".add-c-button", function () {
  $("#HadSelect").css("display", "none")
  $('body').css('overflow', 'auto');
})