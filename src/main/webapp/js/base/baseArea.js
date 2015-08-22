
var base = new Object();

$.validator.addMethod("selectArea", function(value, element) {
	var areaId = $("input[name='companyAreaCode']").val();
    return  "请选择区域" != value 
    	&& null != areaId
    	&& undefined != areaId
    	&& "" != areaId;
}, "请选择区域!");


$(function(page) {
	/**
	 * div 位置
	 * areaFullcode 当前区域areaFullcode  为空时传Null
	 * editable 是否可编辑
	 * callback 选择回调
	 */
	base.addArea = function(div, areaFullcode, editable, callback, validClass) {
		var input = $(div).addInput({disabled:"disabled", name:"areaText"});
		if(validClass) {
			if(validClass != "null") {
				input.addClass(validClass);
			}
		} else {
			input.addClass("selectArea");
		}
		input.after($("<b>"));
		var areaFullname = "请选择区域";
		if(areaFullcode) {
			var data = page.findById(areaFullcode);
			if(data && data.id) {
				areaFullname = data.areaFullname;
			}
		}
		input.val(areaFullname);
		if(editable) {
			$(div).hover(function() {
				page.showArea($(div), callback);
				$(".content", div).show();
				$("input",div).css({borderBottom:"0px"});
				$("b", div).css({borderBottom:"0px"});
			}, function() {
				$(".content", div).hide();
				$("input",div).css({borderBottom:"2px solid #3abeee"});
				$("b",div).css({borderBottom:"2px solid #3abeee"});
			});
		}
	}
	
	page.showArea = function(div, callback) {
		if($("#div_area", div).length > 0) {
			return;
		}
		var div = div.addDiv({id:"div_area"});
		var content = div.addDiv({"class": "content"});
		var title = content.addUl({"class": "Area"});
		var address = content.addUl({"class": "Address"});
		var close = content.addP({"class":"tc_close"}).css({marginTop : "0px"});
		close.addImg({src:dum.appName+"/image/c_03.png"});
		close.click(function() {
			$("input",div.parent()).css({borderBottom:"2px solid #3abeee"});
			$("b",div.parent()).css({borderBottom:"2px solid #3abeee"});
			$(div).remove();
		});
		
		page.nextArea(title, address, page.listArea(), callback);
	}
	
	page.nextArea = function(title,address, list, callback) {
		address.html("");
		var isLast = true;
		$(title).find("li").css({background: "none"});
		var titleLi = title.addLi().text("请选择").css({background: "#fff"});
		
		$.each(list, function(i) {
			var item = this;
			address.addLi().addA({id: this.id}).text(this.areaName).click(function() {
				titleLi.text(item.areaName);
				$("input[name='areaText']", title.parent().parent().parent()).val(item.areaFullname);
				titleLi.click(function() {
					$(this).nextAll().remove();
					$(this).remove();
					page.nextArea(title, address, page.listArea(item.parentId), callback);
				});
				if(callback) callback({});
				// 添加下级
				var data =  page.listArea(item.id);
				if(data && data.length > 0 && item.areaLevel < 3) {
					page.nextArea(title, address, data, callback);
				} else {
					$("input[name='areaText']",title.parent().parent().parent()).css({borderBottom:"2px solid #3abeee"});
					$("input[name='areaText']",title.parent().parent().parent()).parent().find("b").css({borderBottom:"2px solid #3abeee"});
					title.parent().parent().remove();
					if(callback) callback(item);
				}
			});
		});
	}
	
	page.listArea = function(parentId) {
		var list = new Array();
		var url = "/area/listByLevel.do?level=2";
		if(parentId) {
			url = "/area/listByParentId.do?parentId="+parentId;
		} 
		dum.common.ajax({
			type : "post",
			url : url,
			data:{},
			async:false,
			dataType: "json",
			success : function(data) {
				list = data;
			}
		});
		return list;
	}
	
	page.findById = function(id) {
		var result = new Object();
		var url = "/area/findByCode.do?code="+id;
		dum.common.ajax({
			type : "post",
			url : url,
			data:{},
			async:false,
			dataType: "json",
			success : function(data) {
				result = data;
			}
		});
		return result;
	}
	
	
	$.each($("div.areaSelectText[autoInit]"), function(i, obj) {
		var isEdit = (obj.isEdit == false || obj.isEdit == "false") ? false : true;
		base.addArea($(obj),this.areaCode, isEdit, function(area) {
			$(obj).find("input[name='"+obj.areaName+"']").remove();
			$(obj).addInput({type:"hidden", name:obj.areaName}).val(area.areaFullcode);
		});
	})
});