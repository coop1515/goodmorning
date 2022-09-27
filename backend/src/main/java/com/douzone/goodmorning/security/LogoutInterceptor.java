package com.douzone.goodmorning.security;

import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

import com.douzone.goodmorning.dto.JsonResult;
import com.fasterxml.jackson.databind.ObjectMapper;

public class LogoutInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		//세션처리 
		HttpSession session = request.getSession();
		session.removeAttribute("authUser");
		session.invalidate();
		
		
		//json 응답처리 
		response.setContentType("application/json");
		response.setStatus(HttpServletResponse.SC_OK);
		
		JsonResult jsonResult = JsonResult.success("로그아웃 성공.");
		String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
		
		OutputStream os = response.getOutputStream();
		os.write(jsonString.getBytes("UTF-8"));
		os.close();
		
		return false;
	}
}