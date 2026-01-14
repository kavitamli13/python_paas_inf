package com.tcs.paas.fission.dao;

import com.tcs.paas.fission.dto.User;
import com.tcs.paas.fission.dto.Role;

import java.sql.Timestamp;
import java.util.List;

public interface UserDao {

    public String getPasswordHash(String userId);

   /* public int authenticateUser(String userId, String password);*/

    public User getUserDetails(String userId);

    public void updateLastLogin(String userId, Timestamp lastLoggedIn);

    public String getRoleType(String endpoint);

    public String getUserRoleId(String userId);

    public int checkPermissions(String endpoint, String roleId);

    public String getProjectRoleId(String userId, String projectName);

    public void addUserToOrg(String userId,String password,String name,String roleId);

    public void deleteUserFromOrg(String userId);

    public List<User> getUsersList();
    
    public List<User>  getUsersListBySearch(String firstThreeLettersOfUserId);
    
    public List<Role> listUserRoles();
}
