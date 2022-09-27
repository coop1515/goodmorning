package com.douzone.goodmorning.vo;



import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.goodmorning.security.SHA256;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@ToString
public class UserVo {

	   private int no;
	   private String email;
	   private String name;
	   private String passwd;
	   private String signUpDate;
	   private String job;
	   private String phoneNumber;
	   private String profileUrl;
	   private boolean enable;
	   
	  
	   
	   public void setNo(int no) {
	      this.no = no;
	   }
	   public void setEmail(String email) {
	      this.email = email;
	   }
	   public void setName(String name) {
	      this.name = name;
	   }
	   
	   public void setPasswd(String passwd) {
//	      SHA256 sha256 = new SHA256();   
//	      try {
//	         this.passwd = sha256.encrypt(passwd);
//	      } catch (NoSuchAlgorithmException e) {
//	         e.printStackTrace();
//	      }
		   this.passwd = passwd;
	   }
	   
	   public void setEnable(boolean enable) {
	      this.enable = enable;
	   }
	   public void setSignUpDate(String signUpDate) {
	      this.signUpDate = signUpDate;
	   }
	   public void setJob(String job) {
	      this.job = job;
	   }
	   public void setPhoneNumber(String phoneNumber) {
	      this.phoneNumber = phoneNumber;
	   }
	   
		public void setProfileUrl(String profileUrl) {
			this.profileUrl = profileUrl;
		}
		
}
