package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.goodmorning.vo.CrewVo;
import com.douzone.goodmorning.vo.UserVo;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Repository
public class CrewRepository {

	private final SqlSession sqlSession;
	
	@Transactional
	public List<CrewVo> findAll(Long channelNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("userNo", userNo);
		return sqlSession.selectList("crew.findAll", map);
	}

	@Transactional
	public boolean insert(CrewVo crewVo) {
		return sqlSession.insert("crew.insert", crewVo) == 1;
	}


	@Transactional
	public Long findMaster(Long channelNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("userNo", userNo);
		return sqlSession.selectOne("crew.findMaster", map);		
	}
	
	public Long findMaster(String projectName) {
		return sqlSession.selectOne("crew.findMasterByNo", projectName);	
	}

	@Transactional
	public void addCrewUser(Long crewNo, Long userNo, Long owner) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("userNo", userNo);
		map.put("owner", owner);
		sqlSession.insert("crew.insertcrewuser", map);
	}


	public List<CrewVo> findCrewUser(Long no) {
		return sqlSession.selectList("crew.findCrewUser", no);
	}

	public boolean updateLastIn(String crewNo, int userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("userNo", userNo);
		
		return sqlSession.update("crew.updateLastIn", map) == 1;
	}

	public Long findCrewNoByChannelNo(String channelNo) {
		return sqlSession.selectOne("crew.findCrewNoByChannelNo", channelNo);
	}

	public boolean updateCrewName(CrewVo crewVo) {
		return sqlSession.update("crew.updateCrewName", crewVo ) == 1;
	}

	public List<CrewVo> getAllCrew(Long userNo) {
		return sqlSession.selectList("crew.getAllCrew",userNo);
	}

	public int checkCrewUser(int userNo, String crewNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("userNo", userNo);
		return sqlSession.selectOne("crew.checkCrewUser", map);
	}

	public List<CrewVo> findNoByCrewNo(Long crewNo) {
		return sqlSession.selectList("crew.findNoByCrewNo", crewNo);
	}

	public void deleteCrewUser(Long crewNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("userNo", userNo);
		sqlSession.delete("crew.deleteCrewUser", map);
		
	}

	public List<CrewVo> findMasterCrewUser(Long crewNo) {
		return sqlSession.selectList("crew.findMasterCrewUser", crewNo);
	}

	public UserVo findUserNameByUserEmail(String email) {
		return sqlSession.selectOne("crew.findUserNameByUserEmail", email);
	}

	public int findDuplicationName(CrewVo crewVo) {
		return sqlSession.selectOne("crew.findDuplicationName", crewVo);
	}

}
