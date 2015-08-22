$(function() {
	$("a",$("li",$("#services_ul"))).click(function() {
		if($(this).attr("flowCode")) {
			//dum.forword($(this).attr("flowCode"));
			window.open(dum.appName+$(this).attr("flowCode"),"_blank");
			//dum.forword("/home/server.do?flowCode="+ $(this).attr("flowCode"));
		}
	});
});
$(function(page) {
	var url = window.location.href;
	if(url.indexOf("#") <= 0) {
		return;
	}
	
	var p = url.substring(url.indexOf("#"));
	if(p === "#index") {
		return;
	}
	if($(p) && $(p).attr("id")) {
		
		$("html,body").stop().animate({
			scrollTop : ($(p).offset().top - 80)
		}, 1000, "easeInOutQuint");
	}
});

function navmove(d, a) {
	if (d == "#index") {
		var b = 0
	} else {
		var b = 80
	}
	var c = $(d).offset().top - b;
	$("html,body").stop().animate({
		scrollTop : c
	}, 1500, "easeInOutQuint");
	return false
}
function selfmove() {
	var a = "";
	if (window.location.href.indexOf("#services") > 0) {
		a = "#services"
	}
	if (window.location.href.indexOf("#project") > 0) {
		a = "#project"
	}
	if (window.location.href.indexOf("#Superiority") > 0) {
		a = "#Superiority"
	}
	if (window.location.href.indexOf("#about") > 0) {
		a = "#about"
	}
	if (window.location.href.indexOf("#news") > 0) {
		a = "#news"
	}
	if (window.location.href.indexOf("#recruitment") > 0) {
		a = "#recruitment"
	}
	if (window.location.href.indexOf("#contact") > 0) {
		a = "#contact"
	}
	if (window.location.href.indexOf("sxfwbHome") > 0) {
		a = "sxfwbHome"
	}
	
	
	if (a != "") {
		$(window).scrollTop(0);
		$("html,body").animate({
			scrollTop : $(a).offset().top - 80
		}, 2000, "easeInOutQuint")
	}
}
function LoadingHidden() {
	$("#loading").animate({
		opacity : "0"
	}, 500, function() {
		$("#loading").css({
			left : "100%"
		})
	})
}
$(function() {
	$(".infocus").focus();
	$(".infocus").hover(function() {
		$(".left_btn", this).stop().animate({
			left : "0"
		}, 300);
		$(".right_btn", this).stop().animate({
			right : "0"
		}, 300)
	}, function() {
		$(".left_btn", this).stop().animate({
			left : "-50px"
		}, 300);
		$(".right_btn", this).stop().animate({
			right : "-50px"
		}, 300)
	})
});
$(function() {
	$("#services_ul li").hover(function() {
		$(".services_ico div", this).stop().animate({
			opacity : "1"
		}, 300)
	}, function() {
		$(".services_ico div", this).stop().animate({
			opacity : "0"
		}, 300)
	});
	$("#services_con").mousemove(
			function(c) {
				if ($(window).width() > $(this).width()) {
					var b = ($(window).width() - $(this).width()) / 2
				} else {
					var b = 0
				}
				var d = c.clientX - b;
				var a = 0;
				var f = 0;
				$("#services_ul", this)
						.css(
								{
									"margin-left" : -(($("#services_ul", this)
											.width() - $(this).width()) / $(
											this).width())
											* d + "px"
								})
			});
	$(".services_popclose").click(function() {
		$(this).parents("#services_pop").slideUp(200)
	})
});
function services_tab(b, a) {
	$(".services_poptabcon li").css("zIndex", "1").hide().eq(b).css("zIndex",
			"2").show();
	$(".services_poptabbtn a").removeClass("active").eq(b).addClass("active");
	if (a == "true") {
		$("#services_pop").slideDown(200)
	}
}
$(function() {
	$(".project_pic li a").hover(function() {
		$(".project_pop", this).stop(false, true).slideDown("fast")
	}, function() {
		$(".project_pop", this).stop(false, true).slideUp("fast")
	})
});
function project_tab(a) {
	$(".project_pic li").hide().eq(a).fadeIn(300);
	$(".project_btn a").removeClass("active").eq(a).addClass("active")
}
$(function() {
	$(".about_btn").hover(function() {
		$("span", this).stop().animate({
			opacity : "1"
		}, 300)
	}, function() {
		$("span", this).stop().animate({
			opacity : "0"
		}, 300)
	});
	$(".about_btn").click(function() {
		$(".about_int").addClass("about_intbg");
		$(".about_int").stop().animate({
			height : "245"
		}, 1000, function() {
			$("#about_pop").slideDown(500);
			$(".about_int").stop().animate({
				height : "1"
			}, 500, function() {
				$(".about_int").removeClass("about_intbg");
				var a = $("#about_pop").offset().top - 80;
				$("html,body").stop().animate({
					scrollTop : a
				}, 1000, "easeInQuint")
			})
		})
	});
	$(".about_popclose").click(function() {
		$("#about_pop").slideUp(500);
		abouttop = $("#about").offset().top - 80;
		$("html,body").animate({
			scrollTop : abouttop
		}, 1200, "easeInOutQuint", function() {
			$(".about_int").stop().animate({
				height : "45"
			}, 1000)
		})
	})
});
function aboutpop_tab(a) {
	$(".about_pop_con li").slideUp(300).eq(a).slideDown(300);
	$(".about_pop_tab li").removeClass("active").eq(a).addClass("active")
}
$(function() {
	$(".link_weixin_li").hover(function() {
		$(".link_weixin_ewm", this).stop().animate({
			height : "138px"
		}, 300)
	}, function() {
		$(".link_weixin_ewm", this).stop().animate({
			height : "0"
		}, 300)
	})
});

//我的服务
$(document).ready(function(){
	  $(".mouseslider li").mouseover(function(){
		  $(".services_block", $(this)).show();
	  });
	  $(".mouseslider li").mouseout(function(){
		  $(".services_block", $(this)).hide();
	  });	  
		
	}); 

//新闻跳转
$(function(page) {
	/*var list = $("div.hot_new_left_d").find("div.hot_new_left_d ul").find("li").find("a");*/
	var list = $("div.hot_new_left_d").find("div.hot_new_dl_list dl").find("dd").find("a");
	$.each(list, function() {
		$(this).click(function() {
			if($(this).parent().attr("url")) {
				dum.forword($(this).parent().attr("url"));	
			}
		});
	});
});
//热点新闻
$(function(page) {
	var list = $("div.scrolltext").find("div.breakNews ol").find("li").find("a");
	$.each(list, function() {
		$(this).click(function() {
			if($(this).parent().attr("url")) {
				dum.forword($(this).parent().attr("url"));	
			}
		});
	});
});

//$(function() {
//	$(".workpopl").click(function() {
//		$(document).attr("title", $(this).attr("title"));
//		$("#workpop").show();
//		url = $(this).attr("href");
//		LoadingLeftShow(url);
//		return false
//	});
//	$(".workpopr").click(function() {
//		$(document).attr("title", $(this).attr("title"));
//		$("#workpop").show();
//		url = $(this).attr("href");
//		LoadingRightShow(url);
//		return false
//	});
//	$("#news li a").click(function() {
//		$(document).attr("title", $(this).attr("title"));
//		$("#workpop").show();
//		url = $(this).attr("href");
//		LoadingLeftShow(url);
//		return false
//	})
//});