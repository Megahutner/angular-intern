import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import { MatCardModule} from '@angular/material/card'
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule} from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule} from '@angular/material/icon';
import { ListComponent } from './_function/list/list.component'
import { AddEditComponent } from './_function/add-edit/add-edit.component';
import { DeleteComponent } from './_function/delete/delete.component';
import { AddComponent } from './_function/add/add.component';
import { EditComponent } from './_function/edit/edit.component';
import { ViewComponent } from './_function/view/view.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { List2Component } from './list2/list2.component';
import { fakeBackendProvider } from './_helpers';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DxDataGridModule, DxButtonModule, DxSelectBoxModule, DxPopupModule,DxTemplateModule } from 'devextreme-angular';
import { DxDataGridComponent, DxPopupComponent } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';







@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddEditComponent,
    DeleteComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    List2Component,
    HeaderComponent,
    FooterComponent,
    
   
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatToolbarModule,MatPaginatorModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    MatSidenavModule,
    DxPopupModule,DxTemplateModule,FontAwesomeModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
