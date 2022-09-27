package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ChatRepository;
import com.douzone.goodmorning.vo.ChatVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatService {
	
	private final ChatRepository chatRepository;
	
	public List<ChatVo> getMessageList(Long crewNo) {
		return chatRepository.findAllByCrewNo(crewNo);
	}
	
	public List<ChatVo> getChannelMessageList(Long ChannelNo) {
		return chatRepository.findAllByChannelNo(ChannelNo);
	}

	public Boolean AddMessage(ChatVo chatVo) {
		return chatRepository.insertByCrewNoAndUserNo(chatVo);
	}

	public Long getLastChat(Long crewNo, Long userNo) {
		return chatRepository.findNoByCrewNoAndUserNo(crewNo, userNo);
	}

	public Boolean insertChatUserByCrewNoAndChatNo(Long userNo, Long chatNo) {
		return chatRepository.insertChatUserByCrewNoAndChatNo(userNo, chatNo);
	}
	
	public Boolean insertReadChatUserByCrewNoAndChatNo(Long userNo, Long chatNo) {
		return chatRepository.insertReadChatUserByCrewNoAndChatNo(userNo, chatNo);
	}

	public boolean updateChatUser(Long crewNo, Long authUserNo) {
		return chatRepository.updateChatUserByCrewNoAndAuthUserNo(crewNo, authUserNo);
	}

	public Long getUnReadMessageCount(Long crewNo, Long authUserNo) {
		return chatRepository.findCountByCrewNoAndAuthUserNo(crewNo, authUserNo);
	}
}
