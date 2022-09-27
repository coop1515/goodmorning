package com.douzone.goodmorning.security;

import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.UserService;
import com.douzone.goodmorning.vo.UserVo;
import com.fasterxml.jackson.databind.ObjectMapper;

public class LoginInterceptor implements HandlerInterceptor {
	
	@Autowired
	private UserService userService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			
			throws Exception {
		
		SHA256 sha256 =  new SHA256();
		
		String email = request.getParameter("email");
		String passwd = request.getParameter("passwd");

		response.setContentType("application/json");
		UserVo authUser = userService.getUser(email, passwd);	
		
		if(authUser == null) {
			
			//json 응답처리 
			response.setStatus(HttpServletResponse.SC_OK);
		
			JsonResult jsonResult = JsonResult.fail("이메일 또는 패스워드가 잘못되었습니다.");
			String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
			
			OutputStream os = response.getOutputStream();
			os.write(jsonString.getBytes("UTF-8"));
			os.close();
			
			return false;
		}

		if(!authUser.isEnable()) {
			
			response.setStatus(HttpServletResponse.SC_OK);
		
			JsonResult jsonResult = JsonResult.fail("이메일 인증이 되지 않았습니다. 이메일을 확인해주세요.");
			String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
			
			OutputStream os = response.getOutputStream();
			os.write(jsonString.getBytes("UTF-8"));
			os.close();
			
			return false;
		}
		
		return false;
	}
}
