package com.ecaicn.web.entity;

/**
 * 用户信息类
 * @author 延泽
 *
 */
public class UserInfo extends IdEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8589919477887231501L;
	private String userName;
	private String password;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
