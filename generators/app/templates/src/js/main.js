const $ = require('jquery');
const isMobile = /mobile|dxyapp/i.test(window.navigator.userAgent);

//引用mix文件夹下JS
require('./mix/alert.js');

$(function($){
	console.log(isMobile);
})