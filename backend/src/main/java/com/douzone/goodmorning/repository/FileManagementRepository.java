package com.douzone.goodmorning.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.douzone.goodmorning.vo.FileManagementVo;
import com.douzone.goodmorning.vo.UserVo;

import lombok.RequiredArgsConstructor;


@Repository
@RequiredArgsConstructor
public class FileManagementRepository {
	private final SqlSession sqlSession;
	
	public Boolean insert(FileManagementVo vo) {
		return 1 == sqlSession.insert("filemanage.insert", vo);
	}

	public FileManagementVo findFile(String filename) {
		return sqlSession.selectOne("filemanage.findFile",filename);
	}

	public List<FileManagementVo> findProjectName(FileManagementVo fileManagementVo) {
		
		return sqlSession.selectList("filemanage.findProjectName", fileManagementVo.getUserNo());
	}

	public int findPorjectCount(FileManagementVo fileManagementVo) {
		
		return sqlSession.selectOne("filemanage.findProjectCount", fileManagementVo.getUserNo());
	}

	public List<FileManagementVo> findFileList(FileManagementVo fileManagementVo) {
		return sqlSession.selectList("filemanage.findFileList", fileManagementVo.getProjectNo());
	}

	public int findFileCount(FileManagementVo fileManagementVo) {
		return sqlSession.selectOne("filemanage.findFileCount", fileManagementVo.getProjectNo());
	}

	public int updateEnable(FileManagementVo fileManagementVo) {
		return sqlSession.update("filemanage.updateEnable", fileManagementVo);
	}
	
	public boolean profileUpdate(UserVo userVo) {
		return 1 == sqlSession.update("filemanage.profileupdate", userVo);
	}

	public UserVo findProfileUrl(UserVo userVo) {
		return sqlSession.selectOne("filemanage.findProfileUrl",userVo);
	}
	
}
