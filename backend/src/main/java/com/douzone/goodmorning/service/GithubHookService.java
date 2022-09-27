package com.douzone.goodmorning.service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.GitHubHookRepository;
import com.douzone.goodmorning.vo.GithubHookVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GithubHookService {
	
	private final GitHubHookRepository gitHubHookRepository;
	
	public int pushEventInsert(HashMap<String, Object> data, String key) {
		Map<String,String> map = new HashMap<String, String>();
		
		map.put("eventType",key);
		map.put("pusher", ((HashMap<String, Object>) data.get("pusher")).get("name").toString());
		map.put("message",((HashMap<String, Object>) data.get("head_commit")).get("message").toString());
		map.put("projectName",((HashMap<String, Object>) data.get("repository")).get("name").toString());
		//map.put("timeStamp",((HashMap<String, Object>) data.get("head_commit")).get("timestamp").toString());
		map.put("branch",data.get("ref").toString());
		map.put("after",data.get("after").toString());
		map.put("projectNo",findprojectNo(map.get("projectName")));
		
		return gitHubHookRepository.pusherEventInsert(map);
	}

	public int deleteEventInsert(HashMap<String, Object> data, String key) {
		Map<String,String> map = new HashMap<String, String>();
		
		map.put("eventType",key);
		map.put("pusher", ((HashMap<String, Object>) data.get("sender")).get("login").toString());
		map.put("projectName", ((HashMap<String, Object>) data.get("repository")).get("name").toString());
		map.put("message",data.get("ref") +" 의 " + data.get("ref_type") +" 삭제" );
		map.put("branch",data.get("ref").toString());
		map.put("after"," ");
		map.put("projectNo",findprojectNo(map.get("projectName")));
		return gitHubHookRepository.pusherEventInsert(map);
	}

	public int createEventInsert(HashMap<String, Object> data, String key) {
		
		Map<String,String> map = new HashMap<String, String>();

		map.put("eventType",key);
		map.put("pusher", ((HashMap<String, Object>) data.get("sender")).get("login").toString());
		map.put("projectName", ((HashMap<String, Object>) data.get("repository")).get("name").toString());
		map.put("message",data.get("ref") +"  " + data.get("ref_type") +" 생성" );
		map.put("branch",data.get("ref").toString());
		map.put("after"," ");
		map.put("projectNo",findprojectNo(map.get("projectName")));
		return gitHubHookRepository.pusherEventInsert(map);
		
	}

	public int pullReqeustEventInsert(HashMap<String, Object> data, String key) {
		
		Map<String,String> map = new HashMap<String, String>();
		
		map.put("eventType",key);
		map.put("pusher", ((HashMap<String, Object>) data.get("sender")).get("login").toString());
		map.put("projectName", ((HashMap<String, Object>) data.get("repository")).get("name").toString());
		if(data.get("action").toString().equals("synchronize")) {
			map.put("message", "pullRequest " +data.get("action").toString()+ " : "+ ((HashMap<String, Object>) data.get("pull_request")).get("body").toString());
		}else {
			map.put("message","pullRequest " +data.get("action").toString());
		}
		map.put("branch", ((HashMap<String, Object>) ((HashMap<String, Object>) data.get("pull_request")).get("head")).get("ref").toString());
		map.put("after","");
		map.put("projectNo",findprojectNo(map.get("projectName")));
		return gitHubHookRepository.pusherEventInsert(map);
		
	}
	
	public String findprojectNo(String projectName) {
		GithubHookVo projectNo = gitHubHookRepository.findProjectNo(projectName);
		return Integer.toString(projectNo.getNo());
	}
	
	public GithubHookVo getGitHookData() {
		return gitHubHookRepository.findGitHubChatInfo();
	}

	public String findMessageByProjectNo(String projectName) {
		GithubHookVo gitVo = gitHubHookRepository.findMessageByProjectNo(projectName);	
		return gitVo.getEventType() + "#$#" + gitVo.getUserName() + "#$#" + gitVo.getMessage() + "#$#" + gitVo.getBranch() + "#$#" + gitVo.getAfter() + "#$#" + gitVo.getProjectName();
	}


}
