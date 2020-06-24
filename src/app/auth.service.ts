import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './User';
@Injectable()
export class AuthService {
  // constructor(private myRoute: Router) { }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.email !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }

  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  // isLoggednIn() {
  //   return this.getToken() !== null;
  // }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}