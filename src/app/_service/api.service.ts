import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


const localUrl='assets/data/list.json';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClientModule) { }
}
