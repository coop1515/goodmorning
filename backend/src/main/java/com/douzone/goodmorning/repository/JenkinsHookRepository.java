package com.douzone.goodmorning.repository;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.GithubHookVo;
import com.douzone.goodmorning.vo.JenkinsHookVo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class JenkinsHookRepository {

	private final SqlSession sqlSession;

	public int insert(Map<String, String> map) {
		return sqlSession.insert("jenkinshook.insert",map);		
	}

	public JenkinsHookVo findProjectNo(String string) {
		return sqlSession.selectOne("jenkinshook.findProjectNo",string);
	}
	
	public JenkinsHookVo findJenkinsChatInfo() {
		return sqlSession.selectOne("jenkinshook.findJenkinsChatInfo");
	}

	public JenkinsHookVo findLastUpdate() {
		return sqlSession.selectOne("jenkinshook.findLastUpdate");
	}
}
