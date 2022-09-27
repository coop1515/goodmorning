package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChannelVo {
	private Long no;
	private String name;
	private String description;
	private String creationDate;
	private Long masterChannelUserNo;
	private Long crewNo;
	private String crewName;
	private String email;
}
