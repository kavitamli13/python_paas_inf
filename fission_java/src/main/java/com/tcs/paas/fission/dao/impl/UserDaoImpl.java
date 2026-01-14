package com.tcs.paas.fission.dao.impl;

import com.tcs.paas.fission.dao.UserDao;
import com.tcs.paas.fission.dto.Role;
import com.tcs.paas.fission.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

@Component
public class UserDaoImpl implements UserDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String getPasswordHash(String userId) {
        try {
            String query = "select  password from users where userId=?";
            return jdbcTemplate.queryForObject(query, String.class, new Object[]{userId});
        }catch(EmptyResultDataAccessException e){
            return null;
        }
    }

   /* @Override
    public int authenticateUser(String userId,String password){
        String query = "select count(*) from users where userId=? and password=?";
        return jdbcTemplate.queryForObject(query,Integer.class, new Object[]{userId,password});
    } */

    @Override
    public User getUserDetails(String userId){
        //String query = "select userId,name,lastLogin from users where userId = ?";
        String query = "select t1.userId,t1.name,t1.lastLogin,t2.roleName from (select t1.userId,t1.name,t1.lastLogin,t2.roleId from users t1 join usersOrgRoles t2 where t1.userId=t2.userId) t1 join roles t2 where t1.roleId = t2.roleId and t1.userId=?";
        System.out.println(query);
        User user = jdbcTemplate.queryForObject(query,new UserMapper(),new Object[]{userId});
        System.out.println("User obj:::"+user);
        return user;
    }
    
    @Override
    public List<Role> listUserRoles(){
        String query = "select * from roles where roleName LIKE 'ORG_%'";
        return jdbcTemplate.query(query,new BeanPropertyRowMapper(Role.class));
    }
    

    @Override
    public List<User> getUsersList() {
        String query = "select t1.userId,t1.name,t1.lastLogin,t2.roleName from (select t1.userId,t1.name,t1.lastLogin,t2.roleId from users t1 join usersOrgRoles t2 where t1.userId=t2.userId) t1 join roles t2 where t1.roleId = t2.roleId";
        return jdbcTemplate.query(query,new UserMapper(),new Object[]{});
    }
    
    @Override
    public List<User> getUsersListBySearch(String firstThreeLettersOfUserId){
        String pattern = firstThreeLettersOfUserId+"%";
        String query = "select t1.userId,t1.name,t1.lastLogin,t2.roleName from (select t1.userId,t1.name,t1.lastLogin,t2.roleId from users t1 join usersOrgRoles t2 where t1.userId=t2.userId) t1 join roles t2 where t1.roleId = t2.roleId and t1.userId like '"+pattern+"'";
        return jdbcTemplate.query(query,new UserMapper(),new Object[]{});
    }

    @Override
    public void updateLastLogin(String userId, Timestamp lastLoggedIn) {
        String query = "update users set lastLogin = ? where userId = ?";
        int res = jdbcTemplate.update(query,new Object[]{lastLoggedIn,userId});
    }

    @Override
    public String getRoleType(String endpoint) {
        String  query = "select  roleType from endpointRoleType where endpoint=?";
        return jdbcTemplate.queryForObject(query, String.class, new Object[]{endpoint});
    }

    @Override
    public String getUserRoleId(String userId) {
        String query ="select roleId from usersOrgRoles where userId = ?";
        return jdbcTemplate.queryForObject(query,String.class,new Object[]{userId});
    }

    @Override
    public int checkPermissions(String endpoint, String roleId) {
        String query = "select count(*) from permissions where endpoint=? and roleId =?";
        return jdbcTemplate.queryForObject(query,Integer.class,new Object[]{endpoint,roleId});
    }

    @Override
    public String getProjectRoleId(String userId, String projectName) {
        String  query = "select roleId from projectUsers where userId = ? and projectName=?";
        return jdbcTemplate.queryForObject(query,String.class,new Object[]{userId,projectName});
    }

    @Override
    public void addUserToOrg(String userId, String name, String password,String roleId) {
        String userQuery = "insert into users(userId,name,password) values(?,?,?)";
        String roleQuery ="insert into usersOrgRoles(userId,roleId) values(?,?)";
        jdbcTemplate.update(userQuery,new Object[]{userId,name,password});
        jdbcTemplate.update(roleQuery,new Object[]{userId,roleId});
    }

    @Override
    public void deleteUserFromOrg(String userId) {
        String roleDeleteQuery = "delete from usersOrgRoles where userId=?";
        String projectUsersDeleteQuery = "delete from projectUsers where userid=?";
        String userDeleteQuery = "delete from users where userId=?";
         jdbcTemplate.update(roleDeleteQuery, new Object[]{userId});
         jdbcTemplate.update(projectUsersDeleteQuery, new Object[]{userId});
         jdbcTemplate.update(userDeleteQuery, new Object[]{userId});
    }
}



class UserMapper implements RowMapper<User> {
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setUserId(rs.getString("userId"));
        user.setName(rs.getString("name"));
        user.setLastLogin(rs.getTimestamp("lastLogin"));
        user.setOrgRole(rs.getString("roleName"));
        System.out.println("queryresult:::"+rs.getString("userId"));
        return user;
    }
}
