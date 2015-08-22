var registerName="loginRegisterDiv";
/**
 * 显示注册界面
 */
function showRegisterUI(callback){
	dum.common.ajax({
	   type: "POST",
	   url:  "/cus/registerUI.html",
	   success: function(msg)
	   {
		   $("#"+registerName).html(msg);
		   $("p.sign_clos a").click(function() {
			   showLoginUI(callback);
		   });
		   
		   $("p.btn_p .btn_rester").click(function() {
			   register(callback);
		   });
	   }
	});
}

/**
 * 关闭注册界面
 */
function closeRegisterUI(){
	$("#"+registerName).html("");
}

var isCommit=true;
//提交登录
function getValidateCode() {
	$(".promptColor span").html("");
	if(isCommit){
		// 获取验证马时需要填写手机号码
		isCommit=false;
		dum.common.ajax({
			type : "post",
			url : "/cus/getValidateCode.do",
			data : $('#registerForm').serialize(), 
			dataType : "json",
			success : function(data) {
				if (data.returnstatus=="0") {
					tt = 60;
					iv = setInterval("myInterval()", 1000);
					$("#validateCode").attr("disabled", true);
				}else{
					$(".error_"+data.filed).html(data.error);
					isCommit = true;
				}
			}
		});
	}
}
var iv;
var tt;
function myInterval() {
	tt--;
	if (tt <= 0) {
		clearInterval(iv);
		$("#validateCode").val('免费获取验证码');
		$("#validateCode").removeAttr("disabled");
		isCommit=true;
	} else {
		$("#validateCode").val(tt + "秒后可重新操作");
	}
}

//提交注册
function register(callback) {
	$(".promptColor span").html("");
    if($("#register_checkBox:checked").length > 0){
    	// 获取验证马时需要填写手机号码
    	dum.common.ajax({
    		type : "post",
    		url : "/cus/register.do",
    		data : $('#registerForm').serialize(),
    		dataType : "json",
    		success : function(data) 
    		{
    			if (data.returnstatus=="0")
    			{
    				if(callback) { 
    					callback();
    				} else if(data.orderCode && "" != data.orderCode) {
					   $('#registerForm').addInput({name:"orderCode"}).val(data.orderCode);
					   $('#registerForm').attr("action", dum.appName + "/payment/paymentConfirm.html");
					   $('#registerForm').attr("method", "post");
					   $('#registerForm').submit();
				   } else {
    					// ${session.current_payment_code[0]}
    					window.location=dum.appName+ "/messCenter/index.html";
    				}
    			}else{
    				$(".error_"+data.filed).html(data.error);
    			}
    		}
    	});
    } else {
    	$(".error_validateLicens").show();
    }
}

function checkedLicense(){
	if($("#register_checkBox:checked").val() == '1'){
		$(".error_validateLicens").hide();
	}else{
		$(".error_validateLicens").show();
	}
}

function changeImg(){
	$("#vcodeImg").attr("src",dum.appName+"/cus/vcode.do?json=img");
}