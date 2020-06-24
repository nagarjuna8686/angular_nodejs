import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { LocalStorageService } from 'ngx-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-dream-app';
  logggin:  boolean;
  isLoggedIn$: Observable<boolean>;
  constructor(private router:Router,
    // private ls:LocalStorageService
    private auth:AuthService
    ){}

  ngOnInit(){
// this.logggin=this.auth.isLoggednIn;
this.isLoggedIn$ = this.auth.isLoggedIn; 
  }
}
