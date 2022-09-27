package com.douzone.goodmorning.repository;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.GithubHookVo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class GitHubHookRepository {
	
	private final SqlSession sqlSession;

	public int pusherEventInsert(Map<String, String> map) {
		return sqlSession.insert("githubhook.insert",map);
	}
	
	public GithubHookVo findProjectNo(String string) {
		return sqlSession.selectOne("githubhook.findProjectNo",string);
	}
	
	public GithubHookVo findGitHubChatInfo() {
		return sqlSession.selectOne("githubhook.findGitHubChatInfo");
	}

	public GithubHookVo findMessageByProjectNo(String projectName) {
		return sqlSession.selectOne("githubhook.findMessageByProjectNo", projectName);
	}
	
}
