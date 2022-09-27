package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.UserVo;
import com.douzone.goodmorning.vo.VerificationTokenVo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {
	
	private final SqlSession sqlSession;
	
	
	public int insert(UserVo vo) {
		return sqlSession.insert("user.insert",vo);
	}


	public UserVo existsById(UserVo vo) {
		return sqlSession.selectOne("user.existsById",vo);
	}


	public UserVo findByEmailAndPassword(UserVo vo) {
		return sqlSession.selectOne("user.findByEmailAndPassword",vo);
	}

	public UserVo findByEnable(UserVo vo) {
		return sqlSession.selectOne("user.findByEnable",vo);
	}
	
	public int updateEnable(VerificationTokenVo vo) {
		
		return sqlSession.update("user.updateEnable",vo);
	}


	public int updatePw(String email, String token) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("email", email);
		map.put("token", token);
		return sqlSession.update("user.updatePw",map);
	}


	public int findByUserNo(String email) {
		return sqlSession.selectOne("user.findByUserNo", email);
	}


	public List<UserVo> findAllEmaillist(String channelNo, String crewNo) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("channelNo", channelNo);
		map.put("crewNo", crewNo);
		
		return sqlSession.selectList("user.findAllEmaillist", map);
	}


	public Object findAllEmaillist(Long channelNo) {
		return sqlSession.selectList("user.findAllEmaillistByChannelNo", channelNo);
	}

	public UserVo findProfile(UserVo vo) {
		return sqlSession.selectOne("user.findProfile",vo);
	}
	
	public Object findUserByUserNo(Long userNo) {
		return sqlSession.selectList("user.findUserByUserNo", userNo);
	}

	public void updateUser(UserVo userVo) {
		sqlSession.update("user.updateUser",userVo);

	}

	public void updateFileURL(String fileURL, Long userNo) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("fileURL", fileURL);
		map.put("userNo", userNo);
		
		sqlSession.update("user.updateFileURL", map);
		
	}

	public String findUserNameByNo(Long userNo) {
		return sqlSession.selectOne("user.findUserNameByNo", userNo);
	}

}
