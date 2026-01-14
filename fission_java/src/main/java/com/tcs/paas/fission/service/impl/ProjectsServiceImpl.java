package com.tcs.paas.fission.service.impl;

import com.tcs.paas.fission.dao.ProjectsDao;
import com.tcs.paas.fission.dto.Function;
import com.tcs.paas.fission.dto.Project;
import com.tcs.paas.fission.dto.Role;
import com.tcs.paas.fission.exception.*;
import com.tcs.paas.fission.service.FunctionsService;
import com.tcs.paas.fission.service.ProjectsService;
import com.tcs.paas.fission.util.ProjectServiceFileHandling;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL; 
import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.io.IOException;


@Service
public class ProjectsServiceImpl implements ProjectsService {
    @Autowired
    ProjectsDao projectsDAO;

    @Autowired
    ProjectServiceFileHandling fileHandling;

    @Autowired
    FunctionsService functionsService;

    @Value("${fission.projects.path}")
    String projectRootPath;

    @Value("${prometheus.host}")
    String prometheusHost;
    
    @Value("${prometheus.port}")
    String prometheusPort;

    private Project responseProjectObject = null;
    private List<Project> projects = null;

    private static final Logger logger = LoggerFactory.getLogger(ProjectsServiceImpl.class);

    @Override
    public int createNewProject(Project project) throws ProjectExistsException {

        // Check Project already exists or not
        int checkProjectExists = projectsDAO.checkProjectExists(project.getProjectName());
        if(checkProjectExists>0)
        {
            logger.error("Project name already exists");
            throw new ProjectExistsException("Project name already exists");
        }
        else
        {

            int rows =  projectsDAO.createProject(project);
            int directoryCreated = fileHandling.createDirectory(new File(projectRootPath+"/"+project.getProjectName()));
            return (rows & directoryCreated);
        }
    }
    
    
    @Override
    public List<Role> listProjectRoles(){
      return projectsDAO.listProjectRoles();
    }
     
    
    
    @Override //check if user and project exists
    public int addUserToProject(Project project) throws UserAddException {
      
      int validateUser = projectsDAO.checkUserExistsInProject(project.getProjectName(),project.getUserId());
        if(validateUser>0)
        {
            throw new UserAddException("User already exists in the Project");
        }
        
        int rows = projectsDAO.addUserToProject(project);
        if (rows > 0) {
            return rows;
        } else {
            throw new UserAddException("Failed to add user");

        }
    }

    @Override
    public int modifyUserRole(Project project) throws ModifyUserRoleException {
        int rows = projectsDAO.modifyUserRole(project);
        if (rows > 0) {
            return rows;
        }
        else
        {
            throw new ModifyUserRoleException("Failed to modify user role");
        }
    }

    @Override //Check user and project exists
    public int deleteUserFromProject(Project project) throws DeleteUserException {
        int rows =  projectsDAO.deleteUserFromProject(project);
        if(rows>0)
        {
            return rows;
        }
        else
        {
            throw new DeleteUserException("Failed to Delete User");
        }
    }

    @Override
    public int deleteProject(Project project) throws DeleteProjectException, FunctionDeletionException {
            //Delete all functions
        List<Function> functions = functionsService.listFunctions(project.getProjectName());
       if(functions != null)
       {
                       for(Function function : functions)
            {
                functionsService.deleteFunction(function);
            }
        }





        int rows = projectsDAO.deleteProject(project);
        boolean directoryDeleted = fileHandling.deleteDir(new File(projectRootPath+"/"+project.getProjectName()));
        System.out.println(rows+" "+directoryDeleted);
        if (rows > 0 & directoryDeleted)
        {
            return rows;
        }
        else
        {
            throw  new DeleteProjectException("Failed to delete Project");
        }
    }

    @Override
    public List<Project> listUserProjects(String userId) throws ListUserProjectsException {
        List<Project> projects = new ArrayList<>();
        List<Map<String, Object>> projectsList = projectsDAO.listUserProjects(userId);
        if (projectsList != null) {
            for (Map<String, Object> mapObject : projectsList) {
                responseProjectObject = new Project();
                responseProjectObject.setProjectName((String)mapObject.get("projectName"));
                responseProjectObject.setProjectRoleName((String)mapObject.get("roleName"));
                projects.add(responseProjectObject);
            }
            return projects;
        }
        else
        {
            throw new ListUserProjectsException("Failed to get user Projects");
        }
    }

    @Override
    public List<Map<String, Object>> getProjectUsage(Project project) throws ProjectUsageException, IOException {
        Map<String, Object> functionUsage= null;
        List<Map<String, Object>> functionsUsage = new ArrayList<>();

        List<Function> functions = functionsService.listFunctions(project.getProjectName());
        if(project.getTimeInterval()==0)
        {
            project.setTimeInterval(1000);
        }
        
        if(functions!=null)
        {
            for(Function function : functions)
            {
                functionUsage= new HashMap<>();
                functionUsage.put("functionName",function.getFunctionName());
                functionUsage.put("usage",getFunctionUsage(project.getProjectName()+"-"+function.getFunctionName()+"-service",1000));
                functionsUsage.add(functionUsage);
            }
        }

        else
        {
            throw new ProjectUsageException("Failed to get Project Usage");
        }
        return functionsUsage;
    }

    @Override
    public List<Project> getProjectInfo(String projectName) throws ProjectInfoException {
        List<Map<String, Object>> usersAndRoles = projectsDAO.getProjectInfo(projectName);
        projects = new ArrayList<>();
        if (usersAndRoles != null) {
            for (Map<String, Object> mapObject : usersAndRoles) {
                responseProjectObject = new Project();
                responseProjectObject.setUserId((String)mapObject.get("userId"));
                responseProjectObject.setRoleId((String)mapObject.get("roleId"));
                responseProjectObject.setName((String)mapObject.get("name"));                               
                responseProjectObject.setProjectRoleName((String)mapObject.get("roleName"));
                projects.add(responseProjectObject);
            }
            return projects;
        }
        else
        {
            throw new ProjectInfoException("Failed to get Project Info");
        }
    }
    
    @Override
    public Object getFunctionUsage(String functionName,int timeInterval) throws IOException {
     String url = "http://"+prometheusHost+":"+prometheusPort+"/api/v1/query?query=rate(gateway_functions_seconds_sum{function_name='"+functionName+"'}["+timeInterval+"s])/rate(gateway_functions_seconds_count{function_name='"+functionName+"'}["+timeInterval+"s])";
     //System.out.println(url);
     URL obj = new URL(url);
     HttpURLConnection con = (HttpURLConnection) obj.openConnection();
     con.setRequestMethod("GET");
     con.setRequestProperty("User-Agent", "Mozilla/5.0");
     int responseCode = con.getResponseCode();
     //System.out.println("Sending 'GET' request to URL : " + url);
     //System.out.println("Response Code : " + responseCode);
     BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
     String inputLine;
     StringBuffer response = new StringBuffer();
     while ((inputLine = in.readLine()) != null) {
     	response.append(inputLine);
     }
     in.close();
     //System.out.println("Response="+response);

    /* {
            "status": "success",
                "data": {
            "resultType": "vector",
                    "result": [
            {
                "metric": {
                "function_name": "figlet",
                        "instance": "10.0.1.73:8082",
                        "job": "gateway"
            },
                "value": [
                1606978476.491,
                        "0.0029889941999999997"
                ]
            }
        ]
        }
        } */
        
      JSONObject myResponse = new JSONObject(response.toString());
      //System.out.println(myResponse.getJSONObject("data"));
      //System.out.println(myResponse.getJSONObject("data").getJSONArray("result"));
      //System.out.println(myResponse.getJSONObject("data").getJSONArray("result").getJSONObject(0));
      //System.out.println(myResponse.getJSONObject("data").getJSONArray("result").getJSONObject(0).getJSONArray("value"));
      //System.out.println(myResponse.getJSONObject("data").getJSONArray("result").getJSONObject(0).getJSONArray("value").get(1));
      Object value = 0;
      try{
          value = myResponse.getJSONObject("data").getJSONArray("result").getJSONObject(0).getJSONArray("value").get(1);
          if(value.equals("NaN")){
            return 0;
        }
      }
      catch(Exception e) //Catch when funtion is not yet invoked
      {
          e.printStackTrace();
          return value;
      }
      
      //float data = (float)myResponse.getJSONObject("data").getJSONArray("result").getJSONObject(0).getJSONArray("value").getJSONObject(1);
      return value;

    }
}
