package com.douzone.goodmorning.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.douzone.goodmorning.security.AuthInterceptor;
import com.douzone.goodmorning.security.AuthUserHandlerMethodArgumentResolver;
import com.douzone.goodmorning.security.LoginInterceptor;
import com.douzone.goodmorning.security.LogoutInterceptor;

@SpringBootConfiguration
public class WebConfig implements WebMvcConfigurer {
	
	@Autowired
	private Environment env;
	
	// Security Interceptors
	@Bean
	public HandlerInterceptor loginInterceptor() {
		return new LoginInterceptor();
	}
	
	@Bean
	public HandlerInterceptor logoutInterceptor() {
		return new LogoutInterceptor();
	}
	
	@Bean
	public HandlerInterceptor authInterceptor() {
		return new AuthInterceptor();
	}	
	
	// Argument Resolver
	@Bean
	public HandlerMethodArgumentResolver handlerMethodArgumentResolver() {
		return new AuthUserHandlerMethodArgumentResolver();
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// Security Interceptors
//		registry
//			.addInterceptor(loginInterceptor())
//			.addPathPatterns("/api/user/signIn");

//		registry
//		.addInterceptor(logoutInterceptor())
//		.addPathPatterns("/api/user/logout");
		

//		registry
//		.addInterceptor(authInterceptor())
//		.addPathPatterns("/api/**")
//		.excludePathPatterns("/assets/**")
//		.excludePathPatterns("/api/user/singIn")
//		.excludePathPatterns("/api/user/logout");

		
	}
}
