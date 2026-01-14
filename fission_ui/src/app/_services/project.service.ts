import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project } from '../_model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  APIUrl:string = environment.apiUrl;

  constructor(private http:HttpClient)  { }

  get projectName():string{
    return this.projectName;
  }
  set projectName(val: string){
    this.projectName = val;
  }

  createProject(projectObj : Project){
    let headers = this.getHeadersAfterLogin(projectObj.projectName);
    let Headers = { headers: headers };
    return this.http.post(this.APIUrl+"/project/create",projectObj,Headers)
  }

  getProjectRoles(projectName: string){
    let headers = this.getHeadersAfterLogin(projectName);
    let Headers = { headers: headers };
    return this.http.get(this.APIUrl+"/project/roles",Headers);
  }

  addUserToProject(projectObj : Project){
    let headers = this.getHeadersAfterLogin(projectObj.projectName);
    let Headers = { headers: headers };
    console.log("Headers:",Headers);
    console.log("projectObj",projectObj);
    return this.http.post(this.APIUrl+"/project/manage/users/add",projectObj,Headers)
  }

  deleteUserFromProject(projectObj : Project){
    let headers = this.getHeadersAfterLogin(projectObj.projectName);
    let Headers = { headers: headers };
    const requestOptions = {
      headers: headers,
      body: projectObj
    }
    return this.http.delete(this.APIUrl+"/project/manage/users/delete",requestOptions)
  }

  modifyUserRole(projectObj : Project){
    let headers = this.getHeadersAfterLogin(projectObj.projectName);
    let Headers = { headers: headers };
    return this.http.put(this.APIUrl+"/project/manage/user/modify",projectObj,Headers)
  }

  deleteProject(projectObj : Project){
    let headers = this.getHeadersAfterLogin(projectObj.projectName);
    let Headers = { headers: headers };
    const requestOptions = {
      headers: headers,
      body: projectObj
    }
    return this.http.delete(this.APIUrl+"/project/delete",requestOptions)
  }

  listProjects(userId : string){
    let headers = this.getHeadersAfterLogin("");
    let Headers = { headers: headers };
    return this.http.get(this.APIUrl+"/project/listProjects?userId="+userId,Headers)
  }

  getProjectUsage(projectObj : Project){
    let headers = this.getHeadersAfterLogin(projectObj.projectName);
    let Headers = { headers: headers };
    return this.http.post(this.APIUrl+"/project/usage",projectObj,Headers)
  }

  getProjectInfo(projectName : string){
    let headers = this.getHeadersAfterLogin(projectName);
    let Headers = { headers: headers };
    return this.http.get(this.APIUrl+"/project/info?projectName="+projectName,Headers)
  }

  getHeadersAfterLogin(projectName : string){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('token',localStorage.getItem('token')+'');
    headers = headers.set('userId',localStorage.getItem('userId')+'');
    headers = headers.set("projectName",projectName);
    return headers;
  }
}
