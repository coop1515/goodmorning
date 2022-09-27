package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.ChannelRepository;
import com.douzone.goodmorning.repository.CrewRepository;
import com.douzone.goodmorning.vo.ChannelVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChannelService {
	private final ChannelRepository channelRepository;
	private final CrewRepository crewRepository;
	
	public List<ChannelVo> getChannel(Long channelNo, Long userNo) {
		return channelRepository.findAll(channelNo, userNo);
	}

	public Boolean addChannel(ChannelVo channelVo) {
		return channelRepository.insert(channelVo);
	}

	public List<ChannelVo> getFirstChannel(String userNo) {
		return channelRepository.findFirst(userNo);
	}

	public void updateChannel(ChannelVo channelVo) {
		channelRepository.updateChannel(channelVo);
		
	}


	public Long findByMasterChannelUserNo(Long masterChannelUserNo) {
		return channelRepository.findByMasterChannelUserNo(masterChannelUserNo);
	}

	public void addChannelUser(Long masterChannelUserNo, Long channelNo, Long owner) {
		channelRepository.addChannelUser(masterChannelUserNo,channelNo, owner);
		
	}

	public List<ChannelVo> getChangeChannel(String channelNo, String userNo) {
		return channelRepository.getChangeChannel(channelNo, userNo);
	}

	public int checkUser(String channelNo, String email) {
		return channelRepository.checkUser(channelNo,email);
		
	}

	public int findUserNoByEmail(String email) {
		return channelRepository.findUserNoByEmail(email);
	}

	public Long findCrewNoByChannelNo(String channelNo) {
		return crewRepository.findCrewNoByChannelNo(channelNo);
	}

	public Long getChannelNo(Long crewNo, Long authUserNo) {
		return channelRepository.findNoByCrewNoAndUserNo(crewNo,authUserNo);
	}

	public List<ChannelVo> getMasterChannelUser(Long channelNo) {
		return channelRepository.findMasterChannelUser(channelNo);
	}

}
