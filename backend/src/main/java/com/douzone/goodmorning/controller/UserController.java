package com.douzone.goodmorning.controller;

import java.io.IOException;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.security.Auth;
import com.douzone.goodmorning.dto.Message;
import com.douzone.goodmorning.dto.status.StatusEnum;
import com.douzone.goodmorning.service.FileUploadService;
import com.douzone.goodmorning.service.UserService;
import com.douzone.goodmorning.vo.UserVo;
import com.douzone.goodmorning.vo.VerificationTokenVo;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/user")
@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final FileUploadService FileUploadService;
	
	@Transactional
	@PostMapping("/signUp")
	public ResponseEntity<JsonResult> singUp(@RequestBody UserVo vo){
		vo.setEnable(false);
		
		int result = userService.signUp(vo);
		if(result==-1) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("중복된 이메일 입니다!")); 
		}		
		userService.addDefaultChannelAndCrew(vo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("회원가입 되었습니다 해당 이메일로 확인 메일이 전송되었습니다."));
	}
	
	@Transactional
	@GetMapping("/mailAuthentication/{email}/{token}")
	public void mailAuthentication(@PathVariable("email") String email, @PathVariable("token") String token, HttpServletResponse response) throws IOException {
		String url = "http://34.64.235.225:8080/signin";
		VerificationTokenVo tokenVo = new VerificationTokenVo();
		tokenVo.setEmail(email);
		tokenVo.setToken(token);
		int result =userService.verifyAccount(tokenVo);
		
		if(result == -1) {
			response.sendRedirect(url);
			//return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("이메일 인증에 실패했습니다."));
		}
		response.sendRedirect(url);
		//return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("이메일 인증에 성공했습니다."));
	}
	
	@PostMapping("/signIn")
	public void singIn(){
	}
	
	@GetMapping("/logout")
	public void logout() {
	}
	
	@Transactional
	@PutMapping("/resetPw")
	public ResponseEntity<JsonResult> resetPw(@RequestBody UserVo vo) {
		
		
		UserVo authUser = userService.getEmailEnable(vo);
		if(authUser==null) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("존재하지 않는 이메일 입니다."));
		}
		
		if(!authUser.isEnable()) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("인증되지 않은 이메일 입니다."));
		}
		
		int result =userService.resetPw(authUser);
		
		if(result==0) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("이메일 전송 실패.."));
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("임시 비밀번호가 해당 메일로 전송되었습니다."));
	}
	
	@Transactional
	@GetMapping("/email/{channelNo}/{crewNo}")
	public ResponseEntity<Message> getEmails(@PathVariable("channelNo") String channelNo, @PathVariable("crewNo") String crewNo) {
		HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("해당 채널&크루 유저의 이메일 리스트 조회");
    	message.setData(userService.findAllEmaillist(channelNo, crewNo));
    	return ResponseEntity.ok().headers(headers).body(message);
    }
	
	@Transactional
	@GetMapping("/email/{channelNo}")
	public ResponseEntity<Message> getEmails(@PathVariable("channelNo") Long channelNo) {
	HttpHeaders headers = new HttpHeaders();
   	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
   
   	Message message = new Message();
   	message.setStatus(StatusEnum.OK);
   	message.setMessage("해당 채널 유저의 이메일 리스트 조회");
   	message.setData(userService.findAllEmaillist(channelNo));
   	return ResponseEntity.ok().headers(headers).body(message);
   }
	
	@Transactional
	@GetMapping("/info/{userNo}")
	public ResponseEntity<Message> getUser(@PathVariable("userNo") Long userNo) {
		HttpHeaders headers = new HttpHeaders();
  	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
  
  	Message message = new Message();
  	message.setStatus(StatusEnum.OK);
  	message.setMessage("유저의 정보 조회");
  	message.setData(userService.findUserByUserNo(userNo));
  	return ResponseEntity.ok().headers(headers).body(message);
	}
	
	@Transactional
    @PutMapping("/update")
    public ResponseEntity<Message> updateUser(@RequestBody UserVo userVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

    	userService.updateUser(userVo);

    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("유저 정보 업데이트 성공");
    	message.setData("success");
    	return ResponseEntity.ok().headers(headers).body(message);
    }
	
	@Transactional
    @PostMapping("/upload")
    public ResponseEntity<Message> uploadProfile(@RequestParam("file") MultipartFile file, @RequestParam("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
    	String fileURL = FileUploadService.restoreImage(file);
    	userService.updateFileURL(fileURL, userNo);
    	
    	Message message = new Message();
    	message.setStatus(StatusEnum.OK);
    	message.setMessage("유저 정보 업데이트 성공");
    	message.setData(fileURL);
    	return ResponseEntity.ok().headers(headers).body(message);
    }
	
}
