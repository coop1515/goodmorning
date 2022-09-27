package com.douzone.goodmorning.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.FileManagementService;
import com.douzone.goodmorning.service.FileUploadService;
import com.douzone.goodmorning.vo.FileManagementVo;
import com.douzone.goodmorning.vo.UserVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = {"*"})
@RequestMapping("/api/fileManagement")
public class FileManagementController {
	
	
	private final FileUploadService FileUploadService;
	private final FileManagementService fileManagementService;

	@Transactional
	@PostMapping("/download/{filename}")
	public ResponseEntity<JsonResult> index(@PathVariable("filename") String filename) {
		String file = "/assets/" + filename;
		FileManagementVo fileManagementVo =fileManagementService.getFile(file);
		
		if(fileManagementVo.getEnable()!=1) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("삭제된 파일입니다!")); 
		}
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(fileManagementVo));
	}
	
	@Transactional
	@PostMapping("/upload")
	public ResponseEntity<JsonResult> upload(@RequestParam("file") MultipartFile file, FileManagementVo fileManagementVo) {
		fileManagementVo.setUrl(FileUploadService.restoreImage(file));
		fileManagementVo.setOriginFileName(file.getOriginalFilename());
		fileManagementService.addFile(fileManagementVo); 
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(fileManagementVo));
	}
	
	@Transactional
	@PostMapping("/fileshareDirectory")
	public ResponseEntity<JsonResult> getProjectName(@RequestBody FileManagementVo fileManagementVo) {
		List<FileManagementVo> list =fileManagementService.findProjectName(fileManagementVo); 
		int count = fileManagementService.findProjectCount(fileManagementVo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("count", count);
		map.put("data",list);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(map));
	}
	
	@Transactional
	@PostMapping("/fileshareFile")
	public ResponseEntity<JsonResult> getProjectFileList(@RequestBody FileManagementVo fileManagementVo) {
		List<FileManagementVo> list =fileManagementService.findFileList(fileManagementVo); 
		int count = fileManagementService.findFileCount(fileManagementVo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("count", count);
		map.put("data",list);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(map));
	}
	
	@Transactional
	@PostMapping("/delete")
	public ResponseEntity<JsonResult> upload(@RequestBody FileManagementVo fileManagementVo) {
		int result = fileManagementService.deleteFile(fileManagementVo); 
		if(result==-1) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("삭제 실패")); 
		}
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(fileManagementVo));
	}
	
	@Transactional
	@PostMapping("/uploadAndFindFileList")
	public ResponseEntity<JsonResult> uploadAndFindFileList(@RequestParam("file") MultipartFile file,FileManagementVo fileManagementVo) {
		fileManagementVo.setUrl(FileUploadService.restoreImage(file));
		fileManagementVo.setOriginFileName(file.getOriginalFilename());
		
		List<FileManagementVo> list =fileManagementService.addFileAndFindFileList(fileManagementVo); 
		int count = fileManagementService.findFileCount(fileManagementVo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("count", count);
		map.put("data",list);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(map));
	}
	
	@Transactional
	@PostMapping("/editProfileImg")
	public ResponseEntity<JsonResult> profileUpload(@RequestParam("file") MultipartFile file, UserVo userVo) {
		userVo.setProfileUrl(FileUploadService.restoreImage(file));
		userVo=fileManagementService.profileUpdateAndFindProfileUrl(userVo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(userVo));
	}
	
	@Transactional
	@PostMapping("/profileImg")
	public ResponseEntity<JsonResult> profileImg(@RequestBody UserVo userVo) {
		userVo=fileManagementService.findProfileUrl(userVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(userVo));
	}

}
