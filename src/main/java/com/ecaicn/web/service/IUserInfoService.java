package com.ecaicn.web.service;

import java.util.List;

import com.ecaicn.web.entity.UserInfo;

public interface IUserInfoService {
	List<UserInfo> query(UserInfo userInfo);

	UserInfo login(UserInfo userInfo);
}
