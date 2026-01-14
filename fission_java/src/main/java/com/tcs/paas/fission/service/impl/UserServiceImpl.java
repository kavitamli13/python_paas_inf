package com.tcs.paas.fission.service.impl;

import com.tcs.paas.fission.dao.UserDao;
import com.tcs.paas.fission.dto.User;
import com.tcs.paas.fission.dto.Role;
import com.tcs.paas.fission.exception.UserAlreadyExistsException;
import com.tcs.paas.fission.service.UserService;
import com.tcs.paas.fission.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    JwtUtil jwtUtil;

    @Value("${default.users.password}")
    private  String defaultPassword;

    @Override
    public User authenticateUser(String basicAuthString){
        System.out.println("basicAuthString::"+basicAuthString+"---");
        if (basicAuthString != null && basicAuthString.toLowerCase().startsWith("basic")) {
            // Authorization: Basic sdfsdnnsdlnflnnkfklasdf=
            String base64Credentials = basicAuthString.substring("Basic".length()).trim();
            byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
            String credentials = new String(credDecoded, StandardCharsets.UTF_8);
            // credentials = username:password
            final String[] values = credentials.split(":", 2);
            String userId = values[0];
            String password = values[1];
            System.out.println("User ID::"+userId);
            System.out.println("password::"+password);
            //get passwordhash from database
            String hashedPassword = userDao.getPasswordHash(userId);
            if(hashedPassword != null && BCrypt.checkpw(password, hashedPassword)){
                User loggedUser = userDao.getUserDetails(userId);
                System.out.println("authenticateUser:::"+loggedUser);
                loggedUser.setToken(jwtUtil.generateToken(userId));
                java.sql.Timestamp sqlTime = new java.sql.Timestamp(new java.util.Date().getTime());
                userDao.updateLastLogin(userId,sqlTime);
                return  loggedUser;
            }
        }
        System.out.println("condition failed:::");
        return null;
    }
    
    @Override
    public List<Role> listUserRoles(){
        return userDao.listUserRoles();
    }

    @Override
    public List<User> getUsersList() {
       return userDao.getUsersList();
    }
    
    @Override
    public List<User> getUsersListBySearch(String firstThreeLettersOfUserId)
    {
         return userDao.getUsersListBySearch(firstThreeLettersOfUserId);
    }
    
    

    // Get Role type for Authentication & Authorization
    @Override
    public String getRoleType(String endpoint) {
        return userDao.getRoleType(endpoint);
    }

    // Get User Role Id for Authentication & Authorization
    @Override
    public String getUserRoleId(String userId) {
        return userDao.getUserRoleId(userId);
    }

    // Check Permissions for Authentication & Authorization
    @Override
    public int checkPermissions(String endpoint, String roleId) {
        return userDao.checkPermissions(endpoint,roleId);
    }

    // Get Project Role Id for Authentication & Authorization
    @Override
    public String getProjectRoleId(String userId, String projectName) {
        return userDao.getProjectRoleId(userId,projectName);
    }

    @Override
    public void addUserToOrg(User user) throws UserAlreadyExistsException {
        String generatedSecuredPasswordHash = BCrypt.hashpw(defaultPassword,BCrypt.gensalt(12));
        try {
            userDao.addUserToOrg(user.getUserId(), user.getName(), generatedSecuredPasswordHash, user.getOrgRoleId());
        }catch(DuplicateKeyException e){
            throw new UserAlreadyExistsException("UserId already Exists");
        }
    }

    @Override
    public void deleteUserFromOrg(User user) {
        userDao.deleteUserFromOrg(user.getUserId());
    }
}
