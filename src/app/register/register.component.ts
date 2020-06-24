import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
hide=true;
  Register:FormGroup;
  submitted: boolean=false;
  formSumitAttempt: boolean;
constructor(
  private fb:FormBuilder,
  private apiService:ApiService,  
  private router: Router,
  private ngZone: NgZone,
  ) { }

ngOnInit() {
  this.getusers();
  this.Register = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required]]
  })
}

onSubmit() {
  const payload={
    name:this.Register.value.name,
    email:this.Register.value.email,
    password:this.Register.value.password
  }
  this.formSumitAttempt=true;
  if (!this.Register.valid) {
    return this.apiService.openSnackbar("can't be blank")
  } else {
    this.apiService.registerUser(payload).subscribe(
      (res) => {
        this.apiService.openSnackbar(res.message)
        this.ngZone.run(() => this.router.navigateByUrl('/login'))
        this.formSumitAttempt=false;

      }, (error) => {
        console.log(error);
      });
  }
}

getusers(){
  this.apiService.getUsers().subscribe(res=>{
    console.log("users",res);
  })
}

isFieldValid(field: string) {
  return (
    (!this.Register.get(field).valid && this.Register.get(field).touched) ||
    (this.Register.get(field).untouched && this.formSumitAttempt)
  );
}

}
