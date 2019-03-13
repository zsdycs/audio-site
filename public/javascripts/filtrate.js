//标签列表
var tagList = new Vue({
	el: '#tagList',
	data: {
		tagList: [],
	},
	created() {
        ////////////测试用数据//////////////
			data=[
                {
                    tag_name:'电子',
                    music_num:'32',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                }
        ]
			//////////测试用数据结束////////////
		var self=this;
		// var updata = {id:1};
		// $.ajax({
		// 	type: "get",
		// 	data:updata,
		// 	url: "",
		// 	dataType: 'json',
		// 	success: function (data) {
				// 通过get获得页面状态，最大价格max_price,当前音频数量voice_num写入cookie
				var max_price = 9999,voice_num = 50000
				var maxandnum = { max_price:max_price,voice_num:voice_num },maxandnumlist = [];
				maxandnumlist.push(maxandnum);	
				var exp = new Date();
				exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24); //24小时
				document.cookie = "maxAndNum=" + JSON.stringify(maxandnumlist) + ";expires=" + exp.toGMTString()+ ";path=/";
				self.tagList = data
                // console.log("1---"+data)
				data=JSON.stringify(data)
				// console.log("2---"+data)

		// 	}
		// })
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