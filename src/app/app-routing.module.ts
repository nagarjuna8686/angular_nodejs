import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';



const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full' },
  { path: 'edit-employee/:id', component: EmployeeEditComponent,canActivate:[AuthGuard]},
  { path: 'employees-list', component: EmployeeListComponent ,canActivate:[AuthGuard]}  ,
  { path: 'add-user', component: CreateUserComponent,canActivate:[AuthGuard] },
  { path: 'users-list', component: UserListComponent ,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  { path: 'create-employee', component: EmployeeCreateComponent,canActivate:[AuthGuard] },
  { path: '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
