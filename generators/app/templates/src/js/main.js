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
	    console.log('欢迎使用赞鱼鱼的H5脚手架');
})