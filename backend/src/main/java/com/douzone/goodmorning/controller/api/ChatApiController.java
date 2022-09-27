package com.douzone.goodmorning.controller.api;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.ChannelService;
import com.douzone.goodmorning.service.ChatService;
import com.douzone.goodmorning.service.CrewService;
import com.douzone.goodmorning.vo.ChatVo;
import com.douzone.goodmorning.vo.CrewVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
@Controller
public class ChatApiController {
    private final ChatService chatService;
    private final CrewService crewService;
    private final ChannelService channelService;
    
    // 채팅 리스트 가져오기
    @Transactional
    @GetMapping("/chat/{crewNo}")
    public ResponseEntity<Message> chatList(@PathVariable("crewNo") Long crewNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message(); 	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("[" + crewNo + " 크루]" + " 메시지 리스트");
    	message.setData(chatService.getMessageList(crewNo));
    	
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    // 채널 전체 채팅 리스트 가져오기
    @Transactional
    @GetMapping("/chat/channel/{channelNo}")
    public ResponseEntity<Message> chatChannelList(@PathVariable("channelNo") Long channelNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message(); 	
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("[" + channelNo + " 크루]" + " 메시지 리스트");
    	message.setData(chatService.getChannelMessageList(channelNo));
  
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    // 채팅 추가
    @Transactional
    @PostMapping("/chat/{crewNo}/{userNo}")
    public ResponseEntity<Message> chatAdd(@PathVariable("crewNo") Long crewNo, @PathVariable("userNo") Long userNo, @RequestBody ChatVo chatVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("[" + crewNo + " 크루]" + " 메시지 추가");   	   	
    	message.setData("success");
    	
    	if(!chatService.AddMessage(chatVo)) {
    		message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	// 방금 입력된 채팅의 no 가져오고
    	Long chatNo = chatService.getLastChat(crewNo, userNo);
    	
    	// 크루에 속한 유저 no 리스트 가져오고
    	List<CrewVo> crewNoList = crewService.getUserNo(crewNo);
    	
    	// for문으로 insert 문 돌리기 check unread
    	for(int i = 0; i < crewNoList.size(); i++) {
    		chatService.insertChatUserByCrewNoAndChatNo(crewNoList.get(i).getUserNo(), chatNo);
    	}
    	
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @PutMapping("/chatUser/{crewNo}/{authUserNo}")
    public ResponseEntity<Message> chatUserUpdate(@PathVariable("crewNo") Long crewNo, @PathVariable("authUserNo") Long authUserNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("[" + crewNo + " 크루]" +  "[" + authUserNo + " 유저]" +" 읽음 업데이트");
    	message.setData("success");
    	
    	if(!chatService.updateChatUser(crewNo, authUserNo)) {
    		message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}

    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @GetMapping("/chat/count/{crewNo}/{authUserNo}")
    public ResponseEntity<Message> chatUnReadCount(@PathVariable("crewNo") Long crewNo, @PathVariable("authUserNo") Long authUserNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("[" + crewNo + " 크루]" +  "[" + authUserNo + " 유저]" +" 안 읽은 메시지 갯수");
    	
    	Long unReadCount = chatService.getUnReadMessageCount(crewNo, authUserNo);
    	Long channelNo = channelService.getChannelNo(crewNo, authUserNo);
    	
		Map<String, Object> map = new HashMap<>();
		map.put("unReadCount", unReadCount);
		map.put("channelNo", channelNo);
    	message.setData(map);
    	
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    
}
