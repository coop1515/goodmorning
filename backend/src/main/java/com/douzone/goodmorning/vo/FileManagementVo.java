package com.douzone.goodmorning.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@Setter
@ToString
public class FileManagementVo {
	private long no;
	private String url;
	private String comment;
	private int chatNo;
	private int userNo;
	private String projectName;
	private int projectNo;
	private String originFileName;
	private String sendDate;
	private String crewName;
	private int enable;
}
