$(function(page) {
	base.addArea("#areaId",null, true, function(area) {
		
		$("input[name='companyAreaCode']").val(area.areaFullcode);
		page.getPrice();
	});
	
	// 加入购物车
	page.addOrdCart = function(callback) {
		
		dum.common.ajax({
			type : "post",
			url : "/ordCart/addOrdCart.do",
			data:page.jsonForm(),
			dataType: "json",
			success : function(data) {
				if(callback) callback(data);
			}
		});
	}
	
	
	
	// 加入购物车
	$("#addOrdCart").click(function() {
		if(!$("#frmService").valid()) {
			return;
		}
		page.addOrdCart(function(data) {
			window.location.href= dum.appName + "/service/shoppingCart.html";
		});
	});
	
	
	// 立即付款
	$("#nowPayment").click(function() {
		if(!$("#frmService").valid()) {
			return;
		}
		page.addOrdCart(function(data) {
			var from = $("#frmService");
			from.attr("action", dum.appName + "/payment/paymentConfirm.html");
			from.attr("method", "post");
			var input = from.addInput({type: "hidden", name: "orderCode"}).val(data.orderCode);
			dum.common.islogin(function() {
				from.submit();
				input.remove();
			}, $("#frmService").serialize());
		});
	});
	
	$("input[name='businessType']").click(function() {
		page.getPrice();
	});
	$("input[name='businessType1']").click(function() {
		page.getPrice();
	});
	$("input[name='businessType2']").click(function() {
		if(page.businessType2Change) {
			page.businessType2Change(this);
		}
		page.getPrice();
	});
	$("input[name='companyType']").change(function() {
		if(page.companyTypeChange) {
			page.companyTypeChange(this);
		}
		page.getPrice();
	});
	
	
	page.getPrice = function() {
		
		dum.common.ajax({
			type : "post",
			url : "/ordCart/getPrice.do",
			data: page.jsonForm(),
			dataType: "text",
			success : function(data) {
				if(data != 0) {
					$("#ordPrice").text(data+" 元");
				}
			}
		});
	}
	
	page.jsonForm = function() {
		var param = new Object();
		param.companyAreaCode = $("input[name='companyAreaCode']").val();
		param.flowCode = $("input[name='flowCode']").val();
		param.comboCode = $("input[name='comboCode']").val();
		param.companyType = $("input[name='companyType']:checked").val();
		param.companyName = $("input[name='companyName']").val();
		param.business = "";
		$.each($("input[name='businessType']:checked"), function() {
			if(param.business != null && param.business != "") {
				param.business += ","
			}
			param.business += ($(this).val() + "|" + ($(this).attr("counter") ? $(this).attr("counter") : 1));
		});
		$.each($("input[name='businessType1']:checked"), function() {
			if(param.business != null && param.business != "") {
				param.business += ","
			}
			param.business += ($(this).val() + "|" + ($(this).attr("counter") ? $(this).attr("counter") : 1));
		});
		
		$.each($("input[name='businessType2']:checked"), function() {
			if(param.business != null && param.business != "") {
				param.business += ","
			}
			param.business += ($(this).val() + "|" + ($(this).attr("counter") ? $(this).attr("counter") : 1));
		});
		return param;
	} 
	
});