package com.douzone.goodmorning.controller;

import java.nio.charset.Charset;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.goodmorning.dto.JsonResult;
import com.douzone.goodmorning.service.TaskService;
import com.douzone.goodmorning.vo.TaskVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/task")
@RestController
public class TaskController {
    private final TaskService taskService;
  
	/**
	 * 채널 리스트 정보
	 * @param userNo 채널 주인의 유저번호
	 * @return 해당 유저가 소유한 유저 리스트
	 */

	@Transactional
    @GetMapping("/pNo/{projectNo}")
    public ResponseEntity<JsonResult> findByProject(@PathVariable("projectNo") Long projectNo) {

    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.findByProject(projectNo)));
    }

	@Transactional
    @GetMapping("/cNo/{crewNo}")
    public ResponseEntity<JsonResult> findByCrew(@PathVariable("crewNo") Long crewNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.findByCrew(crewNo)));
    }
    

	@Transactional
    @GetMapping("/{channelNo}")
    public ResponseEntity<JsonResult> findByChannel(@PathVariable("channelNo") Long channelNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.findByChannel(channelNo)));
 }
	
	@Transactional
    @PutMapping("/{id}")
    public ResponseEntity<JsonResult> update(@RequestBody TaskVo taskVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	 
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.updateTask(taskVo)));
    }
	
	@Transactional
    @PostMapping("")
    public ResponseEntity<JsonResult> add(@RequestBody TaskVo taskVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.addTask(taskVo)));
    }
	
	@Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResult> delete(@PathVariable("id") Long id) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskService.deleteTask(id)));
    }
    
}
