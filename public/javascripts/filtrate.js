// 标签列表
var tagList = new Vue({
	el: '#tagList',
	data: {
		tagList: [],
	},
	created() {
		////////////测试用数据//////////////
		// 	data=[
		//         {
		//             _id:'电子',
		//             music_num:'32',
		//         },
		//         {
		//             _id:'事件',
		//             music_num:'212',
		//         },
		//         {
		//             _id:'轻快',
		//             music_num:'712',
		//         },
		//         {
		//             _id:'电视',
		//             music_num:'152',
		//         }
		// ]
		//////////测试用数据结束////////////

		var tag = JSON.parse(getCookie("filtrateTagList"))[0].tag,
			match = {};
		match.tag = tag
		// 去除末尾的逗号
		// match = match.substring(0, match.lastIndexOf(','));
		var self = this;
		$.ajax({
			type: "post",
			url: "/index/filtrate/tag",
			data: JSON.stringify(match),
			contentType: 'application/json',
			dataType: 'json',
			cache: false,
			timeout: 5000,
			success: function (data) {
				filtrateList = JSON.parse(getCookie("filtrateTagList"))
				// 标签第一项不为初始""，或不为不存在，filtrateList[0].tag[0] != "" &&
				if (data.length !== 0 && data[0]._id == "music") {
					data.splice(0, 1)
				} else if (filtrateList[0].tag[0] != undefined) {
					for (var i = 0; i < data.length; i++) {
						// 获得 music 的项，不在 cookie 的，去掉
						if (data[i]._id == "music") {
							data.splice(i, 1)
							var k = 0
							for (var j = filtrateList[0].tag.length; j < i; j++) {
								data.splice(j - k, 1)
								k++
							}
							break;
						}
					}
				}

				self.tagList = data
				data = JSON.stringify(data)
			}
		})
	},
	watch: {
		tagList: function () {
			this.$nextTick(function () {
					tagListIsLoading()
					FiltrateAndAudioByCookie()
					// console.log('v-for 渲染已经完成')
				}

			)
		}
	}
});
// 标签列表渲染完成隐藏
function tagListIsLoading() {
	$("#tagList").removeClass("loader")
}