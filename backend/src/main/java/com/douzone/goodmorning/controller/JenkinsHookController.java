package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.ChatService;
import com.douzone.goodmorning.service.CrewService;
import com.douzone.goodmorning.service.JenkinsHookService;
import com.douzone.goodmorning.service.ProjectService;
import com.douzone.goodmorning.service.RedisPublisher;
import com.douzone.goodmorning.service.UserService;
import com.douzone.goodmorning.vo.ChatVo;
import com.douzone.goodmorning.vo.CrewVo;
import com.douzone.goodmorning.vo.JenkinsHookVo;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/jenkinsHook")
@RestController
@RequiredArgsConstructor
public class JenkinsHookController {
	
	private final JenkinsHookService jenkinsHookService;
	private final ProjectService projectService;
	private final CrewService crewService;
	private final UserService userService;
	private final ChatService chatService;
	private final RedisPublisher redisPublisher;
	
	@Transactional
    @GetMapping("/{crewNo}/{projectName}")
    public ResponseEntity<Message> chatChannelList(@PathVariable("crewNo") Long crewNo, @PathVariable("projectName") String projectName) {
		Long count = projectService.checkProjectNameByCrewNo(crewNo, projectName);
		
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message(); 	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("success");
    	message.setData(count);
    	
    	if(count == 0)
    		message.setMessage("fail");
    	
    	return ResponseEntity.ok().headers(headers).body(message);
    }
	
	@Transactional
	@PostMapping("/hookdata")
	public ResponseEntity<Message> jenkinshook(@RequestBody HashMap<String, Object> data) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	   	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("success");
    	
		Map<String,Object> map = new LinkedHashMap<>();
		
		Entry<String, Object> entry = data.entrySet().iterator().next();
		String key= entry.getKey();
		switch(key) {
			case "build":
				jenkinsHookService.insertBuildJenkinsHookResult(data);
				break;
		}
		////////////////////////////////////////////////////////////////
		//////////////////////JENKINS WEB HOOK END/////////////////////
		//////////////////////////////////////////////////////////////		

		// 최근에 추가된 Jenkins 데이터 가져오기
		JenkinsHookVo jenkinsVo = jenkinsHookService.findLastUpdate();
		
		// ChatVo 객체 생성
		ChatVo chatVo = projectService.findCrewNoByName(jenkinsVo.getProjectName());
		chatVo.setUserNo(crewService.findMaster(jenkinsVo.getProjectName()));
		chatVo.setMessage(
			jenkinsVo.getFullUrl() + "#$#" + 
			jenkinsVo.getBuildNumber() + "#$#" +
			jenkinsVo.getDuration() + "#$#" +
			jenkinsVo.getStatus() + "#$#" +
			jenkinsVo.getBranch() + "#$#" +
			jenkinsVo.getCommit() + "#$#" +
			jenkinsVo.getProjectName()
		);	
		chatVo.setType(ChatVo.MessageType.JENKINS);
		chatVo.setUserName(userService.findUserNameByNo(chatVo.getUserNo()));
		
		message.setData(chatVo);
		
		// 채팅 DB 추가
    	if(!chatService.AddMessage(chatVo)) {
    		message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	
    	// 방금 입력된 채팅의 no 가져오기
    	Long chatNo = chatService.getLastChat(chatVo.getCrewNo(), chatVo.getUserNo());
    	
    	// 크루에 속한 유저 no 리스트 가져오고
    	List<CrewVo> crewNoList = crewService.getUserNo(chatVo.getCrewNo());
		
    	// for문으로 insert 문 돌리기 check unread
    	for(int i = 0; i < crewNoList.size(); i++) {
    		chatService.insertChatUserByCrewNoAndChatNo(crewNoList.get(i).getUserNo(), chatNo);
    	}
    	
		////////////////////////////////////////////////////////////////
		////////////////////// Chat, Chat_user END/////////////////////
		//////////////////////////////////////////////////////////////
    	
		// 스톰프로 채팅 뿌리기
		String topic = Long.toString(chatVo.getCrewNo());
		
    	if(ChatVo.MessageType.JENKINS.equals(chatVo.getType())) {
    		redisPublisher.publish(topic, chatVo);
    	}
	
		return ResponseEntity.ok().headers(headers).body(message);
	}
	
	@Transactional
	@PostMapping("/jenkinsHookChatData")
	public void gitHookChatData() {
		System.out.println(jenkinsHookService.getJenkinsHookData());
	}
}
