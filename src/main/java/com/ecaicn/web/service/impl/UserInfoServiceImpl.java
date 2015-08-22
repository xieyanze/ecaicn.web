package com.ecaicn.web.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaicn.web.entity.UserInfo;
import com.ecaicn.web.mapper.UserInfoMapper;
import com.ecaicn.web.service.IUserInfoService;

@Service
public class UserInfoServiceImpl implements IUserInfoService {

	@Autowired
	private UserInfoMapper userInfoMapper;
	
	@Override
	public List<UserInfo> query(UserInfo userInfo) {
		return userInfoMapper.query(userInfo);
	}
	
	@Override
	public UserInfo login(UserInfo userInfo){
		return userInfoMapper.login(userInfo);
	}

}
