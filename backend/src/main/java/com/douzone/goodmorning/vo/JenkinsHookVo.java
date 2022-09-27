package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@ToString
public class JenkinsHookVo {
	private int no;
	private String fullUrl;
	private String buildNumber;
	private int duration;
	private String status;
	private String branch;
	private String commit;
	private String date;
	private int projectNo;
	private String projectName;
	private int crewNo;
	private int masterCrewUserNo;
	private String buildLog;
}
