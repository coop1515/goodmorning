package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.goodmorning.vo.ChannelVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ChannelRepository {
	private final SqlSession sqlSession;

	@Transactional
	public List<ChannelVo> findAll(Long channelNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("userNo", userNo);
		return sqlSession.selectList("channel.findAll", map);
	}

	@Transactional
	public Boolean insert(ChannelVo channelVo) {
		return sqlSession.insert("channel.insert", channelVo) == 1;
	}

	@Transactional
	public List<ChannelVo> findFirst(String userNo) {
		return sqlSession.selectList("channel.findFirst", userNo);
		
	}

	public void updateChannel(ChannelVo channelVo) {
		sqlSession.update("channel.updateChannel", channelVo);
		
	}

	public Long findByMasterChannelUserNo(Long masterChannelUserNo) {
		return sqlSession.selectOne("channel.findByMasterChannelUserNo", masterChannelUserNo);
	}

	public void addChannelUser(Long masterChannelUserNo, Long channelNo, Long owner) {
		Map<String, Object> map = new HashMap<>();
		map.put("masterChannelUserNo", masterChannelUserNo);
		map.put("channelNo", channelNo);
		map.put("owner", owner);
		sqlSession.insert("channel.insertUser", map);
	}

	public List<ChannelVo> getChangeChannel(String channelNo, String userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("userNo", userNo);
		return sqlSession.selectList("channel.getChangeChannel", map);
	}

	public int checkUser(String channelNo, String email) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("email", email);
		return sqlSession.selectOne("channel.checkUser", map);
	}

	public int findUserNoByEmail(String email) {	
		if (null == sqlSession.selectOne("channel.findUserNoByEmail", email))
			return 0;
		
		return sqlSession.selectOne("channel.findUserNoByEmail", email); 
	}

	public Long findNoByCrewNoAndUserNo(Long crewNo, Long authUserNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("authUserNo", authUserNo);
		return sqlSession.selectOne("channel.findNoByCrewNoAndUserNo", map);
	}

	public List<ChannelVo> findMasterChannelUser(Long channelNo) {
		return sqlSession.selectList("channel.findMasterChannelUser", channelNo);
	}

}
