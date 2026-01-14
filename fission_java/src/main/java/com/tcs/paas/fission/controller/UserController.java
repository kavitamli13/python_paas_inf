package com.tcs.paas.fission.controller;

import com.tcs.paas.fission.dto.User;
import com.tcs.paas.fission.dto.Role;
import com.tcs.paas.fission.exception.UserAlreadyExistsException;
import com.tcs.paas.fission.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {


    @Autowired
    UserService userService;

//    @PostMapping(value = "/auth/login")
    @RequestMapping(value = "/auth/login", method = RequestMethod.POST)
    public ResponseEntity<User> authenticateUser(HttpServletRequest request){
        System.out.println("Inside controller:::"+request.getHeader("Authorization")+"---");
        String  basicAuthString = request.getHeader("Authorization");
        System.out.println("Basic Auth "+basicAuthString);
        //Basic YWRtaW46aGpzaGNlaGk=
        User user = userService.authenticateUser(basicAuthString);
        if(user != null){
            System.out.println("user is not null::"+user.getUserId());
            return  ResponseEntity.status(HttpStatus.OK).body(user);
        }
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }
    
    @GetMapping(value = "/org/user/roles")
    public ResponseEntity<List<Role>> listUserRoles(){
       List<Role> userRoles =  userService.listUserRoles();
       return ResponseEntity.status(HttpStatus.OK).body(userRoles);
    }

    
    @PostMapping(value = "/org/user/add")
    public ResponseEntity<Void> addUserToOrg(@RequestBody User user) throws UserAlreadyExistsException {
       userService.addUserToOrg(user);
       return ResponseEntity.status(HttpStatus.OK).build();
    }
    @DeleteMapping(value = "/org/user/delete")
    public ResponseEntity<Void> deleteUserFromOrg(@RequestBody User user) {
        userService.deleteUserFromOrg(user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(value = "/org/user/list")
    public ResponseEntity<List<User>> getUsersList() {
         List<User> users =  userService.getUsersList();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
    
    //Search based on 3 first letters
    @GetMapping(value = "/org/search/user")
    public ResponseEntity<List<User>> getUsersListBySearch(@RequestParam String pattern) {
         List<User> users =  userService.getUsersListBySearch(pattern);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
    

    // Get Role type for Authentication & Authorization
    public String getRoleType(String  endpoint){
        return userService.getRoleType(endpoint);
    }

    // Get User Role Id for Authentication & Authorization
    public String getUserRoleId(String userId) {
        return userService.getUserRoleId(userId);
    }

    // Check Permissions for Authentication & Authorization
    public int checkPermissions(String endpoint, String roleId) {
        return userService.checkPermissions(endpoint,roleId);
    }

    // Get Project Role Id for Authentication & Authorization
    public String getProjectRoleId(String userId, String projectName) {
        return userService.getProjectRoleId(userId,projectName);
    }



}
