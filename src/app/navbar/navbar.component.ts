import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  islogged: boolean =false;
username:any
  constructor(private auth:AuthService,private service:ApiService) { }

  ngOnInit(): void {
   this.username= localStorage.getItem("userName")
   console.log("hiii",this.username);
  }

  logout() {
    this.auth.logout();
    this.service.openSnackbar("Logout Succsessfully");
  }
 
}
