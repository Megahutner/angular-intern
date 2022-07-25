import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '../_service/user.service';
import { User} from '../_models/users';
import notify from 'devextreme/ui/notify'
import { faFilm, faXmark, faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { faBitcoin,faAdversal } from '@fortawesome/free-brands-svg-icons';
import{FaSymbol} from '@fortawesome/fontawesome-svg-core'
import{} from '@fortawesome/free-regular-svg-icons'
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/app/_service/alert.service';
import { MustMatch } from 'src/app/_helpers';
import { Options } from 'src/app/_models/options';
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
@Component({ templateUrl: 'list2.component.html', styleUrls: ['./list2.component.css'] },
)
export class List2Component implements OnInit, OnDestroy {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    faXmark  =faXmark;
    users!: User[];

    selectedItemKeys: any[] = [];
    hide = true;
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
store: ArrayStore;
    showPass: boolean = false;

    options: string[];
    showFilterRow: boolean;
    showHeaderFilter: boolean;
    currentFilter: any;

    myTime!: any;
    myInterval!: any;
    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public userService: UserService,
        private alertService: AlertService) { this.showHeaderFilter =true;
            this.options =['','IT','BA'];
            this.showFilterRow = true;
            this.store = new ArrayStore({
                key: 'id',
                data: this.users,
              
            });
    }

    ngOnInit() {
      //  this.userService.getAll()
        //    .pipe(first())
          //  .subscribe(users => this.users = users);

        this.curTime()
        this.myInterval = setInterval(()=>{this.curTime()},1000)
        var temp = localStorage.getItem("user");
        if(temp){
            this.users = JSON.parse(temp);
        }
    }
    ngOnDestroy(){
        clearInterval(this.myInterval);
    }

    encode(password:string): string{
        //let encoded:string = btoa('abc')
        //console.log(encoded);
        return btoa(password);
        
      }
   //deleteUser(id: string) {
     //   const user = this.users.find(x => x.id === id);
       // if (!user) return;
        //user.isDeleting = true;
        //this.userService.delete(id)
         //   .pipe(first())
           // .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    //}

    curTime(){
        this.myTime = moment().format("hh:mm:ss");
    }
    helloWorld() {
        notify('Hello world!');
    }
    contentReady(e:any) {
        if (!e.component.getSelectedRowKeys().length) { e.component.selectRowsByIndexes(0); }
      }
    
      selectionChanged(e:any) {
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
      }
      selectStatus(data:any) {
        if (data.value == 'All') {
          this.dataGrid.instance.clearFilter();
        } else {
          this.dataGrid.instance.filter(['Task_Status', '=', data.value]);
        }
        //selectOption(data){
          //  this.dataGrid.instance.instance.filter({'Option_Status','=',data.value})
        //}
      }
    updateUser() {
        this.userService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(() => {
            
                this.router.navigate(['../'], { relativeTo: this.route });
            })
            .add(() => this.loading = false);
    }

    onRowUpdated(e:any){
        console.log(123)
       var temp = JSON.stringify(this.users) 
       localStorage.setItem("user",temp);
    }
    onRowRemoved(e:any){
        console.log(123)
        var temp = JSON.stringify(this.users) 
        localStorage.setItem("user",temp);
    }
    //onRowExpanding(e:any){
     //   var temp1 = JSON.stringify(this.users) 
       // localStorage.setItem("user",temp1);
    //}
    onRowInserted(e:any){
        console.log(123)
        var temp = JSON.stringify(this.users) 
        localStorage.setItem("user",temp);
    }
}