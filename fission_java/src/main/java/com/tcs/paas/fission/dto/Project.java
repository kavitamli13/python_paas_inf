package com.tcs.paas.fission.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.sql.Timestamp;
import java.util.Date;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Project
{
    private String message;
    //Create Project
    private String projectName;
    private Timestamp createdTime;

    private Timestamp startTime;
    private Timestamp endTime;
    private String projectRoleName;

     //Add/modify/delete user to Project
    private String userId;
    private String name;
    private String roleId;
    
    public int getTimeInterval() {
        return timeInterval;
    }

    public void setTimeInterval(int timeInterval) {
        this.timeInterval = timeInterval;
    }

    private int timeInterval;
    public String getName(){
        return name;
    }

    public void setName(String name){
       this.name = name;
    }
    
    public void setProjectRoleName(String projectRoleName)
    {
        this.projectRoleName = projectRoleName;
    }
    
    
    public String getProjectRoleName()
    {
        return this.projectRoleName;
    }



    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

   
    public Project(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }

    public Project(String projectName, Timestamp createdTime) {
        this.projectName = projectName;
        this.createdTime = createdTime;
    }

    public String getProjectName() {
        return projectName;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public Project() {
    }


}
