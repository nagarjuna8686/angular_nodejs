import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url:string='http://3.12.129.191:4000/api/user';
  baseUri:string = 'http://3.12.129.191:4000/api';
  baseUrl:string = 'http://3.12.129.191:4000/api/userFile';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,private snackBar:MatSnackBar) { }

  openSnackbar(message: string) {
    return this.snackBar.open(message, "close",
      { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 1500, panelClass: ['snackbarStyle'] });
  }
  config: MatSnackBarConfig = {
    duration: 1500,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  }


  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, 'close',this.config);
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, 'close', this.config);
  }

  // Create
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getEmployee(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

// Register user
  registerUser(data:any): Observable<any> {
    return this.http.post(this.url + '/register', data).pipe(
      catchError(this.errorMgmt)
    )
  }

// Login user
  loginUser(data:any): Observable<any> {
    return this.http.post(this.url + '/login', data).pipe(
      catchError(this.errorMgmt)
    )
  }
// All Register users
  // getUsers() {
  //   return this.http.get(`${this.url}`);
  // }



// Get Users
getUsers() {
  return this.http.get(this.baseUrl)
}

// Create User
addUser(name: string, profileImage: File): Observable<any> {
  var formData: any = new FormData();
  formData.append("name", name);
  formData.append("avatar", profileImage);

  return this.http.post<User>(`${this.baseUrl}/create-user`, formData, {
    reportProgress: true,
    observe: 'events'
  })
}


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
