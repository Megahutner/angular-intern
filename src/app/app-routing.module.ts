import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './_function/add-edit/add-edit.component';
import { AddComponent } from './_function/add/add.component';
import { DeleteComponent } from './_function/delete/delete.component';
import { EditComponent } from './_function/edit/edit.component';
import { ListComponent } from './_function/list/list.component';
import { ViewComponent } from './_function/view/view.component';
import { List2Component } from './list2/list2.component';

const routes : Routes =[
  {path: '', component : List2Component

  },
  {path:'add',component :AddEditComponent},
  {path:'edit/:id',component :AddEditComponent},
  {path:'view/:id',component :ViewComponent},

  {path:'delete',component : DeleteComponent},


  {path:'**', redirectTo: ''}

  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
