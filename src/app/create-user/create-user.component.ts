import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
// import { FileUploadService } from "../shared/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: ApiService
  ) {
    // Reactive Form
    this.form = this.fb.group({
      name: [''],
      avatar: [null]
    })
  }

  ngOnInit() { }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addUser(
      this.form.value.name,
      this.form.value.avatar
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.fileUploadService.openSnackbar('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
         this.fileUploadService.openSnackbar('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          this.fileUploadService.openSnackbar(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          this.fileUploadService.openSnackbar('User successfully created!');
          this.percentDone = false;
          this.router.navigate(['users-list'])
      }
    })
  }

}
