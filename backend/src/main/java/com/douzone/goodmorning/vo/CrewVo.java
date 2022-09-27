package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CrewVo {
	private Long no;
	private Long channelNo;
	private Long masterCrewUserNo;
	private String creationDate;
	private String name;
	private String email;
	// crew_user 관련 속성
	private Long userNo;
	private String userName;

}
