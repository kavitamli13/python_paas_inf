package com.tcs.paas.fission.controller;

import com.tcs.paas.fission.dto.Project;
import com.tcs.paas.fission.dto.Role;
import com.tcs.paas.fission.exception.*;
import com.tcs.paas.fission.service.ProjectsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProjectsController
{
    private final ProjectsService projectsService;
    public ProjectsController(ProjectsService projectsService) {
        this.projectsService = projectsService;
    }
    Logger logger = LoggerFactory.getLogger(ProjectsController.class);

    // Create New Project
    @PostMapping(value = {"/create", MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Project> createNewProject(@RequestBody Project project) throws ProjectCreationException, ProjectExistsException, UserAddException {
        int  result = projectsService.createNewProject(project);
        project.setRoleId("PR001");
        result = result + projectsService.addUserToProject(project);
        if (result > 1) {
            logger.info("Create Project : Successfully created Project "+project.getProjectName()+ ".Sending Response");
            return ResponseEntity.status(HttpStatus.OK).body(new Project("Success"));
        }
        else {
            throw new ProjectCreationException("Unable to create project");
        }
    }

      //Get Project User Roles
    @GetMapping(value="/roles")
    public ResponseEntity<List<Role>> listProjectRoles(){
       List<Role> projectRoles =  projectsService.listProjectRoles();
       return ResponseEntity.status(HttpStatus.OK).body(projectRoles);
    }

    //Manage Users
    //Add User to a Project
    @PostMapping(value = {"/manage/users/add", MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Project> addUserToProject(@RequestBody Project project) throws UserAddException {
        int  result = projectsService.addUserToProject(project);
        if (result > 0) {
            logger.info("Add User : Successfully Added User="+project.getUserId()+" to Project="+project.getProjectName()+ ".Sending Response");
            return ResponseEntity.status(HttpStatus.OK).body(new Project("Success"));
        }
        else {
            throw new UserAddException("Unable to add user "+project.getUserId()+" to Project "+project.getProjectName());
        }
    }

    //Delete User from a particular Project
    @DeleteMapping(value = {"/manage/users/delete", MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Project> deleteUserFromProject(@RequestBody Project project) throws DeleteUserException {
        int  result = projectsService.deleteUserFromProject(project);
        if (result > 0) {
            logger.info("Delete User : Successfully deleted User="+project.getUserId()+" from Project="+project.getProjectName()+ ".Sending Response");
            return ResponseEntity.status(HttpStatus.OK).body(new Project("Success"));
        }
        else {
            throw new DeleteUserException("Unable to delete user "+project.getUserId()+" from Project "+project.getProjectName());
        }
    }

    //Modify user role in  a particular project
    @PutMapping(value = {"/manage/user/modify", MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Project> modifyUserRole(@RequestBody Project project) throws ModifyUserRoleException {
        int  result = projectsService.modifyUserRole(project);
        if (result > 0) {
            logger.info("Modify User : Successfully modified User="+project.getUserId()+"'s Role for Project="+project.getProjectName()+ ".Sending Response");
            return ResponseEntity.status(HttpStatus.OK).body(new Project("Success"));
        }
        else {
            throw new ModifyUserRoleException("Unable to Modify user "+project.getUserId()+"'s Role for Project "+project.getProjectName());
        }

    }

    //Delete Project
    @DeleteMapping(value = {"/delete", MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Project> deleteProject(@RequestBody Project project) throws DeleteProjectException, FunctionDeletionException {
        int  result = projectsService.deleteProject(project);

        if (result > 0) {
            logger.info("Delete Project : Successfully  Deleted Project="+project.getProjectName()+ ".Sending Response");
            return ResponseEntity.status(HttpStatus.OK).body(new Project("Success"));
        }
        else {
            throw new DeleteProjectException("Failed to delete Project "+project.getProjectName());
        }

    }

    //List the projects tagged to the user
    @GetMapping(value = {"/listProjects"})
    public ResponseEntity<List<Project>> listProjects(@RequestParam String userId) throws ListUserProjectsException {

        List<Project>projectList = projectsService.listUserProjects(userId);
        if (projectList!=null) {
            logger.info("List Projects : Successfully  Fetched Projects for user"+userId+".Sending Response");
            return ResponseEntity.status(HttpStatus.OK).body(projectList);
        }
        else {
            throw new ListUserProjectsException("Failed to List Projects for user "+userId);
        }
    }

    //	/project/usage
     @PostMapping(value = {"/usage"})
public ResponseEntity<List<Map<String, Object>>> getProjectUsage(@RequestBody Project project) throws ProjectUsageException, IOException {
        List<Map<String, Object>> projectUsage = projectsService.getProjectUsage(project);
        if (projectUsage!=null) {
            logger.info("Projects Usage : Successfully  Fetched Project Usage for Project"+project.getProjectName()+".Sending Response");
            return ResponseEntity.status(HttpStatus.OK).body(projectUsage);
        }
        else {
            throw new ProjectUsageException("Failed to Fetch Project Usage for Project "+project.getProjectName());
        }
    }

    @GetMapping(path="/info")
    public ResponseEntity<List<Project>> getProjectInfo(@RequestParam String projectName) throws ProjectInfoException {
        List<Project> projectUsersAndRoles = projectsService.getProjectInfo(projectName);
        if (projectUsersAndRoles!=null) {
            logger.info("Projects Usage : Successfully  Fetched Project Info for Project"+projectName+".Sending Response");
            return ResponseEntity.status(HttpStatus.OK).body(projectUsersAndRoles);
        }

        else {
            throw new ProjectInfoException("Failed to Fetch Project Info for Project "+projectName);
        }
    }

//    //Handle all exceptions of endpoints
//    @ExceptionHandler(RuntimeException.class)
//    public final ResponseEntity<Exception> handleAllExceptions(RuntimeException ex) {
//        return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
//    }

}
