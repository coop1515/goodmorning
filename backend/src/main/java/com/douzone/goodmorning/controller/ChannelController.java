package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;

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
import com.douzone.goodmorning.service.CrewService;
import com.douzone.goodmorning.vo.ChannelVo;
import com.douzone.goodmorning.vo.UserVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = {"GET", "POST", "PUT", "DELETE"})
@RequestMapping("/api")
@Controller
public class ChannelController {

    private final ChannelService channelService;
    private final CrewService crewService;
  
	/**
	 * 채널 리스트 정보
	 * @param userNo 채널 주인의 유저번호
	 * @return 해당 유저가 소유한 유저 리스트
	 */
    @Transactional
    @GetMapping("/channel/{channelNo}/{userNo}")
    public ResponseEntity<Message> channels(@PathVariable("channelNo") Long channelNo, @PathVariable("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널목록 조회");
    	message.setData(channelService.getChannel(channelNo,userNo));
    	return ResponseEntity.ok().headers(headers).body(message);

    }
    /**
     * 
     * @param channelNo
     * @param userNo
     * @return
     */
    @Transactional
    @GetMapping("/channel/{userNo}")
    public ResponseEntity<Message> channels(@PathVariable("userNo") String userNo) {   	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("첫 채널목록 조회");
    	message.setData(channelService.getFirstChannel(userNo));
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    /**
     * 
     * @param channelNo
     * @param userNo
     * @return 채널 변경시 첫 크루 조회
     * 
     */
    @Transactional
    @GetMapping("/channel/change/{channelNo}/{userNo}")
    public ResponseEntity<Message> changeChannels(@PathVariable("channelNo") String channelNo, @PathVariable("userNo") String userNo ) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널 변경시 첫 크루 조회");
    	message.setData(channelService.getChangeChannel(channelNo,userNo));
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @GetMapping("/channel/master/{channelNo}")
    public ResponseEntity<Message> masterChannelUserNo(@PathVariable("channelNo") Long channelNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널 셋팅 마스터 채널 유저 조회");
    	message.setData(channelService.getMasterChannelUser(channelNo));
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    /**
     * application/x-www-form-urlencoded로 전달 할 경우 ChannelVo channelVo로 받기
     * application/json로 전달 할 경우 @RequestBody ChannelVo channelVo로 받기
     */
    @Transactional
    @PostMapping("/channel")
    public ResponseEntity<Message> channel(@RequestBody ChannelVo channelVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	channelService.addChannel(channelVo);
    	Long channelNo = channelService.findByMasterChannelUserNo(channelVo.getMasterChannelUserNo());
    	channelService.addChannelUser(channelVo.getMasterChannelUserNo(),channelNo, 1L);  	
    	channelVo.setNo(channelNo);
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널추가 성공");
    	message.setData(channelVo);
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @PutMapping("/channel/{channelNo}")
    public ResponseEntity<Message> updateChannel(@PathVariable("channelNo") String channelNo, @RequestBody ChannelVo channelVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	channelService.updateChannel(channelVo);
    	    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("채널업데이트 성공");
    	message.setData("success");
    	return ResponseEntity.ok().headers(headers).body(message);
    }
    
    @Transactional
    @PostMapping("/channel/invite/{channelNo}")
    public ResponseEntity<Message> inviteChannel(@PathVariable("channelNo") String channelNo, @RequestBody UserVo userVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	int checkcount = channelService.checkUser(channelNo,userVo.getEmail());
    	    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	
    	if(checkcount == 1) {
        	message.setMessage("유저가 채널에 이미 존재합니다.");
        	message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	
    	int userNo = channelService.findUserNoByEmail(userVo.getEmail());
    	
    	if(userNo == 0 ) {
        	message.setMessage("가입한 유저가 아닙니다.");
        	message.setData("fail");
    		return ResponseEntity.ok().headers(headers).body(message);
    	}
    	
    	channelService.addChannelUser(Long.valueOf(userNo),Long.valueOf(channelNo), 0L);
    	Long crewNo = channelService.findCrewNoByChannelNo(channelNo);
    	crewService.addCrewUser(crewNo, Long.valueOf(userNo), 0L);
    	
    	message.setMessage("유저 초대에 성공하였습니다.");
    	message.setData("success");
    	return ResponseEntity.ok().headers(headers).body(message);
    }
}
