import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  APIUrl:string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  login(userName: string,password: string){
    let headers = this.getHeadersForLogin(userName,password);
    let Headers = { headers: headers };
    return this.http.post(this.APIUrl+"/auth/login",null,Headers)
  }

  getHeadersForLogin(userName: string,password: string){
    let headers = new HttpHeaders();
    headers  = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization','Basic ' + btoa(userName+":"+password));
    return headers;
}

getHeadersAfterLogin(){
  let headers = new HttpHeaders();
  //headers('Access-Control-Allow-Origin: *');
  //headers = headers.set('Access-Control-Allow-Origin','*');
  headers= headers.set('Accept', 'application/json');
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('token',localStorage.getItem('token')+'');
  headers = headers.set('userId',localStorage.getItem('userId')+'');
  return headers;
}

addUserToOrg(user: User){
  let headers = this.getHeadersAfterLogin();
  let Headers = { headers: headers };
  console.log("user :", user);
  console.log("headers :", Headers);
  return this.http.post(this.APIUrl+"/org/user/add",user,Headers);
}

deleteUserFromOrg(user: User){
  let headers = this.getHeadersAfterLogin();
  const requestOptions = {
    headers: headers,
    body: user
  }
  return this.http.delete(this.APIUrl+"/org/user/delete",requestOptions)
}
listUsersOfOrg(){
  let headers = this.getHeadersAfterLogin();
  let Headers = { headers: headers };  
  return this.http.get(this.APIUrl+"/org/user/list",Headers);
}

getUserRoles(){
  let headers = this.getHeadersAfterLogin();
  let Headers = { headers: headers };  
  return this.http.get(this.APIUrl+"/org/user/roles",Headers);
}

logout() {
  //localStorage.removeItem('token');
  localStorage.clear();
}


}
