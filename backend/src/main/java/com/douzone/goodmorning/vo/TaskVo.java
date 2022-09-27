package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TaskVo {
	private Long id;
	private Long projectNo;
	private String title;
	private String start;
	private String end;
	private String status;
	private String userName;
	private Long userNo;
	private Long crewNo;
	private String projectName;
	private String color;

}
