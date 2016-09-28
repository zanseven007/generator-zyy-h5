//通过webpack.config.js里配置alias引用jquery
const $ = require('jquery');
//通过reqiure文件的方式引用fullpage
require('./lib/jquery.fullpage.js');
//判断是否是移动端，然而对于H5并没有什么卵用
const isMobile = /mobile|dxyapp/i.test(window.navigator.userAgent);



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
	    
	    $('#fullpage').fullpage({
		    //Navigation
	        afterLoad: function(anchorLink, index){
	            if(index == 1){
	                /*第一屏*/
	                $('.section1__text').removeClass('o0').animateCss('tada');
	                $('.section1__text').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	                    $('.section1__pic1,.section1__pic2,.section1__pic3,.section1__pic4,.section1__pic5').removeClass('o0').animateCss('fadeInZ');
	                    $('.section1__person').removeClass('o0').animateCss('bounceInLeft');
	                    $('.section1__person').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	                        $('.section1__arrow').removeClass('o0').animateCss('customFade');
	                    });
	                }); 
	            }
	            if(index == 2){
	                /*第一屏*/
	                $('.section2__btn1,.section2__btn2').removeClass('o0').animateCss('fadeInUp');
	            }
	        },
	        onLeave: function(index, nextIndex, direction){
	            if(index == 1){
	                $('.section1__text,.section1__pic1,.section1__pic2,.section1__pic3,.section1__pic4,.section1__pic5,.section1__person,.section1__arrow').removeClass('o1').addClass('o0');
	                $('.section1__arrow').removeClass('customFade');
	            }
	            if(index == 2){
	                $('.section2__btn1,.section2__btn2').removeClass('o1').addClass('o0');
	            }
	        }        
		});
	    $('.section1__arrow').click(function(event) {
	        $.fn.fullpage.moveTo(2);
	    });
})