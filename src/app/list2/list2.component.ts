import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '../_service/user.service';
import { User } from '../_models';

import * as moment from 'moment';

@Component({ templateUrl: 'list2.component.html' })
export class List2Component implements OnInit, OnDestroy {
    users!: User[];

    myTime!: any;
    myInterval!: any;
    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);

        this.curTime()
        this.myInterval = setInterval(()=>{this.curTime()},1000)

    }
    ngOnDestroy(){
        clearInterval(this.myInterval);
    }

    encode(password:string): string{
        //let encoded:string = btoa('abc')
        //console.log(encoded);
        return btoa(password);
        
      }
    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        if (!user) return;
        user.isDeleting = true;
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }

    curTime(){
        this.myTime = moment().format("hh:mm:ss");
    }
}