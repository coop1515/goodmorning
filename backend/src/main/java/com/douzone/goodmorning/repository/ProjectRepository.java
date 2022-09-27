package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.ChatVo;
import com.douzone.goodmorning.vo.ProjectVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ProjectRepository {
	private final SqlSession sqlSession;

	public List<ProjectVo> findByCrew(Long crewNo) {
		return sqlSession.selectList("project.findByCrew", crewNo);
	}
	
	public List<ProjectVo> findByChannel(Long channelNo, Long userNo) {
		Map<String, Object> map = new HashMap<>();
		map.put("channelNo", channelNo);
		map.put("userNo", userNo);
		return sqlSession.selectList("project.findByChannel", map );
	}
	
	public ChatVo findCrewNoByName(String projectName) {
		return sqlSession.selectOne("project.findCrewNoByName", projectName);
	}

	public long insert(ProjectVo projectVo) {
		sqlSession.insert("project.insert", projectVo);
		long projectId = projectVo.getId();
		return projectId;
	}

	public Boolean update(ProjectVo projectVo) {
		return sqlSession.insert("project.update", projectVo) == 1;
	}

	public Boolean delete(Long id) {
		sqlSession.insert("task.delete", id);
		return sqlSession.insert("project.delete", id) == 1;
	}

	public Long checkProjectNameByCrewNo(Long crewNo, String projectName) {
		Map<String, Object> map = new HashMap<>();
		map.put("crewNo", crewNo);
		map.put("projectName", projectName);
		
		return sqlSession.selectOne("project.checkProjectNameByCrewNo", map);
	}

}
