import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { EmployeePhoto } from 'src/app/app.interfaces/employee-photo';
import { EmployeePhotoService } from 'src/app/app.services/employee-photo.service';

@Component({
  selector: 'app-employee-photo',
  templateUrl: './employee-photo.component.html',
  styleUrls: ['./employee-photo.component.css'],
})
export class EmployeePhotoComponent implements OnInit {
  fileList: NzUploadFile[] = [];
  imageUrl: string | undefined;
  EmpId: any;
  Flag = true;
  base64Image: any;

  constructor(private http: HttpClient,private photoService : EmployeePhotoService, private msgService:NzMessageService) {}
  ngOnInit(): void {
    this.EmpId = localStorage.getItem("EmpID");
    this.getEmpPhoto();
  }
  getEmpPhoto(){
    this.photoService.GetPhototByEmpId(this.EmpId).subscribe({
      next:(res)=>{
        // console.log(res.data)
        this.imageUrl = "data:image/png;base64,"+res.data.photo
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
  // handleFileInput(event: NzUploadChangeParam) 
  // {
    
  //   const fileList: NzUploadFile[] = [...event.fileList]; 
  //   if (fileList.length > 0 && this.Flag == true) {
  //     this.Flag= false
  //     const file: File = fileList[0].originFileObj as File;
  //     this.uploadImage(file);
  //   }
  // }

  handleFileInput(event: NzUploadChangeParam) 
  {
    const fileList: NzUploadFile[] = [...event.fileList];
    if (fileList.length > 0 && this.Flag == true) {
      this.Flag = false;
      const file: File = fileList[0].originFileObj as File;
      if (file.size / 1024 > 200) 
      {
        this.msgService.error("File Size Exits 200KB", {
          nzDuration: 3000,
        });
        this.Flag = true;
        return;
      }
      this.uploadImage(file);
    }
  }
  uploadImage(file: File) {
    // Read the file using FileReader
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      // Once the file is loaded, extract its base64 representation
      this.base64Image = event.target!.result as string;
  
      // After reading the file, proceed with uploading
      const formData = new FormData();
      formData.append("EmpID", this.EmpId);
      formData.append('EmpPhoto', file);
      formData.append("Base64Image", this.base64Image);
  
      // Call the photoService to upload the image
      this.photoService.UploadPhoto(formData).subscribe({
        next: (res) => {
          this.Flag = true;
          console.log(res); // Handle successful upload response
          this.getEmpPhoto();
        },
        error: (err) => {
          this.Flag = true;
          console.log(err); // Handle upload error
        }
      });
    };
    reader.readAsDataURL(file); // Start reading the file
  }
}
