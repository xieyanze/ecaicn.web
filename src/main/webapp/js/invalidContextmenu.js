$(function(page) {
	document.oncontextmenu = function()//屏蔽鼠标右键  
	{  
		window.event.returnValue=false; 
	} 

	
	$("#home_centext").attr("onselectstart", "return false");
	$("#home_centext").attr("onpaste", "return false");
	$("#home_centext").attr("oncopy", "return false");
	$("#home_centext").css({imeMode : "disabled"})
});