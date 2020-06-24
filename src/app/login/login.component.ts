import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
// import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService } from "ngx-store";
import { AuthService } from '../auth.service';
// import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide=true;
  Login:FormGroup;
  formSumitAttempt: boolean;
  fieldTextType: boolean;
  token: any;
  username: any;
  constructor(private fb:FormBuilder,private apiService:ApiService, 
     private router: Router, 
    //  private localStorage: LocalStorageService,
     private auth: AuthService,
    private ngZone: NgZone,
    private myRoute: Router) { }

  ngOnInit() {

    // this.localStorage.getStrategyName("username",this.username)
      console.log("username",this.username)
    // localStorage.setItem("LoggedInUser",  this.token)

    this.Login = this.fb.group({
      // name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }
  // sendToken() {
  // }

  onSubmit() {
    this.formSumitAttempt=true
    const payload={
      email:this.Login.value.email,
      password:this.Login.value.password
    }
    if (!this.Login.valid) {
      return this.apiService.warn("Invalid Credentials");
    } else {
      this.apiService.loginUser(payload).subscribe(
        (res) => {
          this.username=res.name;
          console.log("data",this.username);
          if(this.Login.valid){
          // localStorage.set('accessToken', res.data.accessToken);
          this.formSumitAttempt=false;
          // this.ngZone.run(() => this.router.navigateByUrl('/create-employee'))
          this.auth.login(this.Login.value);
          this.myRoute.navigate(["create-employee"]);
          this.apiService.success(res.message)
          }
          else {
            // this.apiService.openSnackbar('Invalid  Credentials!')
          }
        }, (error) => {
          console.log(error);
        });
    }

  }
  isFieldValid(field: string) {
    return (
      (!this.Login.get(field).valid && this.Login.get(field).touched) ||
      (this.Login.get(field).untouched && this.formSumitAttempt)
    );
  }

}
