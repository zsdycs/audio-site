// playing svg and play svg
var playing_svg_str='<svg fill=\"currentColor\" preserveAspectRatio=\"xMidYMid meet\" height=\"1em\" width=\"1em\"'+
'viewBox=\"0 0 30 30\" class=\"play_svg\" data-test-selector=\"audioplayerPauseButton\" style=\"vertical-align: middle;\">'+
'<title>Pause</title><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">'+
'<g transform=\"translate(-1.000000, -1.000000)\" fill=\"#000\" fill-rule=\"nonzero\">'+
'<path d=\"M16,1 C7.7125,1 1,7.7125 1,16 C1,24.2875 7.7125,31 16,31 C24.2875,31 31,24.2875 31,16 C31,7.7125 24.2875,1 16,1 Z M14.8779764,17.678113 L14.8554276,22.1907022 C14.8665399,22.3146295 14.8326113,22.4160768 14.7536409,22.4950472 C14.6746704,22.5740177 14.5732231,22.6079463 14.4492959,22.596834 L12.8098773,22.6157868 C12.6972034,22.6159278 12.5986681,22.5737991 12.5142684,22.4893995 C12.4298687,22.4049998 12.38774,22.3064645 12.3878811,22.1937905 L12.4104298,17.6812013 C12.4105708,17.5685274 12.3975126,14.4982006 12.3976536,14.3855267 L12.4033225,9.85605765 C12.4034635,9.74338373 12.445839,9.64474264 12.5304502,9.56013144 C12.6150614,9.47552023 12.7137025,9.43314475 12.8263764,9.43300373 L14.4657527,9.44785293 C14.5784266,9.44771191 14.6769619,9.48984061 14.7613616,9.57424029 C14.8457613,9.65863996 14.88789,9.75717529 14.8877489,9.86984921 L14.8652002,14.3824384 C14.8650592,14.4951123 14.8781174,17.5654391 14.8779764,17.678113 Z M19.7513089,17.678113 L19.7287601,22.1907022 C19.7398724,22.3146295 19.7059438,22.4160768 19.6269733,22.4950472 C19.5480029,22.5740177 19.4465556,22.6079463 19.3226284,22.596834 L17.6832098,22.6157868 C17.5705359,22.6159278 17.4720006,22.5737991 17.3876009,22.4893995 C17.3032012,22.4049998 17.2610725,22.3064645 17.2612135,22.1937905 L17.2837623,17.6812013 C17.2839033,17.5685274 17.2708451,14.4982006 17.2709861,14.3855267 L17.276655,9.85605765 C17.276796,9.74338373 17.3191715,9.64474264 17.4037827,9.56013144 C17.4883939,9.47552023 17.587035,9.43314475 17.6997089,9.43300373 L19.3390851,9.44785293 C19.4517591,9.44771191 19.5502944,9.48984061 19.6346941,9.57424029 C19.7190937,9.65863996 19.7612224,9.75717529 19.7610814,9.86984921 L19.7385326,14.3824384 C19.7383916,14.4951123 19.7514499,17.5654391 19.7513089,17.678113 Z\">'+
'</path></g></g></svg>';
var play_svg_str='<svg fill=\"currentColor\" preserveAspectRatio=\"xMidYMid meet\" height=\"1em\" width=\"1em\"'+
'viewBox=\"0 0 30 30\" class=\"play_svg\" style=\"vertical-align:middle\">'+
'<title>Play</title><g stroke="none" stroke-width="1" fill=\"none\" fill-rule=\"evenodd\">'+
'<g transform=\"translate(-1.000000, -1.000000)\" fill=\"#000\" fill-rule=\"nonzero\">'+
'<path d=\"M21.2224954,16.2938514 C21.2876061,16.3396427 21.320161,16.4006969 21.320161,16.4770157 C21.320161,16.5685983 21.2876061,16.6372842 21.2224954,16.6830755 L13.9952401,22.2466908 C13.9301294,22.2924821 13.8406034,22.3001139 13.7266597,22.2695864 C13.6289936,22.2237951 13.5801612,22.1474774 13.5801612,22.040631 L13.5801612,10.9134004 C13.5801612,10.8218178 13.6289936,10.7531319 13.7266597,10.7073406 C13.8243258,10.6615493 13.9138517,10.6691811 13.9952401,10.7302361 L21.2224954,16.2938514 Z M16,1 C7.7125,1 1,7.7125 1,16 C1,24.2875 7.7125,31 16,31 C24.2875,31 31,24.2875 31,16 C31,7.7125 24.2875,1 16,1 Z M16,29.0645161 C8.79818548,29.0645161 2.93548387,23.2018145 2.93548387,16 C2.93548387,8.79818548 8.79818548,2.93548387 16,2.93548387 C23.2018145,2.93548387 29.0645161,8.79818548 29.0645161,16 C29.0645161,23.2018145 23.2018145,29.0645161 16,29.0645161 Z\">'+
'</path></g></g></svg>';

// 请求获取得到的资源数目 全局变量
var wave=new Array()

//音频列表
var audioList = new Vue({
	el: '#audioList',
	data: {
		audioList: [],
	},
	created() {
        ////////////测试用数据//////////////
			data=[{
                music:'013kt130.mp3',
                music_name:'仙女df棒',
                author_name:'佚名',
                price_one:'131',
                price_unlimited:'3223',
                sales:'33',
                div_id:'audio0',
                audio_id:'2031',
            },
            {
                music:'013kt143.mp3',
                music_name:'仙女aa棒ffasae',
                author_name:'佚名',
                price_one:'331',
                price_unlimited:'433',
                sales:'33',
                div_id:'audio1',
                audio_id:'42333231',
            },
            {
                music:'46570_1082_1337.mp3',
                music_name:'仙ae女棒',
                author_name:'佚名',
                price_one:'41',
                price_unlimited:'523',
                sales:'33',
                div_id:'audio2',
                audio_id:'243231',
            },
            {
                music:'46570_1082_1337.mp3',
                music_name:'仙女棒',
                author_name:'佚名',
                price_one:'21',
                price_unlimited:'143',
                sales:'33',
                div_id:'audio3',
                audio_id:'2453231',
            },
            {
                music:'46570_1082_1337.mp3',
                music_name:'ased仙女棒',
                author_name:'佚名',
                price_one:'231',
                price_unlimited:'323',
                sales:'33',
                div_id:'audio4',
                audio_id:'221131',
            },
            {
                music:'46570_1082_1337.mp3',
                music_name:'asdf仙女棒',
                author_name:'佚名',
                price_one:'2361',
                price_unlimited:'3323',
                sales:'33',
                div_id:'audio5',
                audio_id:'2031',
            },
            {
                music:'46570_1082_1337.mp3',
                music_name:'仙女棒asd',
                author_name:'佚名',
                price_one:'7231',
                price_unlimited:'9323',
                sales:'33',
                div_id:'audio6',
                audio_id:'29311',
            },
            {
                music:'46570_1082_1337.mp3',
                music_name:'ff仙女棒',
                author_name:'佚名',
                price_one:'2431',
                price_unlimited:'22323',
                sales:'33',
                div_id:'audio7',
                audio_id:'24231',
            },
            {
                music:'46570_1082_1337.mp3',
                music_name:'asdfff仙女棒',
                author_name:'佚名',
                price_one:'23531',
                price_unlimited:'36423',
                sales:'33',
                div_id:'audio8',
                audio_id:'21231',
            },
            {
                music:'46570_1082_1337.mp3',
                music_name:'仙女棒dsff',
                author_name:'佚名',
                price_one:'2531',
                price_unlimited:'8323',
                sales:'33',
                div_id:'audio9',
                audio_id:'23112',
            }
        ]
			//////////测试用数据结束////////////
        // audioList=JSON.parse(this.audioList)
        // for(var i=0;i<3;i++){
            // var music=audioList[i].music
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
                self.audioList = data
                // console.log(data)
                
				data=JSON.stringify(data)
				// console.log(data)
                
		// 	}
		// })
	},
	watch:{    
		audioList:function(){  
			this.$nextTick(function (){
				audioListisloading()
				// console.log('v-for渲染已经完成')
			}
		
		)}
	}
});
// 音频列表渲染完成隐藏
function audioListisloading(){
	$("#audioList").removeClass("loader")
}

var t1="/music/动物/猴子.wav"
var id='#audio0'
wave[0] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio1'
wave[1] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio2'
wave[2] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio3'
wave[3] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio4'
wave[4] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio5'
wave[5] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio6'
wave[6] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio7'
wave[7] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio8'
wave[8] = new_wave(id,t1)

var t1="/music/管风琴/3.mp3"
var id='#audio9'
wave[9] = new_wave(id,t1)

// 创建音频对象
function new_wave(name,music){
    var wave = WaveSurfer.create({
    container: document.querySelector(name),
    // 绘制波形之前允许播放音频
    backend: 'MediaElement',
    hideScrollbar:true,
    height : 36,
    plugins: [
        WaveSurfer.cursor.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '2px',
            'font-size': '10px',
        }
      })
    ]
    });
    // 加载音频资源
    wave.load(music);
    return wave
}
$(function(){
    // 添加like事件
    $(document).on("click",".like-a",function(){
        // 判断登录状态
        
        // 请求改变数据库数据

        // 样式变化
        if($(this).attr("class")=="like-a add-like"){
            $(this).removeClass("add-like")
        }else{
            $(this).addClass("add-like")
        }
        
    })
    // 鼠标移入移出增加小圆点
    $(".row_div").hover(function(){
        // 移入
        $(this).removeClass("display_3qnOD")
    },function(){
        $(this).addClass("display_3qnOD")
    });
})
// 秒——>00:00
function secondToDate(result) {
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result =  m + ":" + s;
}

// 播放
$(document).on('click','.btnPlay',function () {
    var wave_isplay=new Array()
    var istrue ="istrue"
    var id=$(this).next().next().children().attr("id")

    // 给数组赋值
    for(var i=0;i<wave.length;i++){
        wave_isplay[i]="is"+wave[i].isPlaying()
    }

    // 判断是否有声音片段正在播放
    if(arrayishave(wave_isplay,istrue)) { 
        //有正在播放，暂停正在播放，开始当前
        wave[arrayisplay(wave_isplay,istrue)].pause();
        // 修改正在播放的按钮状态
        var playing_id="#audio"+arrayisplay(wave_isplay,istrue)
        $(playing_id).parent().prev().prev().empty()
        $(playing_id).parent().prev().prev().append(play_svg_str)
        $(playing_id).parent().prev().prev().removeClass("btnPause")
        $(playing_id).parent().prev().prev().addClass("btnPlay")
        for(var i=0;i<10;i++){
            if(id=="audio"+i){ 
                // console.log(i)
                // 开始播放
                wave[i].play();
                // 修改图标->移除内容->增加内容
                $(this).empty()
                $(this).append(playing_svg_str)
                $(this).removeClass("btnPlay")
                $(this).addClass("btnPause")
            }
        }
    }else{
        for(var i=0;i<wave.length;i++){
            if(id=="audio"+i){ 
                // console.log(i)
                // 开始播放
                wave[i].play();
                // 修改图标->移除内容->增加内容
                $(this).empty()
                $(this).append(playing_svg_str)
                $(this).removeClass("btnPlay")
                $(this).addClass("btnPause")
            }
        }
    }  
});
// 暂停
$(document).on('click','.btnPause', function () {
    var id=$(this).next().next().children().attr("id")
    for(var i=0;i<wave.length;i++){
        if(id=="audio"+i){
        // 暂停播放
        wave[i].pause();
        // 修改图标->移除内容->增加内容
        $(this).empty()
        $(this).append(play_svg_str)
        $(this).removeClass("btnPause")
        $(this).addClass("btnPlay")
        }
    }
});
// 播放结束事件
wave_finish()
// 已播放时间
wave_audioprocess()
// 获取声音片段时间
getTime()
// 播放结束事件
function wave_finish(){
    for(var i=0;i<wave.length;i++){
        wave[i].on('finish', function () {
            // wave[i].stop()
            // $(".CurrentTime").text("00:00")
            $(".btnPause").empty()
            $(".btnPause").append(play_svg_str)
            $(".btnPause").addClass("btnPlay")
            $(".btnPause").removeClass("btnPause")
        });
    }
}

// 已播放时间
function wave_audioprocess(){
    for(var i=0;i<wave.length;i++){
        wave[i].on("audioprocess",function(){
            for(var i=0;i<wave.length;i++){
                wave[i].getDuration()
                var id = "#audio"+i
                // console.log(id)
                // console.info(secondToDate(wave[i].getCurrentTime()))
                $(id).parent().prev().text(secondToDate(wave[i].getCurrentTime()))
            }
        })
    }
}
// 判断数组是否包含某值
function arrayishave(arr,value){
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == value) {
            return true
        }
    }
}
// 判断数组中正在播放的下标
function arrayisplay(arr,value){
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == value) {
            return i
        }
    }
}
// 以秒为单位返回音频片段的持续时间
function getTime() {
   setTimeout(
    function () {
        for(var i=0;i<wave.length;i++){
            var duration=new Array()
            duration[i] = wave[i].getDuration()
            if(isNaN(duration[i])){
                getTime();
            }else{
                var id = "#audio"+i
                if(secondToDate(wave[i].getDuration())=="00:00"){
   $(id).parent().next().text("00:01")
                }else{
   $(id).parent().next().text(secondToDate(wave[i].getDuration()))
                }
            }
        }
        
    }, 15);
}

