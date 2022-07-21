import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/users';
import { HttpHeaders } from '@angular/common/http';
import { Post } from '../_models/post';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private api ='https://jsonplaceholder.typicode.com/posts/'
  private apiUrlDelete ='https://jsonplaceholder.typicode.com/delete/1'
  private apiget='http://localhost:4200/api/'
  private demoapi ='https://my-json-server.typicode.com/Megahutner/demo/posts'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;


  constructor(private router: Router, private http: HttpClient ) {
     this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')||'{}'));
    this.user = this.userSubject.asObservable();
   }
  public get userValue(): User{
    return this.userSubject.value;
  } 
  getAll(): Observable<Post[]>{
    return this.http.get<Post[]>(this.demoapi).pipe(catchError(this.errorHandler))
    
  }
  //getByUsername(username: string){
   // return this.http.get<User>('${environment.apiUrl}/users/${username}');
  //}
 // update(username:string, params:any){
   // return this.http.put('${environment.apiUrl}/users/${username}',params).pipe(map(x => {

     // if ( username == this.userValue.Username){
       // const user ={... this.userValue, ...params};
        //localStorage.setItem('user',JSON.stringify(user));
        //this.userSubject.next(user);
      //}
      //return x;
    //}));

  //} 
  create(post:any): Observable<Post>{
    return this.http.post<Post>(this.demoapi, JSON.stringify(post),this.httpOptions).pipe(catchError(this.errorHandler))

  }
  update(id:any, post:any):Observable<Post>{
    return this.http.put<Post>(this.demoapi + id, JSON.stringify(post),this.httpOptions).pipe(catchError(this.errorHandler))


  }
  find(id: any): Observable<Post>{
    return this.http.get<Post>(this.demoapi + id).pipe(catchError(this.errorHandler))
  }

  //delete(Username:string){
    //return this.http.delete<Post>(this.api + Username, this.httpOptions).pipe(catchError(this.errorHandler));
  //}

 


  
  delete(id:any){
    return this.http.delete<Post>(this.demoapi + id, this.httpOptions).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: { error: { message: string; }; }){
    let errormsg ='';
    if (error.error instanceof ErrorEvent){
      errormsg = error.error.message;
    } else {
      errormsg ='Error Code: ${error.status}\nMessage: ${error.message}';

    }
    return throwError(errormsg);
    
  }

}
