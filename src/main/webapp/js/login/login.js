var loginName="loginRegisterDiv";
/**
 * 显示登陆界面
 */
function showLoginUI(callback){
	dum.common.ajax({
	   type: "POST",
	   url:"/cus/loginUI.html",
	   success: function(msg){
		   $("#"+loginName).html(msg);
		   // 绑定登录
		   $("#btn_login", $("#"+loginName)).click(function() {
			   login(callback);
		   }); 
		   // 绑定注册
		   $("p.forgot_password a._forgot_password").click(function() {
			   forgetPwdUI(callback);
		   })
		   // 绑定忘记密码
		   $("p.forgot_password a._register").click(function() {
			   showRegisterUI(callback);  
		   })
	   }
	});
}

/**
 * 关闭登陆界面
 */
function closeLoginUI(){
	$("#"+loginName).html("");
}

/**
* 立即登陆
*/
function login(callback){
	$(".promptColor span").html("");
	dum.common.ajax({
		   type: "post",
		   url: "/cus/login.do",
		   data:  $('#loginForm').serialize(),
		   dataType : "json",
		   success: function(data)
		   {
			   if (data.returnstatus=="0") 
			   {
				   if(callback) {
					   callback();
				   } else if(data.orderCode && "" != data.orderCode) {
					   $('#loginForm').addInput({name:"orderCode"}).val(data.orderCode);
					   $('#loginForm').attr("action", dum.appName + "/payment/paymentConfirm.html");
					   $('#loginForm').attr("method", "post");
					   $('#loginForm').submit();
				   } else {
					   window.location=dum.appName+ "/messCenter/index.html";   
				   }
			   }else{
				   	 $(".error_"+data.filed).html(data.error);
			   }
		   }
		});
}

