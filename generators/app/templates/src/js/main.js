//通过webpack.config.js里配置alias引用jquery
const $ = require('jquery');
let dxy_wechat_share = require('dxy-wechat-share');

$(function($){
	    //增加全局方法
	    //animateCss，配合animate.css，使动画结束后移除动画class
	    $.fn.extend({
	    	animateCss: function (animationName) {
	    		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	    		$(this).addClass('animated ' + animationName).one(animationEnd, function() {
	    			$(this).removeClass('animated ' + animationName);
	    		});
	    	}
	    });
	    window.wx_share = 'https://sim.dxy.cn/japi/js/sign/77?callback=?';
	    dxy_wechat_share({
	      title:'这是一个分享标题',
	      desc:'这是一个分享摘要',
	      imgUrl:'这儿是一个分享图片地址',
	      success:function(){
	        console.log('这是一个分享成功回调函数');
	      }
	    });
	    console.log('欢迎使用赞鱼鱼的H5脚手架');
})