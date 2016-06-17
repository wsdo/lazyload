// Zepto(function($) {

//     // 处理详情内容内容文字 判断p标签下面是否有img 如果没有则添加一个类来控制样式
//     var detailContentChildNodes = document.getElementsByClassName("detail-activity")[0].childNodes;
//     for (var i = 0; i < detailContentChildNodes.length; i++) {
//         if (detailContentChildNodes[i].tagName == 'DIV') {
//             continue;
//         }
//         var detailP = detailContentChildNodes[i].firstChild;
//         if (detailP) {
//             if (detailP.nodeName == 'IMG' || detailP.nodeName == 'DIV') {} else {
//                 $(detailContentChildNodes[i]).attr("class", "detail-activity-content")
//             }

//         }
//     }

//     var viewId = <?= $model -> id ?>;
//     var nowtime = new Date().getTime() / 1000 < <?= $model->start_time ?>;
//     // console.log(nowtime);
//     var promptInfo = document.getElementById('promptInfo');
//     var btnRegistration = document.getElementById('registration');
//     var viewDetail = document.getElementById('viewDetail');
//     // 关闭按钮
//     var promptClose = document.getElementById('promptClose');

//     // 提示标题
//     var promptText = document.getElementById('promptText');

//     // 用户筛选状态
//     var userStatus = <?php echo isset($answer->status) ? $answer->status : 0; ?>;

//     // 报名的总人数
//     var countAnswerList = <?= count($model->answerList);?>;
//     // 规定报名的人数
//     var provisionsAnswerList = <?= count($model->peoples);?>;

//     var status = new Array(4);
//     status[0] = '活动报名';
//     status[10] = '查看报名情况';
//     status[20] = '查看报名情况';
//     status[30] = '查看报名情况';

//     var BtnIcon = new Array(4);
//     BtnIcon[0] = 'fa fa-plus fa-lg';
//     BtnIcon[10] = 'fa fa-hourglass-start fa-lg';
//     BtnIcon[20] = 'fa fa-hand-peace-o fa-lg';
//     BtnIcon[30] = 'fa fa-info-sign fa-lg';

//     var viewBtnStatus = "活动报名";
//     var viewBtnIcon = 'fa fa-plus fa-lg';

//     if (countAnswerList >= provisionsAnswerList && userStatus < 10) { //此活动 已报满 并且 当前用户没有报名
//         viewBtnStatus = "已报满";
//         viewBtnIcon = 'fa fa-user-times fa-lg';
//     } else if (userStatus == 10) { //用户 没有发送通知 或者 等待筛选
//         viewBtnStatus = "待筛选";
//         viewBtnIcon = 'fa fa-hourglass-start fa-lg';
//     } else {
//         viewBtnStatus = status[userStatus];
//         viewBtnIcon = BtnIcon[userStatus];
//     }

//     $("#viewBtnStatus").text(viewBtnStatus);

//     // 报名活动冲突
//     var timeTonflict = "";
//     // 如果不存在冲突
//     var hasConflict = 0;

//     var re = "<?= $_SERVER['HTTP_REFERER'] ?>";
//     var re_url = re.split('/')[3];
//     // var document_url = document.referrer.split('/')[3] + '/' + document.referrer.split('/')[4];
//     // 判断url来源 如果不是本地来源
//     if (re_url == "activities" || re_url == "activity") {
//         $("#weekActivity").click(function() {
//                 goBack();
//             })
//         // $.toast("来源相同");
//     } else {
//         // $.toast("来源不同");
//         // 重新请求
//         document.getElementById("weekActivity").href = "/activity/index";
//         $("#weekActivity").addClass("external");
//     }
//     // 缓存返回
//     function goBack() {
//         window.history.back();
//     }

//     var activityFlict = function() {
//         $.ajax({
//             type: "GET",
//             url: '/activity/fetch-time-conflict-activity',
//             data: {
//                 id: viewId
//             },
//             dataType: 'json',
//             success: function(data) {
//                 if (data.success == 1) {
//                     var DateTimeTonflict = data.data.activities;
//                     var DateTimeTonflictActivity = data.data.activity;
//                     hasConflict = data.data.has_conflict;
//                     var d = new Date()
//                     var weekday = new Array(7)
//                     weekday[0] = "周日";
//                     weekday[1] = "周一";
//                     weekday[2] = "周二";
//                     weekday[3] = "周三";
//                     weekday[4] = "周四";
//                     weekday[5] = "周五";
//                     weekday[6] = "周六";

//                     if (hasConflict == 2) {
//                         var time_start = new Date(parseInt(DateTimeTonflictActivity.start_time) * 1000);
//                         var time_end = new Date(parseInt(DateTimeTonflictActivity.end_time) * 1000);
//                         var str = '';
//                         var startDate = (time_start.getMonth() + 1 + '月&nbsp;' + time_start.getDate() + '日&nbsp;');
//                         var startWeek = time_start.getDay();

//                         // 提示周几
//                         var weekDetail = weekday[startWeek] + '&nbsp;';
//                         // 提示开始时间和结束详细时间
//                         var startHM = time_start.getHours() + ":" + time_start.getMinutes() + "-" +
//                             time_end.getHours() + ":" + time_end.getMinutes();
//                         // 提示开始时间周和结束时间
//                         var timeText = startDate + weekDetail + startHM;
//                         // 添加时间和标题
//                         timeTonflict += '<div class="timeConflict">' +
//                             '<div class="timeConflictDetail"><div class="timeConflictTitle">' + DateTimeTonflictActivity.title + '</div>' +
//                             '<div class="timeConflictTime">' + timeText + '</div></div></div>';
//                     } else if (hasConflict == 1) {
//                         $.each(DateTimeTonflict, function(i, item) {
//                             if (i > 1) {
//                                 timeTonflict += '<div class="timeConflict">...</div>'
//                                 return false;
//                             }
//                             var time_start = new Date(parseInt(item.start_time) * 1000);
//                             var time_end = new Date(parseInt(item.end_time) * 1000);
//                             var str = '';
//                             var startDate = (time_start.getMonth() + 1 + '月&nbsp;' + time_start.getDate() + '日&nbsp;');
//                             var startWeek = time_start.getDay();

//                             // 提示周几
//                             var weekDetail = weekday[startWeek] + '&nbsp;';
//                             // 提示开始时间和结束详细时间
//                             var startHM = time_start.getHours() + ":" + time_start.getMinutes() + "-" +
//                                 time_end.getHours() + ":" + time_end.getMinutes();
//                             // 提示开始时间周和结束时间
//                             var timeText = startDate + weekDetail + startHM;
//                             // 添加时间和标题
//                             timeTonflict += '<div class="timeConflict">' +
//                                 '<div class="timeConflictDetail"><div class="timeConflictTitle">' + item.title + '</div>' +
//                                 '<div class="timeConflictTime">' + timeText + '</div></div></div>';
//                         }); // end each
//                     } // end if
//                 }; //end data.success
//             }
//         });
//     }

//     // 是否反馈
//     var is_feedback = 0;
//     var user_feedback = function() {
//         $.get('/member/is-feedback', function(data) {
//             if (data.success == 1) {
//                 // console.log(data.data);
//                 if (data.data == 1) {
//                     is_feedback = 1;
//                 }
//             }
//         })
//     };
//     user_feedback();

//     /* 弹出提示函数
//      * title  提示标题
//      * content 用作提示内容
//      */
//     function prompt(title, content) {

//         $("#promptText").html(title);
//         // 禁止滑动交互
//         $("body").bind("touchmove", function(event) {
//             event.preventDefault();
//         });
//         $(".prompt-content").html(content);
//         $("#promptInfo").show();
//     }


//     $("#btnPhone").click(function() {
//         var title = "提示";
//         var content = '<div class="UserPromptText">亲爱用户你好，首次报名参加活动之前需要完善资料</div> <a class="UserPromptBtn" href="/member/finish-page?activity_id=<?= $model->id; ?>"><span>去完善报名信息</span></a>';

//         // 弹出函数
//         prompt(title, content);
//         // 解除禁止滑动交互
//         $("body").unbind("touchmove");

//     })


//     $("#btnUserInfo").click(function() {
//         var title = "提示";
//         var content = '<div class="UserPromptText">亲爱用户你好，还有一些信息要完善哦</div> <a class="UserPromptBtn"  href="/member/complete-user?activity_id=<?= $model->id; ?>"><span>继续</span></a>';
//         // 弹出函数
//         prompt(title, content);
//     })
//     activityFlict();
//     // 当报名的时候执行的事件 检测是否关闭活动 检测冲突 检测是否处于黑牌 检测是否反馈 
//     $("#userInfoComplete").click(function() {
//             if (30 == <?= $model->status ?>) {
//                 var title = "活动报满";
//                 var content = '<div class="UserPromptText">当前活动报名已满，下次请早一点</div>';
//                 // 弹出函数
//                 prompt(title, content);
//             } else if (<?= $userBlack?> == 1) {
//                 var title = "黑牌状态";
//                 var content = '<div class="UserPromptText">你当前处于黑牌状态无法报名，如有异议，请到我的页面信用记录里面申诉</div>';
//                 // 弹出函数
//                 prompt(title, content);
//             } else if (hasConflict == 2) {
//                 var title = '<div class="promptConflictTitle">亲爱的用户，当前活动与你已报名的下列活动时间冲突，不能再报名</div>';
//                 var content = timeTonflict + '<div id="promptKnow" class="UserPromptBtn">我知道了</div>';
//                 //弹出函数
//                 prompt(title, content);
//                 // 解除禁止滑动交互
//                 $("body").unbind("touchmove");
//                 var promptKnow = document.getElementById('promptKnow');
//                 //我知道了按钮
//                 promptKnow.onclick = function() {
//                     // 解除禁止滑动交互
//                     $("body").unbind("touchmove");
//                     // 弹出框隐藏
//                     $("#promptInfo").hide();
//                 }
//             } else if (is_feedback == 1) {
//                 console.log(is_feedback);
//                 var title = "填写反馈信息";
//                 var content = '<div class="UserPromptText">之前还有活动没有填写反馈信息，请到服务号个人页面完成对之前活动的反馈，然后才能报名本周的活动哦。</div><a class="UserPromptBtn" href="/member/index" ><span>现在去反馈</span></a>';
//                 // 弹出函数
//                 prompt(title, content);
//                 // 解除禁止滑动交互
//                 $("body").unbind("touchmove");
//             } else if (hasConflict == 1) {
//                 var title = '<div class="promptConflictTitle">以下活动时间上与当前活动冲突，报名后只能通过一个，其它将自动不通过！</div>';
//                 var content = timeTonflict + '<a class="UserPromptBtn" href="/question/view-by-activity-id?activity_id=<?= $model->id; ?>"><span>继续报名</span></a>';
//                 // 弹出函数
//                 prompt(title, content);
//                 // 解除禁止滑动交互
//                 $("body").unbind("touchmove");
//             } else {
//                 window.location.href = '/question/view-by-activity-id?activity_id=<?= $model->id; ?>';
//                 // $("#userInfoComplete").attr('href','/question/view-by-activity-id?activity_id=<?= $model->id; ?>');
//             }
//         })
//         // 用户报名后弹出的信息按钮
//     $("#afterFegistration").click(function() {
//         // var userStatus = $("#userStatus").value();
//         if (userStatus == 10) {
//             // var title = "等待筛选";
//             // var content = "活动发起人正在筛选中，我们将会在每晚8点短信和微信服务号通知你筛选结果，请耐心等待，谢谢你的支持。";
//         } else if (userStatus == 20) {

//             // if (wechat_template_is_send == 0) {

//             //   var title = "等待筛选";
//             //   var content = "活动发起人正在筛选中，我们将会在每天晚上8点短信和微信服务号通知你筛选结果，请耐心等待，谢谢你的支持。";


//             // } else {

//             //   var title = "已通过";
//             //   var content = "恭喜你报名的活动已通过筛选。请你扫码进入活动微信群，具体事宜将在活动开始前在群中发布，期待与你共同玩耍。";

//             // };

//         } else if (userStatus == 30) {

//             //  if (wechat_template_is_send == 0) {

//             //    var title = "等待筛选";
//             //    var content = "活动发起人正在筛选中，我们将会在每天晚上8点短信和微信服务号通知你筛选结果，请耐心等待，谢谢你的支持。";

//             //  } else {

//             //    var title = "未通过";
//             //    var content = "很抱歉你报名的活动未通过筛选。关于如何提高报名的成功率，这里有几个小tips：" +
//             //      "1.认真回答筛选问题； 2.尽早报名，每周二周三是活动推送时间，周四周五报名的成功概率会相对降低很多 3.自己发起活动，优质的发起人是有参与活动特权的哦~当然，你还可以添加我们的官方客服Someet小海豹（微信号：someetxhb）随时与我们联系。期待下次活动和你相遇。";

//             // };

//         } else {
//             if (nowtime) {
//                 if (countAnswerList >= provisionsAnswerList && userStatus < 10) {
//                     var title = "报名已满";
//                     var content = '<div class="UserPromptText">当前活动报名已满，下次请早一点</div>';
//                 }
//             } else {
//                 var title = "活动报名已经结束";
//                 var content = "oh！no！活动名额被抢光了，下次记得早点来报名哟。";
//             }
//         };
//         // 弹出函数
//         prompt(title, content);

//     });


//     // 关闭弹出按钮
//     promptClose.onclick = function() {
//         // 解除禁止滑动交互
//         $("body").unbind("touchmove");
//         // 弹出框隐藏
//         $("#promptInfo").hide();
//     }

// });