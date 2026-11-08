import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { EmployeeSignatureService } from 'src/app/app.services/employee-signature.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit{
  fileList: NzUploadFile[] = [];
  imageUrl: string | undefined;
  EmpId: any;
  Flag = true;
  base64Image: any;

  constructor(private http: HttpClient,private signatureService : EmployeeSignatureService) {}

  ngOnInit(): void {
    this.EmpId = localStorage.getItem("EmpID");
    this.getEmpSignature();
  }
  getEmpSignature(){
    this.signatureService.GetSignatureByEmpId(this.EmpId).subscribe({
      next:(res)=>{
        // console.log(res.data)
        this.imageUrl = "data:image/png;base64,"+res.data.signature
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
  handleFileInput(event: NzUploadChangeParam) 
  {
    
    const fileList: NzUploadFile[] = [...event.fileList]; 
    if (fileList.length > 0 && this.Flag == true) {
      this.Flag= false
      const file: File = fileList[0].originFileObj as File;
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
      formData.append('SignatureFile', file);
      formData.append("Base64Image", this.base64Image);
  
      // Call the photoService to upload the image
      this.signatureService.UploadSignature(formData).subscribe({
        next: (res) => {
          this.Flag = true;
          console.log(res); // Handle successful upload response
          this.getEmpSignature();
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
