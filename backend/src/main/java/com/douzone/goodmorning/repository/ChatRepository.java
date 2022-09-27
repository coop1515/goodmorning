package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ChatRepository {
	private final SqlSession sqlSession;
	
	public List<ChatVo> findAllByCrewNo(Long crewNo) {
		return sqlSession.selectList("chat.findAllByCrewNo", crewNo);
	}
	
	public List<ChatVo> findAllByChannelNo(Long ChannelNo) {
		return sqlSession.selectList("chat.findAllByChannelNo", ChannelNo);
	}

	public Boolean insertByCrewNoAndUserNo(ChatVo chatVo) {
		return sqlSession.insert("chat.insertByCrewNoAndUserNo", chatVo) == 1;
	}

	public Long findNoByCrewNoAndUserNo(Long crewNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("userNo", userNo);
		return sqlSession.selectOne("chat.findNoByCrewNoAndUserNo", map);
	}

	public Boolean insertChatUserByCrewNoAndChatNo(Long userNo, Long chatNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("chatNo", chatNo);
		return sqlSession.insert("chat.insertChatUserByCrewNoAndChatNo", map) == 1;
	}
	
	public Boolean insertReadChatUserByCrewNoAndChatNo(Long userNo, Long chatNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("chatNo", chatNo);
		return sqlSession.insert("chat.insertReadChatUserByCrewNoAndChatNo", map) == 1;
	}

	public boolean updateChatUserByCrewNoAndAuthUserNo(Long crewNo, Long authUserNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("authUserNo", authUserNo);
		return sqlSession.update("chat.updateChatUserByCrewNoAndAuthUserNo", map) == 1;
	}

	public Long findCountByCrewNoAndAuthUserNo(Long crewNo, Long authUserNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("authUserNo", authUserNo);
		return sqlSession.selectOne("chat.findCountByCrewNoAndAuthUserNo", map);
	}

}
