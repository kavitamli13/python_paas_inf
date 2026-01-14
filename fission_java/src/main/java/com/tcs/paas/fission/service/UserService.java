package com.tcs.paas.fission.service;

import com.tcs.paas.fission.dto.User;
import com.tcs.paas.fission.dto.Role;
import com.tcs.paas.fission.exception.UserAlreadyExistsException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public User authenticateUser(String basicAuthString);
    public List<Role> listUserRoles();
    public  String getRoleType(String endpoint);
    public String getUserRoleId(String userId);
    public int checkPermissions(String endpoint, String roleId);
    public String getProjectRoleId(String userId, String projectName);
    public void addUserToOrg(User user) throws UserAlreadyExistsException;
    public void deleteUserFromOrg(User user);
    public List<User> getUsersList();
    public List<User> getUsersListBySearch(String firstThreeLettersOfUserId);
}
