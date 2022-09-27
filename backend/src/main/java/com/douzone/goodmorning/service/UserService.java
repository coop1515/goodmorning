package com.douzone.goodmorning.service;


import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.goodmorning.repository.ChannelRepository;
import com.douzone.goodmorning.repository.CrewRepository;
import com.douzone.goodmorning.repository.UserRepository;
import com.douzone.goodmorning.repository.VerificationTokenRepository;
import com.douzone.goodmorning.security.SHA256;
import com.douzone.goodmorning.util.MailUtil;
import com.douzone.goodmorning.vo.ChannelVo;
import com.douzone.goodmorning.vo.CrewVo;
import com.douzone.goodmorning.vo.UserVo;
import com.douzone.goodmorning.vo.VerificationTokenVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	

	private final UserRepository userRepository;
	private final ChannelRepository channelRepository;
	private final CrewRepository crewRepository;
	private final VerificationTokenRepository verificationTokenRepository;
	private final JavaMailSender mailSender;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	 
	@Transactional
	public int signUp(UserVo vo){
		
		if(userRepository.existsById(vo) != null) {
			return -1;
		}
		
		vo.setEnable(false);
		vo.setPasswd(bCryptPasswordEncoder.encode(vo.getPasswd()));
		userRepository.insert(vo);
		
		
		VerificationTokenVo verificationTokenVo =new VerificationTokenVo();
		
		
		String token = generateVerificationToken(vo);
		
		
		String setSubject ="[굿모닝 이메일 인증메일 입니다.]";
		String setText = "<h1>메일인증</h1>" +
				"<br/>"+vo.getName()+"님 "+
				"<br/>굿모닝에 회원가입해주셔서 감사합니다."+
				"<br/>아래 [이메일 인증 확인]을 누르면 이메일 인증이 완료됩니다.<br/>"+
				"<a href='http://34.64.235.225:8080/api/user/mailAuthentication/" + vo.getEmail() +
				"/" + token +
				"' target='_blenk'>이메일 인증 확인</a>";
		
		sendmail(setSubject,setText,vo.getEmail());
		
		return 1;
		
	}

	public UserVo signIn(UserVo vo) {
		
		return userRepository.findByEmailAndPassword(vo);
		
	}

	public UserVo getUser(String email, String password) {
		
		UserVo vo =  new UserVo();
		vo.setEmail(email);
		vo.setPasswd(password);

		return userRepository.findByEmailAndPassword(vo);
		
	}
	
	public UserVo getEmailEnable(UserVo vo) {
		return userRepository.findByEnable(vo);
	}

	
    private String generateVerificationToken(UserVo vo) {
        String token = UUID.randomUUID().toString();
        VerificationTokenVo verificationToken = new VerificationTokenVo();
        verificationToken.setToken(token);
        verificationToken.setUserNo(findEmailNo(vo.getEmail()));
        verificationTokenRepository.insert(verificationToken);
        return token;
    }
    
    @Transactional
	public int verifyAccount(VerificationTokenVo vo) {
		if(verificationTokenRepository.findByToken(vo)==null) {
			return -1;
		}
		
        return userRepository.updateEnable(vo);
        
	}
	
	@Transactional
	public int resetPw(UserVo vo) {
		
		SHA256 sha256 = new SHA256();
		
		String token;
		try {
			token = UUID.randomUUID().toString();
			String enctypt_token = bCryptPasswordEncoder.encode(token);
			
			String setSubject = "[굿모닝 패스워드 재설정 메일 입니다.]";
			String setText = "<h1>패스워드 재설정 메일</h1>" +
					"<br/>해당 패스워드로 변경이 되었습니다.."+
					"<br/>임시 패스워드로 로그인 하신 후 변경하시면 됩니다.<br/>"+
					"임시 패스워드 : "+ token;
			
			sendmail(setSubject, setText, vo.getEmail());
			
			return userRepository.updatePw(vo.getEmail(),enctypt_token);
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	

		return 0;

		
	}
	
	
	public void sendmail(String setSubject, String setText, String email) {
		
		try {
			MailUtil sendMail = new MailUtil(mailSender);
			
			sendMail.setSubject(setSubject); //메일제목
			sendMail.setText(setText);
			
			sendMail.setFrom("choisichang13@gmail.com", "choisichang");
			sendMail.setTo(email);
			sendMail.start();
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public int findEmailNo(String email) {
		VerificationTokenVo userNo = verificationTokenRepository.findUserNo(email);
		return userNo.getNo();
	}
	
	public void addDefaultChannelAndCrew(UserVo vo) {
		
		int userNo = userRepository.findByUserNo(vo.getEmail());
		vo.setNo(userNo);
		ChannelVo channelVo = new ChannelVo();
		channelVo.setName(vo.getName() + "님의 워크스페이스");
		channelVo.setDescription(vo.getName() + "님의 워크스페이스 입니다.");
		channelVo.setMasterChannelUserNo(Long.valueOf(vo.getNo()));
		channelRepository.insert(channelVo);
		Long channelNo = channelRepository.findByMasterChannelUserNo(Long.valueOf(vo.getNo()));
		channelRepository.addChannelUser(channelVo.getMasterChannelUserNo(), channelNo, 1L);
		
		CrewVo crewVo = new CrewVo();
		crewVo.setName("기본 채널");
		crewVo.setMasterCrewUserNo(Long.valueOf(vo.getNo()));
		crewVo.setChannelNo(channelNo);
		crewRepository.insert(crewVo);
		Long crewNo = crewRepository.findMaster(channelNo, Long.valueOf(vo.getNo()));
		crewRepository.addCrewUser(crewNo, Long.valueOf(vo.getNo()), 1L);
			
	}

	public List<UserVo> findAllEmaillist(String channelNo, String crewNo) {
		return userRepository.findAllEmaillist(channelNo, crewNo);
	}

	public Object findAllEmaillist(Long channelNo) {
		return userRepository.findAllEmaillist(channelNo);
	}


	public UserVo findProfile(UserVo vo) {
		return userRepository.findProfile(vo);
	}
	
	public Object findUserByUserNo(Long userNo) {
		return userRepository.findUserByUserNo(userNo);
	}

	public void updateUser(UserVo userVo) {
		userRepository.updateUser(userVo);
	}

	public void updateFileURL(String fileURL, Long userNo) {
		userRepository.updateFileURL(fileURL, userNo);
		
	}

	public String findUserNameByNo(Long userNo) {
		return userRepository.findUserNameByNo(userNo);
	}

}
