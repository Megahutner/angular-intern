import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  myTime!: any;
    myInterval!: any;
    ngOnInit(){
      this.curTime()
      this.myInterval = setInterval(()=>{this.curTime()},1000)
    }



    ngOnDestroy(){
      clearInterval(this.myInterval)
    }




  curTime(){
    this.myTime = moment().format("hh:mm:ss");
}
  
    }
