// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { map } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { User } from '../_models/users';
// import { HttpHeaders } from '@angular/common/http';
// import { Post } from '../_models/post';
// import { catchError } from 'rxjs';
// import { Terminal } from '../_models/terminals';



// const httpOptions ={
//     headers: new HttpHeaders({'Content-Type':'Application/json'})
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class TerminalService {
//   //  header = {
//     //    headers: new HttpHeaders()
//       //    .set('Authorization',`Bearer ${token}` )}
      
//       Apitoken: any;

//     constructor(private http: HttpClient){}
//         getAll():Observable<Terminal[]>{
//             return this.http.get<Terminal[]>('http://vendingmachine-api.dotnet.speranzainc.net/api/terminal/get-terminals?PageNumber=1&Take=12').pipe()

//         }

//         GetHeader():any{
//           this.Apitoken = localStorage.getItem("apitoken");
//           var httpOptions = {
//             headers: new HttpHeaders({
//               'Content-Type': 'application/json',
//               'Cache-Control': 'no-cache',
//               'X-PINGOTHER': 'pingpong',
//               'apiToken': this.Apitoken,
//             })
//           };
//           return httpOptions;
//         }



    





// }



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lock } from '../_models/lock';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
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
    private userSubject: BehaviorSubject<Lock>;
    public user: Observable<Lock>;

  constructor(private http:HttpClient) { 
    this.url = environment.serverApi;
    this.userSubject = new BehaviorSubject<Lock>(JSON.parse(localStorage.getItem('listLocker')||'{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): Lock {
        return this.userSubject.value;
    }

  public login(terminalId:string){
    localStorage.clear();
    return this.http.post(this.url + "v1/login",{terminal_id:terminalId},this.httpOptions).subscribe((res:any)=>{
      if(res.code == 200){
        localStorage.setItem("terminalName",res.data.terminal.name);
        localStorage.setItem("listLocker",JSON.stringify(res.data.lockers));
        return localStorage.getItem("listLocker")
      
      }
    })
  }
}
