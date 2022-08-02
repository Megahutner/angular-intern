import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  //  headers = {
  //   headers: new HttpHeaders()
  //     .set('Authorization',   `Bearer${}`)
  // }

  
 
  private terminalUrl='http://vendingmachine-api.dotnet.speranzainc.net/api/terminal/get-terminals?PageNumber=1&Take=10';
  constructor(private httpClient: HttpClient) { }
  
  
  getPosts(){
    return this.httpClient.get(this.url);
  }
  getTerminals(){
    return this.httpClient.get(this.terminalUrl);

  }
  
}