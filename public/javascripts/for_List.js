// 购物车数据
var List = new Vue({
	el: '#List',
	data: {
        List: [],
	},
	created() {
		////////////下面的是前端测试用的数据//////////////
        // var data={
            // name:"仙女棒",
            // price:"21",
            // license:"一次性",
            // id:2453231,
            // one:2132,
            // unlimited:231233,
        // }
    ////////////////////////测试用数据结束//////////////
        var data=getCookie("shoppingcart")
        data=JSON.parse(data)
        var self=this;
        if(data!=""){
            self.List = data 
        }
        
	}
});
