package com.douzone.goodmorning.security;

import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.vo.UserVo;
import com.fasterxml.jackson.databind.ObjectMapper;


public class AuthInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		response.setContentType("application/json");

		// 1. Handler 종류 확인
		if(handler instanceof HandlerMethod == false) {
			// DefaultServletHandler가 처리하는 정적 자원
			return true;
		}

		// 2. casting
		HandlerMethod handlerMethod = (HandlerMethod)handler;

		// 3. Handler Method의 @Auth 받아보기
		Auth auth = handlerMethod.getMethodAnnotation(Auth.class);
		
		// 4. Handler Method에 @Auth가 없으면  Type에 붙어 있는 지 확인
		if(auth == null) {
			auth=handlerMethod.getBeanType().getAnnotation(Auth.class);
			// auth = handlerMethod
		}
		
		// 5. Type과 Method 모두에 @Auth가 안붙어 있는 경우
		if(auth == null) {
			return true;
		}
		
		// 6. Handler Method에 @Auth가 붙어 있기 때문에 인증(Authentication) 여부 확인
		HttpSession session = request.getSession();
		if(session == null) {
			
			//json 응답처리 
			response.setStatus(HttpServletResponse.SC_OK);
		
			JsonResult jsonResult = JsonResult.fail("인증이 되지 않았습니다.");
			String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
			
			OutputStream os = response.getOutputStream();
			os.write(jsonString.getBytes("UTF-8"));
			os.close();
			
			//response.sendRedirect(request.getContextPath() + "/user/login");
			return false;
		}

		// 7. @Auth가 적용되어 있지만 인증이 되어 있지 않음  
		UserVo authUser = (UserVo)session.getAttribute("authUser");
		
		if(authUser == null) {
			
			//json 응답처리 
			response.setStatus(HttpServletResponse.SC_OK);
		
			JsonResult jsonResult = JsonResult.fail("인증이 되지 않았습니다.");
			String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
			
			OutputStream os = response.getOutputStream();
			os.write(jsonString.getBytes("UTF-8"));
			os.close();
			
			return false;
		}
		return true;
	}
}
