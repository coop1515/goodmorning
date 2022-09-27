package com.douzone.goodmorning.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.douzone.goodmorning.repository.TaskRepository;
import com.douzone.goodmorning.vo.TaskVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TaskService {
	private final TaskRepository taskRepository;
	
	public List<TaskVo> findByProject(Long projectNo) {
		return taskRepository.findByProject(projectNo);
	}
	
	public List<TaskVo> findByCrew(Long crewNo) {
		return taskRepository.findByCrew(crewNo);
	}
	
	public List<TaskVo> findByChannel(Long channelNo) {
		return taskRepository.findByChannel(channelNo);
	}
	
	public Boolean updateTask(TaskVo taskVo) {
		return taskRepository.update(taskVo);
	}

	public Boolean addTask(TaskVo taskVo) {
		return taskRepository.insert(taskVo);
	}

	public Boolean deleteTask(Long id) {
		return taskRepository.delete(id);

	}

}
