/*
* @Author: wshudong
* @Date:   2016-06-08 14:56:50
* @Last Modified by:   wshudong
* @Last Modified time: 2016-06-15 22:39:12
*/

'use strict';
$(function() {
    // $("img.lazy").lazyload({
    // 	effect : "fadeIn"
    // });


// $.ajax({
//    'dataType': "jsonp",
//    'type': "GET",
//    'url': "http://backend.someet.cc/activity?isWeek=0&page=1&perPage=20&type=0&jsoncallback=haha",
//    // 'data': "name=John&location=Boston",
//    "jsonpCallback" : "haha",
//    success: function(msg){
//      // alert( "Data Saved: " + msg );
//      // console.log(msg);
//    },
//    error:function(data){
//    	console.log(11111111);
//    }
// });
    var page = 1;
    var perPage = 10;
    var loading = false;
    var zWin = $(window);
    var poster = {
        "with": 800,
        "height": 455,
    }
    var winWidth = zWin.width();
    var winHeight = zWin.height();
    var posterHeight = (winWidth / poster.with) * poster.height + 'px';
    // var posterHeight = '100%';
    var maxItems = 1000;
$.ajax({
	dataType:"json",
	type:'GET',
	url: "./static/json/activity.json",
	success:function(data){
		console.log(data);
		if (data.success == 1) {
			    var pages = data.data.pages;
                // maxItems = Math.ceil(pages.totalCount / perPage);
                if (data.data.activities) {
                    var html = '';
                    var ids = '';
                    for (var i in data.data.activities) {
                        var activity = data.data.activities[i];

                        if (activity == null) {
                            continue;
                        };
                        ids += activity.id + ' ';
                        html += '<div class="activityList" href="/activity/view?id='+activity.id+'" activityId="'+activity.id+'" class="item-link item-content">' +
                            '<div class="activity-block" >' +
                            '<img class="activity-photo" style="height:'+ posterHeight +'" src="' + activity.poster + '" alt="activity photo"/>' +
                            '<div class="activity-describe"><a href="/activity/view?id='+activity.id+' " >' + activity.content + '</a></div></div></div>';

                        // html  = '<img src="'+activity.poster+'"';
                    }
                    console.log(html);
                }

                $('.box').append(html);
                // $('.infinite-scroll-bottom .list-container').append(html);
                // 如果加载数据少于4个则不显示加载框
                // console.log(data.data.activities.length);
                // if (data.data.activities.length < perPage) {
                //     $('.infinite-scroll-preloader').remove();
                // }
                setTimeout(function() {
                    $('.startAnimation').hide();
                    $('#actList').show();
                }, 200);
            }

		
	},
	error:function(){
		console.log(11111111);
	}
})

		// $("input").click(function(){
			// $.ajax({
			// 	"dataType" : "jsonp",
			// 	"url" : "http://yx.xianjian.com/p/api.php?method=wf&api_key=nimakdkeiLdkfen2lidkdlDLLEKd&page=1&per_page=10&tag=&type=5&order=2&_ksTS=1462767366304_78&jsoncallback=haha",
			// 	"jsonpCallback" : "haha",
			// 	"success" : function(data){
			// 		console.log(data);
			// 	}
			// });
		// })
});