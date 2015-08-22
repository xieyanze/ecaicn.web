
$(function() {
	var appName = $("#home_app_Name").val();
	dum.appName = (null == appName || undefined == appName) ? "" : "/" == appName ? "" : appName;
});

var dum = {
	common : {
		ajax : function(param) {
			// 弹出锁屏层
//			var div = dum.showLoading();
			var complete;
			var success;
			if(param.complete) {
				complete = param.complete;
			}
			
			if(param.success) {
				success = param.success;
			}
			
			param.complete = function(data) {
				// 关闭层
//				div.remove();
				dum.isLoad(data);
				if(complete) {
					complete(data);
				}
			};
			
			param.success = function(data) {
				if(data && typeof data == "string") {
					if(/^{(.+:.+)+}*$/g.test(data)) {
						var result =  eval('(' + data + ')');
						if(result.sessionDestroyed == "true") {
							return true;
						}
						if(result.isLogin == true) {
							return true;
						}
					}
				}
				success(data);
			}
			param.url = dum.appName + param.url;
			$.ajax(param);
		},
		get : function(url, param, callback) {
			// 弹出锁屏层
//			var div = dum.showLoading();
			url += (url.indexOf(".do?") > 0) ? "&" : "?";
			url += "1=" + new Date();
			url = dum.appName + url;
			$.get(url,param,function(data) {
				// 关闭层
//				div.remove();
				dum.isLoad(data);
				callback(data);
			});
		},
		post : function(url, param, callback) {
			// 弹出锁屏层
//			var div = dum.showLoading();
			url = dum.appName + url;
			url += (url.indexOf(".do?") > 0) ? "&" : "?";
			url += "1=" + new Date();
			$.post(url,param,function(data) {
				// 关闭层
//				div.remove();
				dum.isLoad(data);
				callback(data);
			});
		},
		isNull : function(obj) {
			if(obj == undefined || obj == null || obj == "") {
				return true
			}
			return false;
		},
		getWebRootPath : function() {
		    var webroot=document.location.href;
		    webroot=webroot.substring(webroot.indexOf('//')+2,webroot.length);
		    webroot=webroot.substring(webroot.indexOf('/')+1,webroot.length);
		    webroot=webroot.substring(0,webroot.indexOf('/'));
		    var rootpath="/"+webroot;
		    return rootpath;
		},
		showDialog:function(width, height) {
			$("div[id='_showDialog']").remove();
			var div = $("body").eq(0).addDiv({id:"_showDialog"});
			div.addDiv({"class" : "theme-popover-mask"});
			var cen = div.addDiv({"class" : "theme-popover"});
			if(width) {
				cen.css({width:width});
			}
			if(height) {
				cen.css({height:height});
			}
			var title = $(cen).addDiv({"class":"theme-poptit"});
			var body = cen.addDiv({"class":"theme-popbod dform"});
			$(title).addA({"title":"关闭", "class":"close","href":"javascript:;"}).text("×").click(function() {
				if(body.beforeClose) {
					body.beforeClose();
				}
				dum.cache = {};
				div.remove();
			});
			body.closeCentext = function() {
				$("div.theme-popover", $(this).parent().parent()).remove();
			};
			body.setTitle = function(title) {
				var _title = $("<h3>");
				_title.text(title);
				$("div.theme-poptit", $(this).parent()).append(_title);
			};
			body.close = function() {
				// 非主动点击X关闭。不需要跳转首页
//				if(body.beforeClose) {
//					body.beforeClose();
//				}
				$(this).parent().parent().remove();
			};
			body.closeTitle = function() {
				$("div.theme-poptit", $(this).parent()).remove();
			};
			body.resize = function() {
				var screenWidth = $(window).width();
				var screenHeight = $(window).height();
				var left = (screenWidth - $(cen).width())/2 ;         
				var top = (screenHeight - $(cen).height())/2;
				
				$(this).parent().css({left: left + 'px', top : ($(document).scrollTop() + top)+"px"});
				
			};
			
			body.onClose = function(close) {
				if(close) {
					body.beforeClose = close;
				}
			};
			body.setSize = function(width, height) {
				if(width) {
					cen.parent().css({width:width});
				}
				if(height) {
					cen.parent().css({height:height});
				}
				$(this).resize();
			};
			body.resize();
			return body;
		},
		islogin: function(callback, param) {
			// 判断是否登录
			dum.common.ajax({
				type : "post",
				url : "/cus/islogin.do",
				data:{},
				dataType: "json",
				success : function(data) {
					if(data == 0) {
						if(callback) callback(data);
					} else {
						var form = $("body").addForm({action : dum.appName + "/cus/loginjump.html", method: "post"});
						var names = param.split("&");
						$.each(names, function() {
							var _this = this.split("=");
							form.addInput({name:_this[0]}).val(_this[1]);
						});
						form.submit();
					}
				}
			});
		}
	},
	currentUser : function() {
		
	},
	flowType : {
		GSZC:"ABCD01",
		ZCBS:"ABCD02",
		BGFW:"ABCD03",
		LPRZ:"ABCD04"
	},
	/** 深圳市地址编码 */
	AREA_SZ_CODE: "AAA",
	getClientFlowPic: function(flowCode) {
		var src;
		switch (flowCode) {
			case "ZCGS" :
				src = "/image/clientUI/zcgsIocn.png";
				break;
			case "DLJZ" :
				src = "/image/clientUI/dljzIocn.png";
				break;
			case "GSBG" :
				src = "/image/clientUI/gsbgIocn.png";
				break;
			case "DPGS" :
				src = "/image/clientUI/dpgsIocn.png";
				break;
			case "SBKH" :
				src = "/image/clientUI/sbkhIocn.png";
				break;
			case "GJJKH" :
				src = "/image/clientUI/gjjkhIocn.png";
				break;
			case "NS" :
				src = "/image/clientUI/nsIocn.png";
				break;
			case "DX" :
				src = "/image/clientUI/dxIocn.png";
				break;
			case "BC" :
				src = "/image/clientUI/bcIcon.png";
				break;
		}
		return dum.appName + src;
	},
	getClientFlowHoverPic: function(flowCode) {
		var src;
		switch (flowCode) {
			case "ZCGS" :
				src = "/image/clientUI/zcgsiconHover.png";
				break;
			case "DLJZ" :
				src = "/image/clientUI/dljzIconHover.png";
				break;
			case "GSBG" :
				src = "/image/clientUI/gsbgIconHover.png";
				break;
			case "DPGS" :
				src = "/image/clientUI/dpgsIconHover.png";
				break;
			case "SBKH" :
				src = "/image/clientUI/sbkhIconHover.png";
				break;
			case "GJJKH" :
				src = "/image/clientUI/gjjkhIconHover.png";
				break;
			case "NS" :
				src = "/image/clientUI/nsIconHover.png";
				break;
			case "DX" :
				src = "/image/clientUI/dxIconHover.png";
				break;
			case "BC" :
				src = "/image/clientUI/bchover.png";
				break;
		}
		return dum.appName + src;
	},
	getFlowPic: function(flowCode) {
		var src;
		switch (flowCode) {
			case "ZCGS" :
				src = "/image/services/cart_01.png";
				break;
			case "DLJZ" :
				src = "/image/services/cart_02.png";
				break;
			case "GSBG" :
				src = "/image/services/cart_03.png";
				break;
			case "DPGS" :
				src = "/image/services/cart_04.png";
				break;
			case "SBKH" :
				src = "/image/services/cart_09.png";
				break;
			case "GJJKH" :
				src = "/image/services/cart_10.png";
				break;
			case "ABCD14" :
				src = "/image/services/bc_ico.png";
				break;
			case "NS" :
				src = "/image/services/rs_ico.png";
				break;
			case "DX" :
				src = "/image/services/dx_ico.png";
				break;
				break;
			case "BC" :
				src = "/image/services/bc_ico.png";
				break;
		}
		return dum.appName + src;
	},
	getFlowHoverPic: function(flowCode) {
		var src;
		switch (flowCode) {
			case "ZCGS" :
				src = "/image/services/cart_hover01.png";
				break;
			case "DLJZ" :
				src = "/image/services/cart_hover02.png";
				break;
			case "GSBG" :
				src = "/image/services/cart_hover03.png";
				break;
			case "DPGS" :
				src = "/image/services/cart_hover04.png";
				break;
			case "SBKH" :
				src = "/image/services/cart_hover09.png";
				break;
			case "GJJKH" :
				src = "/image/services/cart_hover10.png";
				break;
			case "ABCD14" :
				src = "/image/services/bc_icohover.png";
				break;
			case "NS" :
				src = "/image/services/rs_icohover.png";
				break;
			case "DX" :
				src = "/image/services/dx_icohover.png";
				break;
			case "BC" :
				src = "/image/services/bc_icohover.png";
				break;
		}
		return dum.appName + src;
	},
	forword : function(url, callback) {
		window.location.href = dum.appName + url;
    },
  /*  showLoading : function() {
    	var div = $("<div>").attr({"class":"loadingDiv"});
    	div.addDiv().text("Loading...");
    	$("body").eq(0).append(div);
    	return div;
    },*/
    isLoad : function(data) {
    	
    	if(data.responseText) {
    		data = data.responseText;
    	}
    	
    	if(data && typeof data == "string") {
			if(/^{(.+:.+)+}*$/g.test(data)) {
				var result =  eval('(' + data + ')');
				if(result.isLogin == true) {
					dum.login.showlogin();
					return true;
				}
			}
		}
    },
    // 缓存数据
    cache : {},
    formatDate: function(dd) {
    	if(!dd||dd=='undefined'){
    		return '';
    	}
    	var d=new Date(dd);
    	return d.getFullYear()
    		+"-"+dum.getTwoTime(d.getMonth()+1)
    		+"-"+dum.getTwoTime(d.getDate());
    },
    formatDateTime: function(dd) {
    	if(!dd||dd=='undefined'){
    		return '';
    	}
    	var d=new Date(dd);
    	return d.getFullYear()
    		+"-"+dum.getTwoTime(d.getMonth()+1)
    		+"-"+dum.getTwoTime(d.getDate())
    		+" "+dum.getTwoTime(d.getHours())
    		+":"+dum.getTwoTime(d.getMinutes())
    		+":"+dum.getTwoTime(d.getSeconds());
    },
  //获取两位数的时间
    getTwoTime : function(t){
    	if(t<10){
    		return "0"+t;
    	}
    	return t;
    },
    pagingPage : function(table, data, pageNo, callback) {
    	pageNo = parseInt(pageNo);
    	$("ul.recommenPaging", $(table).parent()).remove();
    	$("p.recommenBord", $(table).parent()).remove();
    	var ul = $("<ul class=\"recommenPaging\">");
    	$(table).after(ul);
    	$(table).after("<p class='recommenBord'>");
    	var pageCount = parseInt(data.totalCount/10) + (data.totalCount % 10 != 0 ? 1 : 0);
    	pageCount = pageCount == 0 ? 1 : pageCount;
    	ul.addLi().addA().text("首页").click(function() {
    		if(pageNo > 1) {
    			callback(1);
    		}
    	});
    	ul.addLi().addA().text("上一页").click(function() {
    		if(pageNo > 1) {
    			callback(--pageNo);
    		}
    	});
    	var start = (pageNo - 2) >= 1 ? (pageNo - 2) : (pageNo - 1) >= 1 ? (pageNo - 1) : pageNo;
    	var end = ((pageNo + 2) <= pageCount) ? (pageNo + 2) : ((pageNo + 1) <= pageCount) ? (pageNo + 1) : pageNo;
    	end = pageNo - 2 <= 0 ? (pageCount > 5 ? 5 : pageCount) : end;
    	start = pageNo + 2 >= pageCount ? (pageCount - 4) > 1 ? (pageCount - 4) : 1 : start;
    	for(var i = start; i <= end; i++) {
    		ul.addLi().addA().text(i).click(function() {
    			callback($(this).text());
    		});
    	}
    	ul.addLi().addA().text("下一页").click(function() {
    		if(pageNo < pageCount) {
    			callback(++pageNo);
    		}
    	});
    	ul.addLi().addA().text("末页").click(function(){
    		if(pageNo < pageCount) {
    			callback(pageCount);
    		}
    	});
    	ul.addLi().addA().text("共"+pageNo+"/"+pageCount+"页");
    }
}
// 设置Web应用名

// 扩展方法
$.fn.extend({
	addTable : function(attr) {
		var table = $("<table>");
		if(attr) {
			table.attr(attr);
		}
		$(this).append(table);
		return table;
	},
	addTr : function(attr) {
		var tr = $("<tr>");
		if(attr) {
			tr.attr(attr);
		}
		$(this).append(tr);
		return tr;
	},
	addTd : function(attr) {
		var td = $("<td>");
		if(attr) {
			td.attr(attr);
		}
		$(this).append(td);
		return td;
	},
	addDiv : function(attr) {
		var div = $("<div>");
		if(attr) {
			div.attr(attr);
		}
		$(this).append(div);
		return div;
	},
	addUl : function(attr) {
		var ul = $("<ul>");
		if(attr) {
			ul.attr(attr);
		}
		$(this).append(ul);
		return ul;
	},
	addLi : function(attr) {
		var li = $("<li>");
		if(attr) {
			li.attr(attr);
		}
		$(this).append(li);
		return li;
	},
	addInput : function(attr) {
		var input = $("<input>");
		if(attr) {
			input.attr(attr);
		}
		$(this).append(input);
		return input;
	},
	addP : function(attr) {
		var p = $("<p>");
		if(attr) {
			p.attr(attr);
		}
		$(this).append(p);
		return p;
	},
	addSpan : function(attr) {
		var span = $("<span>");
		if(attr) {
			span.attr(attr);
		}
		$(this).append(span);
		return span;
	},
	addSelect : function(attr) {
		var select = $("<select>");
		if(attr) {
			select.attr(attr);
		}
		$(this).append(select);
		return select;
	},
	addForm : function(attr) {
		var form = $("<form>");
		if(attr) {
			form.attr(attr);
		}
		$(this).append(form);
		return form;
	},
	addOption : function(attr) {
		var option = $("<option>");
		if(attr) {
			option.attr(attr);
		}
		$(this).append(option);
		return option;
	},
	addLabel : function(attr) {
		var label = $("<label>");
		if(attr) {
			label.attr(attr);
		}
		$(this).append(label);
		return label;
	},
	addImg : function(attr) {
		var img = $("<img>");
		if(attr) {
			img.attr(attr);
		}
		$(this).append(img);
		return img;
	},
	addA : function(attr) {
		var a = $("<a>");
		if(attr) {
			a.attr(attr);
		}
		$(this).append(a);
		return a;
	},
	addTbody : function(attr) {
		var tbody = $("<tbody>");
		if(attr) {
			tbody.attr(attr);
		}
		$(this).append(tbody);
		return tbody;
	},
	addOther: function(title, attr) {
		var other = $("<"+title+">");
		if(attr) {
			other.attr(attr);
		}
		$(this).append(other);
		return other;
	} ,
	dumLoad : function(url, callback) {
		var _this = $(this);
		$.ajax({
	        type: "post",
	        url: dum.appName + "/home/onLoad.do",
	        data:{url:url},
	        dataType: "text",
	        success: function(data){
	        	if(dum.isLoad(data)) return;
	        	$(_this).html(data);
	        	if(callback) {
	        		callback($(_this));
	        	}
	        }
	    });
	}
});