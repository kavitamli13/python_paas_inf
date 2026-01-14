package com.tcs.paas.fission.service;

import com.tcs.paas.fission.dto.Project;
import com.tcs.paas.fission.dto.Role;
import com.tcs.paas.fission.exception.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.io.IOException;

@Service
public interface ProjectsService {
     int createNewProject(Project project) throws ProjectCreationException, ProjectExistsException;
     public List<Role> listProjectRoles();
     int addUserToProject(Project project) throws UserAddException;
     int deleteUserFromProject(Project project) throws DeleteUserException;
     int deleteProject(Project project) throws DeleteProjectException, FunctionDeletionException;
     int modifyUserRole(Project project) throws ModifyUserRoleException;
     List<Project> listUserProjects(String userId) throws ListUserProjectsException;
     List<Map<String, Object>> getProjectUsage(Project project) throws ProjectUsageException, IOException;
     List<Project> getProjectInfo(String projectName) throws ProjectInfoException;
     Object getFunctionUsage(String functionName,int timeInterval) throws IOException;
}
