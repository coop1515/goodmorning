package com.douzone.goodmorning.auth;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.UserVo;

@Repository
public class SecurityRepository {

	@Autowired
	private SqlSession sqlSession;

	public UserVo findByEmail(String email) {
		return sqlSession.selectOne("auth.findByEmail", email);
	}
}
