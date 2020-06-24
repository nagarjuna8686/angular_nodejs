import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// import { WebStorageModule } from 'ngx-store';
// import { WebStorageModule } from 'ngx-store';
import {MatTableModule} from '@angular/material/table';
// import {NgxWebstorageModule} from 'ngx-webstorage';
// import { WebStorageModule } from 'ngx-store';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { RegisterComponent } from './register/register.component';
import { ApiService } from './service/api.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { DialogService } from './service/dialog.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
// import { MatPaginatorModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    RegisterComponent,
    NavbarComponent,
    MatConfirmDialogComponent,
    PageNotFoundComponent,
    CreateUserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
     HttpClientModule ,
     MatSnackBarModule, 
     MatDialogModule,
     MatTableModule,
     MatPaginatorModule,
     MatTooltipModule,
    //  NgxWebstorageModule.forRoot(),

    // WebStorageModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  entryComponents:[MatConfirmDialogComponent],
  providers: [ApiService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
