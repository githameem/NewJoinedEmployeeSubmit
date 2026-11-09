import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { EmployeeJobStatusService } from 'src/app/app.services/employee-job-status.service';

@Component({
  selector: 'app-experience-info',
  templateUrl: './experience-info.component.html',
  styleUrls: ['./experience-info.component.css']
})
export class ExperienceInfoComponent implements OnInit {
  EmpId: any;
  experienceList: any;
  isVisible = false;
  CertificateFile: any;
  isConfirmLoading = false;
  selectedExperience: any;
  showButton = true;
  showButtonSubmit = true;
  showButtonUpdate = true;
  constructor(private employeeExpService: EmployeeJobStatusService, private msgService: NzMessageService, private datePipe: DatePipe){
  }

  ngOnInit(): void {
  this.EmpId = sessionStorage.getItem("EmpID");
  this.getExperience();
  }
  experienceForm = new FormGroup({
    EmpID : new FormControl(''),
    CompanyName: new FormControl(''),
    Department: new FormControl(''),
    Designation: new FormControl(''),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
    //Responsibility: new FormControl(''),
    CompanyAddress: new FormControl(''),
    EntryDate: new FormControl(''),
    Document: new FormControl('')
  })

  getExperience(){
    this.employeeExpService.GetJobStatusByEmpId(this.EmpId).subscribe({
      next: (res)=>{
        this.experienceList = res.datas
      },
      error: (err)=>{
        console.log(err.message);
      }
    })
  }
  Update(data : any){
    this.selectedExperience = data;
    this.experienceForm.patchValue({

      EmpID : this.selectedExperience.empID,
      CompanyName: this.selectedExperience.companyName,
      Department: this.selectedExperience.department,
      Designation:this.selectedExperience.designation,
      StartDate: this.selectedExperience.startDate,
      EndDate: this.selectedExperience.endDate,
      //Responsibility: this.selectedExperience.responsibility,
      CompanyAddress: this.selectedExperience.companyAddress,
      EntryDate: this.selectedExperience.entryDate,
      Document: this.selectedExperience.document,
    });
    this.showmodalForUpdate();
  }
  Delete(id : any){
    this.employeeExpService.DeleteJobStatus(id).subscribe({
      next:(res)=>{
        this.msgService.success(res.message);
        this.getExperience();
      }
    })
  }
  showModal()
  {
    this.isVisible = true;   
     this.showButtonSubmit = true;
    this.showButtonUpdate = false;
  }
  showmodalForUpdate(){
    this.isVisible = true;
    this.showButtonSubmit = false;
    this.showButtonUpdate = true;
  }

  handleOk(): void 
  {
    if (this.experienceForm.valid) {
      const formdata = new FormData();
      formdata.append('empID', this.EmpId);
      formdata.append('companyName', this.experienceForm.value.CompanyName as string);
      formdata.append('department',this.experienceForm.value.Department as string);
      formdata.append('designation', this.experienceForm.value.Designation as string);
      formdata.append('startDate', this.datePipe.transform(this.experienceForm.value.StartDate as string,"yyyy-MM-dd") as string);
      formdata.append('endDate',this.datePipe.transform(this.experienceForm.value.EndDate as string,"yyyy-MM-dd") as string);
      //formdata.append('responsibility',this.experienceForm.value.Responsibility as string);
      formdata.append('companyAddress',this.experienceForm.value.CompanyAddress as string);

      const CFile = this.CertificateFile;
      if (CFile != undefined) 
      {
        const certificateBlob = this.convertNzUploadFileToBlob(CFile);
        if (certificateBlob.size > 5 * 1024 * 1024) 
        {
          this.msgService.error("Please Add a File Which Is less than 5 MB, File Not added To The information", {
            nzDuration: 8000,
          });
        }
        else{
          const certificateBlob = this.convertNzUploadFileToBlob(CFile);
          formdata.append('CertificateFile', certificateBlob);
        }
        
      }
      this.employeeExpService.AddNewJobStatus(formdata).subscribe({
        next: (response) => {
          this.msgService.success(response.message, {
            nzDuration: 3000,
          });
          this.getExperience();
        },
        error: (error) => {
          this.msgService.error(error.message, {
            nzDuration: 3000,
          });
        },
      });
    } else {
      Object.values(this.experienceForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.experienceForm.reset();
    this.isVisible = false;
  }
  handleUpdate()
  {
    if (this.experienceForm.valid) {
      const formdata = new FormData();
      formdata.append('id',this.selectedExperience.id);
      formdata.append('empID', this.EmpId);
      formdata.append('companyName', this.experienceForm.value.CompanyName as string);
      formdata.append('department',this.experienceForm.value.Department as string);
      formdata.append('designation', this.experienceForm.value.Designation as string);
      formdata.append('startDate', this.datePipe.transform(this.experienceForm.value.StartDate as string,"yyyy-MM-dd") as string);
      formdata.append('endDate',this.datePipe.transform(this.experienceForm.value.EndDate as string,"yyyy-MM-dd") as string);
      // formdata.append('responsibility',this.experienceForm.value.Responsibility as string);
      formdata.append('companyAddress',this.experienceForm.value.CompanyAddress as string);
      formdata.append('document',this.selectedExperience.document);

      const CFile = this.CertificateFile;
      if (CFile != undefined) {
        const certificateBlob = this.convertNzUploadFileToBlob(CFile);

        formdata.append('CertificateFile', certificateBlob);
      }
      this.employeeExpService.UpdateJobStatus(formdata).subscribe({
        next: (response) => {
          this.msgService.success(response.message, {
            nzDuration: 3000,
          });
          this.getExperience();
        },
        error: (error) => {
          this.msgService.error(error.message, {
            nzDuration: 3000,
          });
        },
      });
    } else {
      Object.values(this.experienceForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.experienceForm.reset();
    this.isVisible = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  convertNzUploadFileToBlob(file: NzUploadFile): Blob {
    const originFile: File = file?.originFileObj as File;
    // Convert file to Blob
    return new Blob([originFile], { type: originFile.type });
  }
  // certificatehandleChange({ file }: NzUploadChangeParam): void {
  //   this.CertificateFile = file;
  // }

  certificatehandleChange({ file }: NzUploadChangeParam): void {
    if (file.type !== 'application/pdf') {
      this.msgService.error("The selected file must be a PDF file", {
        nzDuration: 3000,
      });
      this.CertificateFile = null;
    } else {
      this.CertificateFile = file;
    }
  }
}
