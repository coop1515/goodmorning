package com.douzone.goodmorning.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.GitHubHookRepository;
import com.douzone.goodmorning.repository.JenkinsHookRepository;
import com.douzone.goodmorning.vo.GithubHookVo;
import com.douzone.goodmorning.vo.JenkinsHookVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JenkinsHookService {
	private final JenkinsHookRepository jenkinsHookRepository;

	public int insertBuildJenkinsHookResult(HashMap<String, Object> data) {
		Map<String,String> map = new HashMap<String, String>();
		
		map.put("fullUrl",((HashMap<String, Object>) data.get("build")).get("full_url").toString());
		map.put("buildNumber",((HashMap<String, Object>) data.get("build")).get("number").toString());
		map.put("duration", ((HashMap<String, Object>) data.get("build")).get("duration").toString());
		map.put("status", ((HashMap<String, Object>) data.get("build")).get("status").toString());
		map.put("branch", ((HashMap<String, Object>) ((HashMap<String, Object>) data.get("build")).get("scm")).get("branch").toString());
		map.put("commit", ((HashMap<String, Object>) ((HashMap<String, Object>) data.get("build")).get("scm")).get("commit").toString());
		map.put("buildLog",((HashMap<String, Object>) data.get("build")).get("log").toString());
		map.put("projectName", data.get("name").toString());
		// ((HashMap<String, Object>) data.get("pusher")).get("name").toString()
		
		map.put("projectNo",findprojectNo(map.get("projectName")));		
		return jenkinsHookRepository.insert(map);
	}
	
	public String findprojectNo(String projectName) {
		JenkinsHookVo projectNo = jenkinsHookRepository.findProjectNo(projectName);
		return Integer.toString(projectNo.getNo());
	}
	
	public JenkinsHookVo getJenkinsHookData() {
		return jenkinsHookRepository.findJenkinsChatInfo();
	}

	public JenkinsHookVo findLastUpdate() {
		return jenkinsHookRepository.findLastUpdate();
	}
	
}
