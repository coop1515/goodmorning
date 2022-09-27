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
import com.douzone.goodmorning.service.ProjectService;
import com.douzone.goodmorning.service.TaskService;
import com.douzone.goodmorning.vo.ProjectVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("/api/project")
@RestController
public class ProjectController {
    private final ProjectService projectService;
    private final TaskService taskService;

	/**
	 * 채널 리스트 정보
	 * @param userNo 채널 주인의 유저번호
	 * @return 해당 유저가 소유한 유저 리스트
	 */

	@Transactional
    @GetMapping("/cNo/{crewNo}")
    public ResponseEntity<JsonResult> findByCrew(@PathVariable("crewNo") Long crewNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.findByCrew(crewNo)));
    }
    
  	@Transactional
  	@GetMapping("/{channelNo}/{userNo}")
    public ResponseEntity<JsonResult> projectList(@PathVariable("channelNo") Long channelNo, @PathVariable("userNo") Long userNo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

    	return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.findByChannel(channelNo,userNo)));
    }
    
  	@Transactional
    @PutMapping("/{id}")
    public ResponseEntity<JsonResult> update(@RequestBody ProjectVo projectVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.updateProject(projectVo)));
    }
    
  	@Transactional
    @PostMapping("")
    public ResponseEntity<JsonResult> add(@RequestBody ProjectVo projectVo) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.addProject(projectVo)));
    }

  	@Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResult> delete(@PathVariable("id") Long id) {
    	HttpHeaders headers = new HttpHeaders();
    	headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
    	taskService.deleteTask(id);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.deleteProject(id)));
    }
    
  	@Transactional
    @PostMapping("/makejenkinsJob")
    public ResponseEntity<JsonResult> makeJenkinsJob(@RequestBody ProjectVo vo) {
    	
    	String projectXml = "<project>"
    			+ "<actions/>"
    			+ "<description/>"
    			+ "<keepDependencies>false</keepDependencies>"
    			+ "<properties>"
    			+ "<com.tikal.hudson.plugins.notification.HudsonNotificationProperty plugin=\"notification@1.15\">"
    			+ "<endpoints>"
    			+ "<com.tikal.hudson.plugins.notification.Endpoint>"
    			+ "<protocol>HTTP</protocol>"
    			+ "<format>JSON</format>"
    			+ "<urlInfo>"
    			+ "<urlOrId> http://34.64.235.225:8080/api/jenkinsHook/hookdata</urlOrId>"
    			+ "<urlType>PUBLIC</urlType>"
    			+ "</urlInfo>"
    			+ "<event>completed</event>"
    			+ "<timeout>30000</timeout>"
    			+ "<loglines>-1</loglines>"
    			+ "<buildNotes>Jenkins WebHook</buildNotes>"
    			+ "<retries>0</retries>"
    			+ "</com.tikal.hudson.plugins.notification.Endpoint>"
    			+ "</endpoints>"
    			+ "</com.tikal.hudson.plugins.notification.HudsonNotificationProperty>"
    			+ "</properties>"
    			+ "<scm class=\"hudson.plugins.git.GitSCM\" plugin=\"git@4.11.4\">"
    			+ "<configVersion>2</configVersion>"
    			+ "<userRemoteConfigs>"
    			+ "<hudson.plugins.git.UserRemoteConfig>"
    			+ "<url>https://github.com/"+vo.getGitUserName()+"/"+vo.getProjectName()+".git</url>"
    			+ "<credentialsId>github_access_token</credentialsId>"
    			+ "</hudson.plugins.git.UserRemoteConfig>"
    			+ "</userRemoteConfigs>"
    			+ "<branches>"
    			+ "<hudson.plugins.git.BranchSpec>"
    			+ "<name>*/main</name>"
    			+ "</hudson.plugins.git.BranchSpec>"
    			+ "</branches>"
    			+ "<doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>"
    			+ "<submoduleCfg class=\"empty-list\"/>"
    			+ "<extensions/>"
    			+ "</scm>"
    			+ "<canRoam>true</canRoam>"
    			+ "<disabled>false</disabled>"
    			+ "<blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>"
    			+ "<blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>"
    			+ "<triggers/>"
    			+ "<concurrentBuild>false</concurrentBuild>"
    			+ "<builders>"
    			+ "<hudson.tasks.Maven>"
    			+ "<targets> clean package</targets>"
    			+ "<mavenName>maven 3.8</mavenName>"
    			+ "<usePrivateRepository>false</usePrivateRepository>"
    			+ "<settings class=\"jenkins.mvn.DefaultSettingsProvider\"/>"
    			+ "<globalSettings class=\"jenkins.mvn.DefaultGlobalSettingsProvider\"/>"
    			+ "<injectBuildVariables>false</injectBuildVariables>"
    			+ "</hudson.tasks.Maven>"
    			+ "</builders>"
    			+ "<publishers>"
    			+ "<jenkins.plugins.publish__over__ssh.BapSshPublisherPlugin plugin=\"publish-over-ssh@1.24\">"
    			+ "<consolePrefix>SSH: </consolePrefix>"
    			+ "<delegate plugin=\"publish-over@0.22\">"
    			+ "<publishers>"
    			+ "<jenkins.plugins.publish__over__ssh.BapSshPublisher plugin=\"publish-over-ssh@1.24\">"
    			+ "<configName>buildServer</configName>"
    			+ "<verbose>false</verbose>"
    			+ "<transfers>"
    			+ "<jenkins.plugins.publish__over__ssh.BapSshTransfer>"
    			+ "<remoteDirectory>/usr/local/douzone/springboot-apps/"+vo.getProjectName()+"</remoteDirectory>"
    			+ "<sourceFiles>target/"+vo.getProjectName()+".jar</sourceFiles>"
    			+ "<excludes/>"
    			+ "<removePrefix>target</removePrefix>"
    			+ "<remoteDirectorySDF>false</remoteDirectorySDF>"
    			+ "<flatten>false</flatten>"
    			+ "<cleanRemote>false</cleanRemote>"
    			+ "<noDefaultExcludes>false</noDefaultExcludes>"
    			+ "<makeEmptyDirs>false</makeEmptyDirs>"
    			+ "<patternSeparator>[, ]+</patternSeparator>"
    			+ "<execCommand/>"
    			+ "<execTimeout>120000</execTimeout>"
    			+ "<usePty>false</usePty>"
    			+ "<useAgentForwarding>false</useAgentForwarding>"
    			+ "<useSftpForExec>false</useSftpForExec>"
    			+ "</jenkins.plugins.publish__over__ssh.BapSshTransfer>"
    		    + "<jenkins.plugins.publish__over__ssh.BapSshTransfer>"
    		    + "<remoteDirectory>/usr/local/douzone/springboot-apps/"+vo.getProjectName()+"</remoteDirectory>"
    		    + "<sourceFiles>target/launch.sh</sourceFiles>"
    		    + "<excludes/>"
    		    + "<removePrefix>target</removePrefix>"
    		    + "<remoteDirectorySDF>false</remoteDirectorySDF>"
    		    + "<flatten>false</flatten>"
    		    + "<cleanRemote>false</cleanRemote>"
    		    + "<noDefaultExcludes>false</noDefaultExcludes>"
    		    + "<makeEmptyDirs>false</makeEmptyDirs>"
    		    + "<patternSeparator>[, ]+</patternSeparator>"
    		    + "<execCommand>chmod 770 /usr/local/douzone/springboot-apps/"+vo.getProjectName()+"/launch.sh" + "\n" + "/usr/local/douzone/springboot-apps/"+vo.getProjectName()+"/launch.sh</execCommand>"
    		    + "<execTimeout>120000</execTimeout>"
    		    + "<usePty>false</usePty>"
    		    + "<useAgentForwarding>false</useAgentForwarding>"
    		    + "<useSftpForExec>false</useSftpForExec>"
    		    + "</jenkins.plugins.publish__over__ssh.BapSshTransfer>"
    			+ "</transfers>"
    			+ "<useWorkspaceInPromotion>false</useWorkspaceInPromotion>"
    			+ "<usePromotionTimestamp>false</usePromotionTimestamp>"
    			+ "</jenkins.plugins.publish__over__ssh.BapSshPublisher>"
    			+ "</publishers>"
    			+ "<continueOnError>false</continueOnError>"
    			+ "<failOnError>false</failOnError>"
    			+ "<alwaysPublishFromMaster>false</alwaysPublishFromMaster>"
    			+ "<hostConfigurationAccess class=\"jenkins.plugins.publish_over_ssh.BapSshPublisherPlugin\" reference=\"../..\"/>"
    			+ "</delegate>"
    			+ "</jenkins.plugins.publish__over__ssh.BapSshPublisherPlugin>"
    			+ "</publishers>"
    			+ "<buildWrappers/>"
    			+ "</project>";
    	String jenkinsXml="curl -X POST -H 'Content-Type:application/xml' -d '"+projectXml+"' -u jenkins:11eac84873470eb9d72cfb6f989468eb14 http://34.64.214.252:8080/jenkins/createItem?name="+vo.getProjectName();
    	projectService.execCMD(jenkinsXml);
    	return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("됬나?"));
    } 

  	@Transactional
    @PostMapping("/buildJenkinsJob")
    public ResponseEntity<JsonResult> buildJenkinsJob(@RequestBody ProjectVo vo) {
    	 
    	String buildjenkins="curl -X POST http://34.64.214.252:8080/jenkins/job/"+vo.getProjectName()+"/build --user jenkins:11eac84873470eb9d72cfb6f989468eb14 -v";
    	projectService.execCMD(buildjenkins);
    	return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("됬나?"));
    } 

    
    
    
}
