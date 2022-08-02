import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string;
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-PINGOTHER': 'pingpong',
        'Server': 'Microsoft-IIS/10.0',
        'X-Powered-By': 'PHP/8.0.0',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization',
      })
    };
  constructor(private http:HttpClient) { 
    this.url = environment.apiUrl;
  }

  public login(username:string, password:string){
    localStorage.clear();
    return this.http.post(this.url + "api/auth/user-login",{Username:username, Password: password},this.httpOptions).subscribe((res:any)=>{
      if(res.code == 200){
        if(res.data.api_token !== null)
          localStorage.setItem("apitoken",res.data.api_token);
        else
          localStorage.setItem("apitoken","");
        // localStorage.setItem("username",res.data.terminal.name);
        // localStorage.setItem("fullName",JSON.stringify(res.data.lockers));
        // localStorage.setItem("lang","en");
      }
    })
  }
}
