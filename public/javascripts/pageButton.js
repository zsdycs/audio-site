// 分页
$(function () {
  // 通过cookie绑定当前页码，选择页码时修改cookie，上传局部刷新音频列表
  var maxpage = parseInt(JSON.parse(getCookie("maxNumPage"))[0].voice_num / 10 + 1)
  var nowpage = JSON.parse(getCookie("maxNumPage"))[0].page
  isInsufficientPage()
  pageinitial(maxpage, nowpage)

  // 点击页码事件
  $(document).on("click", ".paging", function () {

    $("#audioList").addClass("loader")
    $(".audioLis_ul").css("display", "none")
    $(".paging").removeClass("active")
    $(this).addClass("active")
    // 更新当前页码
    nowpage = parseInt($(this).text())
    var data = {
      tag: [],
      price: [],
      time: "",
      sort: "",
      page: ""
    }
    var filtrateTagList = JSON.parse(getCookie("filtrateTagList"))
    data.price[0] = filtrateTagList[0].price[0]
    data.price[1] = filtrateTagList[0].price[1]
    data.time = filtrateTagList[0].time
    data.sort = filtrateTagList[0].sort
    data.page = (nowpage - 1) * 10
    for (var i = 0; i < filtrateTagList[0].tag.length; i++) {
      data.tag[i] = filtrateTagList[0].tag[i]
    }
    // 判断当前是否为搜索结果
    if (filtrateTagList[0].searchValue == "") {
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
    } else {
      // 搜索结果分页
      var data = {}
      data.page = (nowpage - 1) * 10
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
        }
      })
    }
  })

  // 分页→右
  $(document).on("click", ".toendpage", function () {
    if (parseInt($(".pageend").text()) < maxpage) {
      for (i = 0; i < $(".paging").length; i++) {
        $(".paging").eq(i).text(parseInt($(".paging").eq(i).text()) + 4)
        if (parseInt($(".paging").eq(i).text()) == nowpage) {
          $(".paging").eq(i).addClass("active")
        } else {
          $(".paging").eq(i).removeClass("active")
        }
        if (parseInt($(".paging").eq(i).text()) > maxpage) {
          $(".paging").eq(i).css("display", "none")
        }
      }
    }
  })
  // 分页←左
  $(document).on("click", ".tofistpage", function () {
    if (parseInt($(".pagefist").text()) > 1 && parseInt($(".pagefist").text()) <= 4) {
      for (i = 0; i < $(".paging").length; i++) {
        $(".paging").eq(i).text(i + 1)
      }
    } else if (parseInt($(".pagefist").text()) > 4) {
      $(".paging").css("display", "block")
      for (i = 0; i < $(".paging").length; i++) {
        $(".paging").eq(i).text(parseInt($(".paging").eq(i).text()) - 4)
        if (parseInt($(".paging").eq(i).text()) == nowpage) {
          $(".paging").eq(i).addClass("active")
        } else {
          $(".paging").eq(i).removeClass("active")
        }
      }
    }
  })

  // 页码超出隐藏
  function isInsufficientPage() {
    for (i = 0; i < $(".paging").length; i++) {
      if (parseInt($(".paging").eq(i).text()) > maxpage) {
        $(".paging").eq(i).css("display", "none")
      }
    }
  }
  // 将当前页码设置为最前项，并给当前页码加 "active"
  function pageinitial(maxpage, nowpage) {
    for (i = 0; i < $(".paging").length; i++) {
      $(".paging").eq(i).text(parseInt($(".paging").eq(i).text()) + nowpage - 1)

      if (parseInt($(".paging").eq(i).text()) == nowpage) {
        $(".paging").eq(i).addClass("active")
      } else {
        $(".paging").eq(i).removeClass("active")
      }
      if (parseInt($(".paging").eq(i).text()) > maxpage) {
        $(".paging").eq(i).css("display", "none")
      }
    }
  }

})