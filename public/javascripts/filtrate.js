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