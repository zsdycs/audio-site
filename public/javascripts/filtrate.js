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
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
                {
                    tag_name:'电子',
                    music_num:'32',
                    id:'1111',
                },
                {
                    tag_name:'事件',
                    music_num:'212',
                    id:'1111',
                },
                {
                    tag_name:'轻快',
                    music_num:'712',
                    id:'1111',
                },
                {
                    tag_name:'电视',
                    music_num:'152',
                    id:'1111',
                },
        ]
			//////////测试用数据结束////////////
        // tagList=JSON.parse(this.tagList)
        // for(var i=0;i<3;i++){
            // var music=tagList[i].music
            // var t1='013kt143.mp3'
            // var w1="w1"
            // var w2="w2"
            // var w3="w3"
            // new_wave(w1,t1)
            // var t1='013kt130.mp3'
            // new_wave(w2,t1)
            // var t1='46570_1082_1337.mp3'
            // new_wave(w3,t1)
        // }
		var self=this;
		// var updata = {id:1};
		// $.ajax({
		// 	type: "get",
		// 	data:updata,
		// 	url: "",
		// 	dataType: 'json',
		// 	success: function (data) {
                self.tagList = data
                console.log("1---"+data)
                
				data=JSON.stringify(data)
				console.log("2---"+data)

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