import { Component, OnInit } from '@angular/core';
import { first, Observable, ReplaySubject } from 'rxjs';
import { AccountService } from 'src/app/_service/account.service';
import names from 'src/app/name.json'
import { User } from 'src/app/_models/users';
import { UserService } from 'src/app/_service/user.service';
//import { userss } from 'src/app/_models/users';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Post } from 'src/app/_models/post';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {//implements OnInit {


  dataSource: Post[] =[];
  users: User[] = [];
  
  displayedColumns:string[]=['id','title']
  //displayedColumns: string[]=['username','password','fullname','address','date_of_birth'];
  //dataToDisplay=[...ELEMENT_DATA];
  //dataSource = new ExampleDataSource(this.dataToDisplay);

  //public nameList:{username: string,password: string,fullname: string, address: string, date_of_birth: Date }[]= names;

  //public nameList1:{username: string,password: string,fullname: string, address: string, Age: number }[]= userss;
  //users: any;
  
  
  encode(password:string): string{
    //let encoded:string = btoa('abc')
    //console.log(encoded);
    return btoa(password);
    
  }

  

  encode1(){
    console.log(btoa("abc"));
  }

  userss = null;
  constructor(private accountS : AccountService, private userS: UserService) { }

  ngOnInit(): void {
    this.accountS.getAll().subscribe((data: Post[])=>{
      this.dataSource=data;
      console.log(this.dataSource);
    })
      
  }

  //deleteUser(Username:string){
    //this.accountS.delete(Username).subscribe(res =>{
      //this.users = this.users.filter(item => item.Username !==Username);
      //console.log("Post deleted successfully!");
  deletePost(id: number){
    this.accountS.delete(id).subscribe(res =>{
      this.dataSource = this.dataSource.filter(item => item.id !==id);
      console.log("Post deleted successfully!");
    })
  //}

  //ngOnInit() {
   // this.userS.getAll().pipe(first()).subscribe(users => this.users = users);
  //}
  //deleteUser(username: string){
    //const user = this.users.find( (x:any)=> x.username === username);
    //user.isDeleting = true;
    //this.accountS.delete(username).pipe(first()).subscribe(()=> this.users = this.users.filter((x: any)=> x.username !==username))
  //}



    //} )}
}}
