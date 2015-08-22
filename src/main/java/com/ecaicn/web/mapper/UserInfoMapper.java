package com.ecaicn.web.mapper;

import java.util.List;

import com.ecaicn.web.entity.UserInfo;

public interface UserInfoMapper {
	List<UserInfo> query(UserInfo userInfo);

	UserInfo login(UserInfo userInfo);
}
