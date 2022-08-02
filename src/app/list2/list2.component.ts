import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '../_service/user.service';
import { User} from '../_models/users';
import { states} from '../_models';
import { PostService } from '../_service/post.service';
import  { State } from '../_models';
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
import query from 'devextreme/data/query';
import value from 'globalize';
import { TerminalService } from '../_service/terminal.service';
import { Lock } from '../_models/lock';

@Component({ templateUrl: 'list2.component.html', styleUrls: ['./list2.component.css'] },
)
export class List2Component implements OnInit, OnDestroy {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    faXmark  =faXmark;
    locks: any;
    users!: User[];
    selectedItemKeys: any[] = [];
    states!:State[];
    hide = true;
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
store: ArrayStore;
    showPass: boolean = false;
    groupingValue!: any[];
    totalCount!: number;
    expanded: boolean= true;

    options: string[];
    showFilterRow: boolean;
    showHeaderFilter: boolean;
    currentFilter: any;
    posts!: any;
    terminals!: any;

    myTime!: any;
    //datasource: DataSource;
    myInterval!: any;
    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public userService: UserService,
        private alertService: AlertService,
        private postS: PostService,
        private terS: TerminalService) { this.showHeaderFilter =true;
            this.options =['','IT','BA'];
            this.showFilterRow = true;
            this.store = new ArrayStore({
                key: 'id',
                data: this.users,
              
            });
            this.states = states;
        //this.totalCount= this.getGroupCount('option');

            this.groupingValue=[{
              value: 'option',
              text:'Grouping by occupation'
            }];


            this.locks=this.terS.userValue;
            //this.datasource=this.locks
          
    }
    getGroupCount(groupField:any){
      return query(this.users).groupBy(groupField).toArray().length;
    }
    groupChanged(e:any){
      this.dataGrid.instance.clearGrouping();
      this.dataGrid.instance.columnOption(e.value, 'groupIndex',0);
      this.totalCount=this.getGroupCount(e.value);
   }
    collapseAllClick(e:any){
     this.expanded = !this.expanded;

    }
    refreshDataGrid(e:any){
      this.dataGrid.instance.refresh();
    }


    ngOnInit() {
      this.terS.login("dv0itiUzqkIxocClzIB7")
      
        //  this.userService.getAll()
        //      .pipe(first())
        //      .subscribe(users => this.users = users);

        // this.curTime()
        // this.myInterval = setInterval(()=>{this.curTime()},1000)
        // var temp = localStorage.getItem("user");
        // if(temp){
        //     this.users = JSON.parse(temp);
        // }


          this.postS.getPosts().subscribe(res=>{
            this.posts = res;
           console.log(this.posts)
          });
         //this.postS.getTerminals().subscribe(res1=>{
         // this.terminals =res1;
         // console.log(this.terminals.status)
         //})
      //  console.log(this.locks)

      console.log(this.locks)

      
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

    onRowUpdated(e:any){ //edit
        console.log(123)
       var temp = JSON.stringify(this.users) 
       localStorage.setItem("user",temp);
    }
    onRowRemoved(e:any){ //delete
        console.log(123)
        var temp = JSON.stringify(this.users) 
        localStorage.setItem("user",temp);
    }
    //onRowExpanding(e:any){
     //   var temp1 = JSON.stringify(this.users) 
       // localStorage.setItem("user",temp1);
    //}
    onRowInserted(e:any){ //add
        console.log(123)
        var temp = JSON.stringify(this.users) 
        localStorage.setItem("user",temp);
    }
   // onSaved(e:any){
     // console.log(1)
      //var temp = JSON.stringify(this.users)
      //localStorage.setitem("user",temp);
   // }
   // onSaving(e:any){
     // console.log(12)
     // var temp = JSON.stringify(this.users)
      //localStorage.setitem("user",temp); 
   // }
}


