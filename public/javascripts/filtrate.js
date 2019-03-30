//标签列表
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
		
		var tag = JSON.parse(getCookie("filtrateTagList"))[0].tag, match = {};
		match.tag=tag
		console.log(JSON.stringify(match))
		// 去除末尾的逗号
		// match = match.substring(0, match.lastIndexOf(','));
		// console.log(match)
		var self=this;
		$.ajax({
			type: "post",
			url: "/index/filtrate/tag",
			data:JSON.stringify(match),
			contentType:'application/json',
			dataType: 'json',
			cache: false,
			timeout: 5000,
			success: function (data) {

				// 通过get获得页面状态，最大价格max_price,当前音频数量voice_num写入cookie
				var max_price = 1998,voice_num = 52112
				var maxandnum = { max_price:max_price,voice_num:voice_num },maxandnumlist = [];
				maxandnumlist.push(maxandnum);	
				var exp = new Date();
				exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
				document.cookie = "maxAndNum=" + JSON.stringify(maxandnumlist) + ";expires=" + exp.toGMTString()+ ";path=/";

				self.tagList = data
                // console.log("1---"+data)
				data=JSON.stringify(data)
				// console.log("2---"+data)

			}
		})
	},
	watch:{    
		tagList:function(){  
			this.$nextTick(function (){
				tagListisloading()
				// console.log('v-for渲染已经完成')
			}
		
		)}
	}
});
// 标签列表渲染完成隐藏
function tagListisloading(){
	$("#tagList").removeClass("loader")
}