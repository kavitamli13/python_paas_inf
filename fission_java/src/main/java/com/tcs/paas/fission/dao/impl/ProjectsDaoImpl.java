package com.tcs.paas.fission.dao.impl;

import com.tcs.paas.fission.dao.ProjectsDao;
import com.tcs.paas.fission.dto.Project;
import com.tcs.paas.fission.dto.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.dao.EmptyResultDataAccessException;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
//new Timestamp(System.currentTimeMillis())
@Component
public class ProjectsDaoImpl implements ProjectsDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ProjectsDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int checkProjectExists(String projectName)
    {
        String query = "select count(*) from projects where projectName=?";
        try
        {
            int rows = jdbcTemplate.queryForObject(query,new Object[]{projectName},Integer.class);
            return rows;

        }
        catch (EmptyResultDataAccessException e)
        {
            return 0;
        }
    }
    
    @Override
    public int checkUserExistsInProject(String projectName,String userId)
    {
                String query = "select * from projectUsers where projectName=? and userId=?";
        try
        {
            int rows = jdbcTemplate.queryForObject(query,new Object[]{projectName,userId},Integer.class);
            return rows;

        }
        catch (EmptyResultDataAccessException e)
        {
            return 0;
        }
    }

    @Override
    public int createProject(Project project) {
        String sql = "insert into projects values(?,?)";
        Object[] args = new Object[]{project.getProjectName(), new Timestamp(System.currentTimeMillis())};
        return jdbcTemplate.update(sql,args);
    }

    @Override
    public int addUserToProject(Project project) {
        String sql = "insert into projectUsers(projectName,userId,roleId) values(?,?,?)";
        Object[] args =  new Object[]{project.getProjectName(),project.getUserId(),project.getRoleId()};
        System.out.println("ProjectName"+project.getProjectName());
        System.out.println("UserId"+project.getUserId());
        System.out.println("RoleId"+project.getRoleId());
        return jdbcTemplate.update(sql,args);
    }

    @Override
    public int deleteUserFromProject(Project project) {

        String sql = "delete from projectUsers where projectName=? and userId=?";
        Object[] args =  new Object[]{project.getProjectName(),project.getUserId()};
        return jdbcTemplate.update(sql,args);
    }

    @Override
    public int deleteProject(Project project) {
        int rows = 0;
        String sql_ProjectUsersTable = "delete from projectUsers where projectName=?";
        Object[] args_ProjectUsersTable =  new Object[]{project.getProjectName()};

        String sql_ProjectsTable = "delete from projects where projectName=?";
        Object[] args_ProjectsTable =  new Object[]{project.getProjectName()};

        rows += jdbcTemplate.update(sql_ProjectUsersTable,args_ProjectUsersTable);

        rows += jdbcTemplate.update(sql_ProjectsTable,args_ProjectsTable);


        return  rows-1;
    }
    
    @Override
    public List<Role> listProjectRoles(){
       String query = "select * from roles where roleName LIKE 'PROJECT_%'";
        return jdbcTemplate.query(query,new BeanPropertyRowMapper(Role.class));
    }
    

    @Override
    public int modifyUserRole(Project project) {
        String sql = "update projectUsers set roleId=? where projectName=? and userId=?";
        Object[] args =  new Object[]{project.getRoleId(),project.getProjectName(),project.getUserId()};
        return jdbcTemplate.update(sql,args);
    }

    @Override
    public List<Map<String, Object>> listUserProjects(String userId) {
        //String sql = "select projectName from projectUsers where userId=?";
        String sql = "select t1.projectName,t2.roleName from projectUsers t1 join roles t2 where t1.userId=? and t1.roleId = t2.roleId";
        Object[] args =  new Object[]{userId};
        return jdbcTemplate.queryForList(sql,args);
    }

    @Override
public List<Map<String,Object>> getProjectUsage(Project project) {
        String sql = "select functionName,runTime from functions where projectName=? and createdTime >= ? and createdTime <=?";
        Object[] args =  new Object[]{project.getProjectName(),project.getStartTime(),project.getEndTime()};
        return jdbcTemplate.queryForList(sql,args);
    }

    @Override
    public List<Map<String,Object>> getProjectInfo(String projectName)
    {
       // String sql = "select userId,roleId from projectUsers where projectName=?";
      String sql =  "select ot1.userId,ot1.name,ot1.roleId,ot2.roleName from (select t1.userId,t2.name,t1.roleId from projectUsers t1 join users t2  where t1.userId=t2.userId and projectName=?) ot1 join roles ot2 where ot1.roleId=ot2.roleId";
        Object[] args =  new Object[]{projectName};
        return jdbcTemplate.queryForList(sql,args);
    }

    @Override
    public String getRoleIdByUserIdAndProjectName(String userId,String projectName)
    {
        String sql = "select roleId from projectUsers where userId = ? and projectName = ? ";
        Object[] args =  new Object[]{userId,projectName};
        String roleId = (String) jdbcTemplate.queryForObject(sql, args, String.class);
        return roleId;
    }

    @Override
    public List<String> getPermissionsByRoleId(String roleId)
    {
        String sql = "select permission from permissions where roleId = ?";
        Object[] args =  new Object[]{roleId};
        return  (List<String>) jdbcTemplate.queryForObject(sql, args, List.class);
    }

    @Override
    public boolean validateUserPrivilege(String requestURL,String userId,String projectName)
    {

        String userRoleInProject = getRoleIdByUserIdAndProjectName(userId,projectName);
        List<String> permissions = getPermissionsByRoleId(userRoleInProject);
        if(permissions.contains(requestURL))
        {
            return true;
        }

        return false;
    }




}
