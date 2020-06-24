import { Component, OnInit ,ViewChild} from '@angular/core';
import { ApiService } from './../../service/api.service';
import { DialogService } from 'src/app/service/dialog.service';
import { MatTableDataSource} from '@angular/material/table';
// import { MatTableDataSource,MatPaginator,MatSort } from '@angular/material'; 
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { async } from '@angular/core/testing';

export interface PeriodicElement {
  Employee_ID: string;
  Name: string;
  Email: string;
  Designation: string;
  PhoneNumber:string
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  Employee:any = [];
  MyDataSource: any;

  constructor(private apiService: ApiService,private dialogservice:DialogService) { 
    this.readEmployee();
  }
  displayedColumns: string[] = ['Employee_ID', 'Name', 'Email', 'Designation', 'PhoneNumber','Update'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;  
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  

  ngOnInit() {
    this.readEmployee3();
    }
    
    readEmployee(){
      this.apiService.getEmployees().subscribe((data) => {
        this.Employee = data;
      })    
    }
    
  readEmployee3(){
    this.apiService.getEmployees()  
    .subscribe(  
      res => {  
        this.MyDataSource = new MatTableDataSource();  
        this.MyDataSource.data = res; 
        this.MyDataSource.paginator = this.paginator; 
        this.MyDataSource.sort = this.sort;    
        console.log(this.MyDataSource.data);  
      },  
      error => {  
        this.apiService.openSnackbar('There was an error while retrieving Posts !!!' + error);  
      });  
      
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }


        onDelete(row,index){
          this.dialogservice.openConfirmDialog('Are you sure to delete this record ?')
          .afterClosed().subscribe(res =>{
            if(res){
          this.apiService.deleteEmployee(row._id).subscribe((data) => {
            this.MyDataSource.data.splice(index, 1);
            this.apiService.openSnackbar("Successfully Deleted");
            this.readEmployee3();
          })
        }
      });
        }

  removeEmployee(employee,index) {
    // if(window.confirm('Are you sure?')) {
      this.dialogservice.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res =>{
        if(res){
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
          this.apiService.openSnackbar("Successfully Deleted");

        })    
    }
  });
}
}
