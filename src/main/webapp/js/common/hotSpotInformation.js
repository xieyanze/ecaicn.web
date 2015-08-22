var page = page ? page : new Object();
$(document).ready(function (){
	var ol = $("#breakNewsList", "div.hot_new_right");
	
	var lineHeigth = ol.find("li").height();
	if(ol.height() <  (lineHeigth * ol.find("li").length + 1)) {
		var scroll2 = new ScrollText("breakNewsList","pre2","next2",true,50,true);
		scroll2.LineHeight = 63;
	}
});