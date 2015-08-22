var loginName="loginRegisterDiv";
/**
 * 显示登陆界面
 */
function forgetPwdUI(callback){
	dum.common.ajax({
	   type: "POST",
	   url:"/cus/forgetPwd.html",
	   success: function(msg){
		   $("#"+loginName).html(msg);
		   $("p.sign_clos a").click(function() {
			   showLoginUI(callback);
		   });
		   
		   $("#forgetPwdBtn").click(function() {
			   editPwd(callback);
		   });
	   }
	});
}

/**
 * 关闭登陆界面
 */
function closeLoginUI(){
	$("#"+loginName).html("");
}

var iv;
var tt;
function myInterval() {
	tt--;
	if (tt <= 0) {
		clearInterval(iv);
		$("#verificationCode").val('免费获取验证码');
		$("#verificationCode").removeAttr("disabled");
	} else {
		$("#verificationCode").val(tt + "秒后可重新操作");
	}
}
function getVerificationCode() {
	$(".promptColor span").html("");
	dum.common.ajax({
		type : "post",
		url : "/cus/sendSMS.do",
		data : $('#forgotPwdForm').serialize(),
		dataType : "json",
		success : function(data) {
			if (data.returnstatus=="0") {
				$("input.text_yzm").focus();
				tt = 60;
				iv = setInterval("myInterval()", 1000);
				$("#verificationCode").attr("disabled", true);
			}else{
				$(".error_"+data.filed).html(data.error);
			}
		}
	});
} 

function editPwd(callback){
	$(".promptColor span").html("");
	dum.common.ajax({
		type : "post",
		url : "/cus/editPwd.do",
		data : $('#forgotPwdForm').serialize(),
		dataType : "json",
		success : function(data) {
			if (data.returnstatus=="0") {
				if(callback) {
					callback();
				} 
				window.location=dum.appName+ "/cus/loginjump.html";
			}else{
				 $(".error_"+data.filed).html(data.error);
			}
		}
	});
	
}


$.validator.addMethod("validatePwd", function(value, element) { 
	var userPwd=$("#userPwd").val();
	var newUserPwd=$("#newUserPwd").val();
	if(null != userPwd && undefined != userPwd && "" != userPwd && null != newUserPwd && undefined != newUserPwd && "" != newUserPwd) {
		return userPwd == newUserPwd;
	}
	return true;
}, "密码输入不一致！"); 