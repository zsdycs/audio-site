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
  // $("#segment").animate({"opacity":"0.8"},15000); 
  //x上限，y下限     
  var x = 16;
  var y = 1;
  var rand = parseInt(Math.random() * (x - y + 1) + y);
  // "bg"+rand
  $("#segment").addClass("bg" + 5)

  newsorttitle()
});

// 如果购物车cookie不存在写入空购物车cookie
if (getCookie("shoppingcart") == "") {
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
  document.cookie = "shoppingcart=[];expires=" + exp.toGMTString() + ";path=/";
}
// 初始化筛选项变量。标签，价格，时间
// 标签
var tag = new Array()
// 价格，最大金额通过cookie获得，测试使用固定值
var price = new Array()
tag[0] = "music"
price[0] = 1, price[1] = 1998
// 时间,状态值=1:所有，2：最近一周，3：最近一个月，4：最近3个月，5：最近1年。
var filtrate = {
    tag: tag,
    price: price,
    time: 1,
    searchValue: ""
  },
  filtrateList = [];
filtrateList.push(filtrate);
// 如果筛选项cookie不存在，写入空筛选项cookie
if (getCookie("filtrateTagList") == "") {
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
  document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString() + ";path=/";
}
// 初始化maxNumPage
if (getCookie("maxNumPage") == "") {
  var max_price = 1998
  var voice_num = 52112
  var maxNumPage = {
      max_price: max_price,
      voice_num: voice_num,
      page: 1
    },
    maxNumPagelist = [];
  maxNumPagelist.push(maxNumPage);
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
  document.cookie = "maxNumPage=" + JSON.stringify(maxNumPagelist) + ";expires=" + exp.toGMTString() + ";path=/";
}
// 通过post获得页面状态，最大价格max_price,当前音频数量voice_num写入cookie
var data = {
  tag: [],
  price: [],
  time: ""
}
var filtrateTagList = JSON.parse(getCookie("filtrateTagList"))
data.price[0] = filtrateTagList[0].price[0]
data.price[1] = filtrateTagList[0].price[1]
data.time = filtrateTagList[0].time
for (var i = 0; i < filtrateTagList[0].tag.length; i++) {
  data.tag[i] = filtrateTagList[0].tag[i]
}
$.ajax({
  type: "post",
  data: JSON.stringify(data),
  url: "/index/pages",
  contentType: 'application/json',
  dataType: 'json',
  cache: false,
  timeout: 5000,
  success: function (data) {
    // console.log(JSON.stringify(data))
    if (data.length == 0) {
      var maxNumPage = {
        max_price: 1998,
        voice_num: 0,
        page: 4
      }
    } else {
      var maxNumPage = {
        max_price: data[0].max_price,
        voice_num: data[0].voice_num,
        page: 1
      }
    }
    var maxNumPagelist = [];
    maxNumPagelist.push(maxNumPage);
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
    document.cookie = "maxNumPage=" + JSON.stringify(maxNumPagelist) + ";expires=" + exp.toGMTString() + ";path=/";
  }
})

$(function () {

  getFiltrateByCookieForRtopList()
  // FiltrateAndAudioByCookie()
  //筛选列表折叠事件
  $(document).on("click", ".filtrate-button", function () {
    if ($(this).attr("aria-label") == "collapse") {
      $(this).removeClass("open-filtrate")
      $(this).attr("aria-label", "spread")
      $(this).next().css("display", "none")
    } else {
      $(this).addClass("open-filtrate")
      $(this).attr("aria-label", "collapse")
      $(this).next().css("display", "block")
    }
  })
  // 排序选项列表
  $('.ui.dropdown').dropdown();
  $(document).on("click", ".rank-a", function () {
    $("#audioList").addClass("loader")
    $(".audioLis_ul").css("display", "none")
    // console.log($(this).text()) 
    // ajax排序请求局部刷新audioList
    // 修改列表标题
    $('.dropdown-title').html($(this).text())
    sort($(this).text())
    var data = {
      tag: [],
      price: [],
      time: "",
      sort: "",
      page: ""
    }
    var filtrateTagList = JSON.parse(getCookie("filtrateTagList"))
    // 清空搜索词
    filtrateTagList[0].searchValue = ""
    var maxNumPage = JSON.parse(getCookie("maxNumPage"))
    data.price[0] = filtrateTagList[0].price[0]
    data.price[1] = filtrateTagList[0].price[1]
    data.time = filtrateTagList[0].time
    data.sort = filtrateTagList[0].sort
    data.page = (maxNumPage[0].page - 1) * 10
    for (var i = 0; i < filtrateTagList[0].tag.length; i++) {
      data.tag[i] = filtrateTagList[0].tag[i]
    }
    $.ajax({
      type: "post",
      data: JSON.stringify(data),
      url: "/index/list",
      contentType: 'application/json',
      dataType: 'json',
      cache: false,
      timeout: 5000,
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].div_id = "audio" + i
          t[i] = data[i].filePath
          id[i] = "#audio" + i
        }
        $("wave").remove()
        Vue.set(audioList.audioList = data)
        // self.audioList = data
        // console.log(data)

        data = JSON.stringify(data)
        // console.log(data)

      }
    })
  })

})


// 渲染右边标签项，从cookie获取数据
function getFiltrateByCookieForRtopList() {
  //已选标签列表
  var labeltagList = new Vue({
    el: '#labeltagList',
    data: {
      labeltagList: [],
    },
    created() {
      ////////////测试用数据//////////////
      data = [
        // {
        //   tag_name:'电子',
        // },
      ]
      //////////测试用数据结束////////////
      // }
      var self = this;
      filtrateList = JSON.parse(getCookie("filtrateTagList"))
      // 标签
      for (var i = 0; i < filtrateList[0].tag.length; i++) {
        if (filtrateList[0].tag[i] != "music") {
          var tag_name = filtrateList[0].tag[i]
          var tag_one = {
            tag_name: tag_name
          }
          data.push(tag_one)
        }

      }
      // 价格
      // 通过cookie获得最大价格
      maxNumPagelist = JSON.parse(getCookie("maxNumPage"))
      var max_price = maxNumPagelist[0].max_price
      if (!(filtrateList[0].price[0] == 1 && filtrateList[0].price[1] == max_price)) {
        var tag_name = "￥" + filtrateList[0].price[0] + " - ￥" + filtrateList[0].price[1]
        var tag_one = {
          tag_name: tag_name
        }
        data.push(tag_one)
      }
      // 时间
      if (filtrateList[0].time != 1) {
        if (filtrateList[0].time == 2) {
          set_time("最近1周")
        } else if (filtrateList[0].time == 3) {
          set_time("最近1月")
        } else if (filtrateList[0].time == 4) {
          set_time("最近3月")
        } else {
          set_time("最近1年")
        }

        function set_time(t) {
          var tag_one = {
            tag_name: t
          }
          data.push(tag_one)
        }
      }

      self.labeltagList = data
      // console.log("1---"+data)
      data = JSON.stringify(data)
      // console.log("2---"+data)
    },
    watch: {
      labeltagList: function () {
        this.$nextTick(function () {
            labeltagListisloading()
            // console.log('v-for渲染已经完成')
          }

        )
      }
    }
  });
}

function labeltagListisloading() {
  $(".labeltag").removeClass("loader")
}
// 删除所选标签
$(document).on("click", ".labeltag", function () {
  // 修改cookie
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
  filtrateList = JSON.parse(getCookie("filtrateTagList"))
  for (var i = 0; i < filtrateList[0].tag.length; i++) {
    if (filtrateList[0].tag[i] == $(this).text()) {
      filtrateList[0].tag.splice(i, 1)
      break;
    }
  }
  if ($(this).text().indexOf("￥") >= 0) {
    // cookie获得最大值
    maxNumPagelist = JSON.parse(getCookie("maxNumPage"))
    var max_price = maxNumPagelist[0].max_price
    filtrateList[0].price[0] = 1
    filtrateList[0].price[1] = max_price
  }
  if ($(this).text() == "最近1周" || $(this).text() == "最近1月" || $(this).text() == "最近3月" || $(this).text() == "最近1年") {
    filtrateList[0].time = 1
  }
  document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString() + ";path=/";
  $(this).remove()
  // 刷新页面刷新
  window.location.reload()

})


// 根据cookie筛选项显示页面筛选项状态，数据绑定
function FiltrateAndAudioByCookie() {
  filtrateList = JSON.parse(getCookie("filtrateTagList"))
  maxNumPagelist = JSON.parse(getCookie("maxNumPage"))
  // 关联数量
  $(".audio_num").text(maxNumPagelist[0].voice_num)
  // 关联标签$(".demo:eq(n)")
  $(".input-check-tag").each(function () {
    filtrateList = JSON.parse(getCookie("filtrateTagList"))
    for (var i = 0; i < filtrateList[0].tag.length; i++) {
      if (filtrateList[0].tag[i] == $(this).next().text()) {
        $(this).prop("checked", true)
      }
    }
  })
  // 关联价格状态
  var price_max = maxNumPagelist[0].max_price
  if (price_max == filtrateList[0].price[1]) {
    $(".price-r-input").attr("placeholder", price_max)
  } else {
    $(".price-r-input").attr("value", filtrateList[0].price[1])
  }
  if (filtrateList[0].price[0] == 1) {
    $(".price-l-input").attr("placeholder", 1)
  } else {
    $(".price-l-input").attr("value", filtrateList[0].price[0])
  }
  // 关联时间状态
  $(".label_time[data-time=" + filtrateList[0].time + "]").prev().attr("checked", true)

}
// 标签-------------------
// 左边tag选择->写入cookie->上传后右边的音频列表内容刷新->左边选择列表上传给后端，返回新了可选项列表
$(document).on("click", ".input-check-tag", function () {
  // 被选中
  if ($(this).prop("checked")) {
    // 写入cookie
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
    //流程，取出标签，通过length添加到空位
    filtrateList = JSON.parse(getCookie("filtrateTagList"))
    // 清空搜索词
    filtrateList[0].searchValue = ""
    filtrateList[0].tag[filtrateList[0].tag.length] = $(this).next().text()
    document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString() + ";path=/";
    // console.log("ed:"+$(this).next().text())
  } else {
    // 取消选中修改cookie
    // console.log("didn't:"+$(this).next().text())
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
    // 流程，取出标签，遍历找到数组所在位置，移除位置的值
    filtrateList = JSON.parse(getCookie("filtrateTagList"))
    for (var i = 0; i < filtrateList[0].tag.length; i++) {
      if (filtrateList[0].tag[i] == $(this).next().text()) {
        filtrateList[0].tag.splice(i, 1)
        break;
      }
    }
    document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString() + ";path=/";
  }
  // 上传cookie（上传所有筛选项，返回音频列表与可筛选项，刷新列表，可复用函数）
  window.location.reload()
})
// 价格--------------------
$(document).on("click", ".price_button", function () {
  // 通过cookie获得最大价格》》》
  maxNumPagelist = JSON.parse(getCookie("maxNumPage"))
  var price_max = maxNumPagelist[0].max_price

  if ($(".price-l-input").val() != "" && $(".price-r-input").val() == "") {
    console.log(1)
    todo($(".price-l-input").val(), price_max, price_max)
  } else if ($(".price-l-input").val() == "" && $(".price-r-input").val() != "") {
    console.log(2)
    todo(1, $(".price-r-input").val(), price_max)

  } else if ($(".price-r-input").val() == "" && $(".price-l-input").val() == "") {
    console.log(3)
    todo(1, price_max, price_max)
  } else {
    console.log(4)
    todo($(".price-l-input").val(), $(".price-r-input").val(), price_max)
  }

  function todo(l, r, max) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
    // 流程，取出标签，遍历找到数组所在位置，移除位置的值
    filtrateList = JSON.parse(getCookie("filtrateTagList"))
    // 清空搜索词
    filtrateList[0].searchValue = ""
    var price_l = l,
      price_r = r
    if (parseInt(price_l) > parseInt(price_r)) {
      console.log("l:" + price_l + "---r:" + price_r)
      $(".price-r-input").val(max)
      price_r = $(".price-r-input").val()
    }
    // 写入cookie
    filtrateList[0].price[0] = price_l, filtrateList[0].price[1] = price_r
    document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString() + ";path=/";
    // console.log("min:"+price_l+"  max:"+price_r)
    // 上传cookie（上传所有筛选项，返回音频列表与可筛选项，刷新列表，可复用函数）
    window.location.reload()
  }

})
// 时间--------------------
$(document).on("click", ".label_time", function () {
  filtrateList = JSON.parse(getCookie("filtrateTagList"))
  // 清空搜索词
  filtrateList[0].searchValue = ""
  if (filtrateList[0].time != $(this).data("time")) {
    // 写入cookie
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
    filtrateList[0].time = $(this).data("time")
    document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString() + ";path=/";
    // 上传cookie（上传所有筛选项，返回音频列表与可筛选项，刷新列表，可复用函数）
    window.location.reload()
  }
})


////数量输入规则/////

// 输入,最大值根据请求获得，例9904
$(document).on("keyup", ".price-l-input", function () {
  // if(isNaN(this.value)||this.value==''||this.value==0){
  //   this.value=1;
  // }
  maxNumPagelist = JSON.parse(getCookie("maxNumPage"))
  var max_price = maxNumPagelist[0].max_price
  if (this.value > max_price) {
    this.value = max_price;
  }
  if (this.value.length == 1) {
    this.value = this.value.replace(/[^1-9]/g, '')
  } else {
    this.value = this.value.replace(/\D/g, '')
  }
})
// 粘贴
$(document).on("blur", ".price-l-input", function () {
  if (this.value.length == 1) {
    this.value = this.value.replace(/[^1-9]/g, '')
  } else {
    this.value = this.value.replace(/\D/g, '')
  }
})
// 右边
$(document).on("keyup", ".price-r-input", function () {
  // 获取页面加载获得的cookie，得到最大价格
  maxNumPagelist = JSON.parse(getCookie("maxNumPage"))
  var max_price = maxNumPagelist[0].max_price
  if (this.value > max_price) {
    this.value = max_price;
  }
  if (this.value.length == 1) {
    this.value = this.value.replace(/[^1-9]/g, '')
  } else {
    this.value = this.value.replace(/\D/g, '')
  }
})
// 粘贴
$(document).on("blur", ".price-r-input", function () {
  // 获取页面加载获得的cookie，得到最大价格
  maxNumPagelist = JSON.parse(getCookie("maxNumPage"))
  var max_price = maxNumPagelist[0].max_price
  // if(isNaN(this.value)||this.value==''||this.value==0){
  //   this.value=max_price;
  // }
  if (this.value > max_price) {
    this.value = max_price;
  }
  if (this.value.length == 1) {
    this.value = this.value.replace(/[^1-9]/g, '')
  } else {
    this.value = this.value.replace(/\D/g, '')
  }
})


//搜索,模糊搜索，不区分大小写，流程--->写入列表顶部标签cookie，搜索请求，局部刷新，侧边标签选择忽略该key
$(document).on('keypress', '.forsearch', function (event) {
  if (event.keyCode == "13" && $(this).val() != "") {
    var searchValue = $(this).val()
    var filtrateTagList = JSON.parse(getCookie("filtrateTagList"))

    // 清空tag、价格、时间
    filtrateTagList[0].tag.splice(0, filtrateTagList[0].tag.length)
    filtrateTagList[0].tag[0] = "music"
    filtrateTagList[0].price[0] = 1
    filtrateTagList[0].price[1] = 1998
    filtrateTagList[0].time = 1
    filtrateTagList[0].sort = "null"

    filtrateTagList[0].searchValue = searchValue
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
    document.cookie = "filtrateTagList=" + JSON.stringify(filtrateTagList) + ";expires=" + exp.toGMTString() + ";path=/";

    $("#audioList").addClass("loader")
    $(".audioLis_ul").css("display", "none")
    var data = {}
    data.page = 1
    data.fileName = JSON.parse(getCookie("filtrateTagList"))[0].searchValue
    $.ajax({
      type: "post",
      data: JSON.stringify(data),
      url: "/index/search",
      contentType: 'application/json',
      dataType: 'json',
      cache: false,
      timeout: 5000,
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].div_id = "audio" + i
          t[i] = data[i].filePath
          id[i] = "#audio" + i
        }
        $("wave").remove()
        Vue.set(audioList.audioList = data)
        checkAudioNum(data)
        if (data.length == 0) {
          // $(".audio_num").text("0")
          $("#pagediv").css("display", "none")
        }
      }
    })
  }
})


// 根据cookie初始化排序
function newsorttitle() {
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
  filtrateList = JSON.parse(getCookie("filtrateTagList"))
  filtrateList[0].sort = "null"
  document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString() + ";path=/";
}

function sort(title) {
  // 绑定排序方式
  // 写入cookie
  var sort = ""
  if (title == "综合排序") {
    sort = "null"
  } else if (title == "销售最高") {
    sort = "sales"
  } else if (title == "价格最低") {
    sort = "price"
  } else if (title == "日期最新") {
    sort = "time"
  }
  var exp = new Date();
  exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
  filtrateList = JSON.parse(getCookie("filtrateTagList"))
  filtrateList[0].sort = sort
  document.cookie = "filtrateTagList=" + JSON.stringify(filtrateList) + ";expires=" + exp.toGMTString() + ";path=/";
}