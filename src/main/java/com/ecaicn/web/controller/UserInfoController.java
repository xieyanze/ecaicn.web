package com.ecaicn.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecaicn.web.entity.UserInfo;
import com.ecaicn.web.service.IUserInfoService;

@Controller
@RequestMapping(value="/users")
public class UserInfoController {
	
	@Autowired
	private IUserInfoService userInfoService;
	
	@RequestMapping(value="query.do")
	@ResponseBody
	public List<UserInfo> query(UserInfo userInfo){
		return userInfoService.query(userInfo);
	}
	
	@RequestMapping(value="login.do")
	@ResponseBody
	public UserInfo login(String userName,String password){
		UserInfo userInfo = new UserInfo();
		userInfo.setUserName(userName);
		userInfo.setPassword(password);
		return userInfoService.login(userInfo);
	}
}
