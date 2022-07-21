import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import * as moment from 'moment';
import { StreamState } from '../_models/stream-state';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  
  private stop$ = new Subject();
  private audioObj = new Audio();
  audioEvents =[
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadmetadata",
    "loadstart"
  ];
  private state: StreamState={
    playing: false,
    readableCurrentTime:'',
    readableDuration:'',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,

  }
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

  

  constructor() { }

 



  private streamObservable(url:any){
    return new Observable(o =>{
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
      const handler = (event: Event)=>{
        o.next(event);
      };
      this.addEvents(this.audioObj,this.audioEvents,handler);
      return()=>{
        this.audioObj.pause();
        this.audioObj.currentTime =0;
        this.removeEvents(this.audioObj, this.audioEvents, handler);
      };
    });
  }

  private addEvents(o: HTMLAudioElement, events: any[], handler: (event: Event) => void){
    events.forEach((event: any) => {
      o.addEventListener(event, handler);
    });
  }

  private removeEvents(o: HTMLAudioElement, events: any[], handler: (event: Event) => void){
    events.forEach((event: any) => {
      o.removeEventListener(event, handler);
    });
  }

  playStream(url: any){
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }


  private updateStateEvent(event: Event): void{
    switch(event.type){
      case "canplay":
        this.state.duration= this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay =true;
        break;
      case "playing":
        this.state.playing =true;
        break;
      case "pause":
          this.state.playing =false;
          break;  
      case "timeupdate":
        this.state.currentTime= this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;  
      case "error":
        this.resetState();
        this.state.error = true;
        break; 

    }
    this.stateChange.next(this.state);
  }

  private resetState(){
    this.state= {
      playing: false,
      readableCurrentTime:'',
      readableDuration:'',
      duration: undefined,
      currentTime: undefined,
      canplay:false, 
      error: false
    }
  }

 


  getState(): Observable<StreamState>{
    return this.stateChange.asObservable();
  }





  play(){
    this.audioObj.play();
  }
  stop() {
    this.stop$.next(void 0);
  }
  pause(){
    this.audioObj.pause();
  }
  seekTo(seconds: number){
    this.audioObj.currentTime=seconds;
  }

  formatTime(time: number, format: string = "HH:mm:ss"){
    const momentTime = time*1000;
    return moment.utc(momentTime).format(format);

  }







}
