import { Component,OnInit } from "@angular/core";
import { TerminalService } from "src/app/_service/terminal.service";
import { Terminal } from "src/app/_models/terminals";
import { PostService } from "src/app/_service/post.service";
@Component({selector:'app-list',templateUrl:'./list.component.html'})

export class ListComponent implements OnInit{
  datas: Terminal[]=[];
posts!: any;
  constructor(private terminalS: TerminalService,private postS:PostService){

  }
  
  
  
  
  
  ngOnInit(): void {
   
    this.postS.getPosts().subscribe(res=>{
      this.posts = res;
    });
  }



  
}