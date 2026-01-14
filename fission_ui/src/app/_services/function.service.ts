import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Function } from '../_model/function';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  APIUrl:string = environment.apiUrl;

  constructor(private http:HttpClient)  { }

  createFunction(functionObj : Function){
    let headers = this.getHeadersAfterLogin(functionObj.projectName);
    let Headers = { headers: headers };
    return this.http.post(this.APIUrl+"/function/create",functionObj,Headers)
  }

  deployFunction(functionObj : Function){
    let headers = this.getHeadersAfterLogin(functionObj.projectName);
    let Headers = { headers: headers };
    return this.http.post(this.APIUrl+"/function/deploy",functionObj,Headers)
  }

  listFunctions(projectName : string){
    let headers = this.getHeadersAfterLogin(projectName);
    let Headers = { headers: headers };
    return this.http.get(this.APIUrl+"/function/list?projectName="+projectName,Headers)
  }

  
  getFunctionLogs(functionObj : Function){
    let headers = this.getHeadersAfterLogin(functionObj.projectName);
    let Headers = { headers: headers };
    return this.http.get(this.APIUrl+"/function/logs?projectName="+functionObj.projectName+"&functionName="+functionObj.functionName+"&since="+functionObj.timestamp+"&tail="+functionObj.limits,Headers)
  }

  getFunctionBuildLog(functionObj : Function){
    let headers = this.getHeadersAfterLogin(functionObj.projectName);
    let Headers = { headers: headers };
    return this.http.get(this.APIUrl+"/function/buildlog?projectName="+functionObj.projectName+"&functionName="+functionObj.functionName,Headers);
  }

  deleteFunction(functionObj : Function){
    let headers = this.getHeadersAfterLogin(functionObj.projectName);
    let Headers = { headers: headers };
    const requestOptions = {
      headers: headers,
      body: functionObj
    }
    return this.http.delete(this.APIUrl+"/function/delete",requestOptions)
  }

  getFunctionDescription(functionObj : Function){
    let headers = this.getHeadersAfterLogin(functionObj.projectName);
    let Headers = { headers: headers };
    return this.http.get(this.APIUrl+"/function/describe?projectName="+functionObj.projectName+"&functionName="+functionObj.functionName,Headers)
  }

/*  Update Later
  updateFunction(functionObj : Function){
    let headers = this.getHeadersAfterLogin(functionObj.projectName);
    let Headers = { headers: headers };
    return this.http.put(this.APIUrl+"/function/update",functionObj,Headers)
  }
*/

  getHeadersAfterLogin(projectName : string){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('token',localStorage.getItem('token')+'');
    headers = headers.set('userId',localStorage.getItem('userId')+'');
    headers = headers.set("projectName",projectName);
    return headers;
  }
  
}
