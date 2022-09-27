package com.douzone.goodmorning.exception;

public class FileUploadException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	public FileUploadException() {
		super("ServiceException Occurs");
	}

	public FileUploadException(String message) {
		super(message);
	}
	
}