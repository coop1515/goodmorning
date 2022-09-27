package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.CrewRepository;
import com.douzone.goodmorning.vo.CrewVo;
import com.douzone.goodmorning.vo.UserVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CrewService {
	
	private final CrewRepository crewRepository;
	
	public List<CrewVo> getCrew(Long channelNo, Long userNo) {
		return crewRepository.findAll(channelNo, userNo);
	}

	public Boolean addCrew(CrewVo crewVo) {
		return crewRepository.insert(crewVo);	
	}


	public Long findMaster(Long channelNo, Long userNo) {
		return crewRepository.findMaster(channelNo, userNo);	
	}
	
	public Long findMaster(String projectName) {
		return crewRepository.findMaster(projectName);
	}

	public void addCrewUser(Long crewNo, Long userNo, Long owner) {
		crewRepository.addCrewUser(crewNo, userNo, owner);
		
	}

	// crew_user 관련 서비스
	public List<CrewVo> getCrewUser(Long no) {
		return crewRepository.findCrewUser(no);
	}

	public boolean updateLastIn(String crewNo, int userNo) {
		return crewRepository.updateLastIn(crewNo, userNo);
	}

	public boolean updateCrewName(CrewVo crewVo) {
		return crewRepository.updateCrewName(crewVo);
		
	}

	public List<CrewVo> getAllCrew(Long userNo) {
		return crewRepository.getAllCrew(userNo);
	}

	public int checkCrewUser(int userNo, String crewNo) {
		return crewRepository.checkCrewUser(userNo,crewNo);
	}

	public List<CrewVo> getUserNo(Long crewNo) {
		return crewRepository.findNoByCrewNo(crewNo);
	}

	public void deleteCrewUser(Long crewNo, Long userNo) {
		crewRepository.deleteCrewUser(crewNo,userNo);
		
	}

	public List<CrewVo> getMasterCrewUser(Long crewNo) {
		return crewRepository.findMasterCrewUser(crewNo);
	}

	public UserVo findUserNameByUserEmail(String email) {
		return crewRepository.findUserNameByUserEmail(email);
	}

	public int findDuplicationName(CrewVo crewVo) {
		return crewRepository.findDuplicationName(crewVo);
	}
}
