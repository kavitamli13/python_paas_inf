package com.tcs.paas.fission.dao;

import com.tcs.paas.fission.dto.Project;
import com.tcs.paas.fission.dto.Role;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProjectsDao
{

    int createProject(Project project);
    public List<Role> listProjectRoles();
    int checkProjectExists(String projectName);
    int addUserToProject(Project project);
    int deleteUserFromProject(Project project);
    int deleteProject(Project project);
    int modifyUserRole(Project project);
    boolean validateUserPrivilege(String requestURL,String userName,String projectName);
    String getRoleIdByUserIdAndProjectName(String userId,String projectName);
    List<String> getPermissionsByRoleId(String roleId);
    List<Map<String, Object>> listUserProjects(String userId);
    List<Map<String,Object>> getProjectUsage(Project project);
    List<Map<String,Object>> getProjectInfo(String projectName);
    int checkUserExistsInProject(String projectName,String userId);
}
