package com.douzone.goodmorning.controller;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.douzone.goodmorning.service.ProjectService;
import com.douzone.goodmorning.service.RedisPublisher;
import com.douzone.goodmorning.service.RedisSubscriber;
import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final RedisSubscriber redisSubscriber;
    private final RedisMessageListenerContainer redisMessageListener;
    private final ProjectService projectService;
    
    @MessageMapping("/chat")
    public void message(@RequestBody ChatVo chatVo) {
    	String topic = Long.toString(chatVo.getCrewNo());
    	
    	// 0번. [CONNECT]일 경우 메시지 리스너 등록
    	if(ChatVo.MessageType.CONNECT.equals(chatVo.getType())) {
    		redisMessageListener.addMessageListener(redisSubscriber, new ChannelTopic(topic));
    	}
    	// 1번. [CHAT]일 경우 클라이언트 => 서버로 전달
    	if(ChatVo.MessageType.CHAT.equals(chatVo.getType())) 
    		redisPublisher.publish(topic, chatVo);
    	
    	if(ChatVo.MessageType.PREVIEW.equals(chatVo.getType())) 
    		redisPublisher.publish(topic, chatVo);
    	
    	if(ChatVo.MessageType.FILE.equals(chatVo.getType())) 
    		redisPublisher.publish(topic, chatVo);
    	
    	if(ChatVo.MessageType.ENTER.equals(chatVo.getType())) 
    		redisPublisher.publish(topic, chatVo);
    	
    	
    	if(ChatVo.MessageType.COMMAND.equals(chatVo.getType())) {
    		redisPublisher.publish(topic, chatVo);
    	
    		if(!"none".equals(chatVo.getMessage())) {
	    		projectService.execCMD(
	    				"curl -X POST http://34.64.214.252:8080/jenkins/job/" + 
	    				chatVo.getMessage() + 
	    				"/build --user jenkins:11eac84873470eb9d72cfb6f989468eb14 -v");
    		}
    	}
    		
    }
}
