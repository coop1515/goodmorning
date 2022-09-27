package com.douzone.goodmorning.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.VerificationTokenVo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class VerificationTokenRepository {
	private final SqlSession sqlSession;
	
	public int insert(VerificationTokenVo verificationToken) {
		return sqlSession.insert("verifi.insert",verificationToken);
	}

	public VerificationTokenVo findByToken(VerificationTokenVo verificationToken) {
		return sqlSession.selectOne("verifi.findByToken",verificationToken);
	}

	public VerificationTokenVo findUserNo(String email) {
		return sqlSession.selectOne("verifi.findUserNo", email);
	}
	
}
