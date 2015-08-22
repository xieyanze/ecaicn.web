package com.ecaicn.web.entity;

import java.io.Serializable;
import java.lang.reflect.Field;

/**
 * 
 * @author 延泽
 *
 */
public class IdEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2483093499213818451L;

	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		IdEntity other = (IdEntity) obj;
		if (id == null) {
			return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		StringBuffer sb = new StringBuffer();
		for (Field field : getClass().getDeclaredFields()) {
			field.setAccessible(true);
			try {
				sb.append(field.getName()).append("=").append(field.get(this))
						.append(",");
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		return sb.substring(0, sb.length() - 1);
	}

}
