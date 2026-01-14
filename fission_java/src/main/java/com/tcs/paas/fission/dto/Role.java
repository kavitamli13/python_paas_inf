package com.tcs.paas.fission.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Role {

    private String roleId;
    private String roleName;
    private String roleDescription;


    public String getRoleId() {
        return roleId;
    }
    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
    public String getRoleName() {
        return roleName;
    }
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    public void setRoleDescription(String roleDescription){
        this.roleDescription = roleDescription;
    }
    public String getRoleDescription(){
        return roleDescription;
    }

}
