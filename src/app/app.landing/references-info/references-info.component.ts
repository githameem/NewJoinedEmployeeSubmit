import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmployeeReferenceService } from 'src/app/app.services/employee-reference.service';

@Component({
  selector: 'app-references-info',
  templateUrl: './references-info.component.html',
  styleUrls: ['./references-info.component.css']
})
export class ReferencesInfoComponent implements OnInit {
  EmpId : any;
  referenceList : any;
  isVisible = false;
  isConfirmLoading = false;
  selectedReferences: any;
  showButton = true;
  showButtonSubmit = true;
  showButtonUpdate = true;
  constructor(private referenceService: EmployeeReferenceService, private msgService : NzMessageService){

  }
  ngOnInit(): void 
  {
    this.EmpId = sessionStorage.getItem("EmpID");
    this.getReferences();
  }
  referenceForm = new FormGroup({
    ID: new FormControl(''),
    EmpID : new FormControl(''),
    RefName: new FormControl(''),
    CompanyName: new FormControl(''),
    Designation: new FormControl(''),
    Relation: new FormControl(''),
    PhoneNo: new FormControl(''),
    Email: new FormControl('',Validators.email),
    TelePhoneNo: new FormControl('')
  })

  getReferences(){
    this.referenceService.GetReferenceByEmpId(this.EmpId).subscribe({
      next:(res)=>{
        this.referenceList = res.datas;
      },
      error:(err)=>{
        console.log(err);
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
    if (this.referenceForm.valid) 
    {
      this.referenceForm.value.EmpID = this.EmpId;
      this.referenceForm.value.ID = null;
      this.referenceService.AddReference(this.referenceForm.value).subscribe({
        next: (response) => {
          this.msgService.success(response.message, {
            nzDuration: 3000,
          });
          this.referenceForm.reset();
          this.getReferences();
        },
        error: (error) => {
          this.msgService.error(error.message, {
            nzDuration: 3000,
          });
        },
      });
    } else {
      Object.values(this.referenceForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  Update(data:any){
    this.selectedReferences = data
    this.referenceForm.patchValue({
      ID: this.selectedReferences.id,
      RefName: this.selectedReferences.refName,
      CompanyName: this.selectedReferences.companyName,
      Designation:this.selectedReferences.designation,
      Relation: this.selectedReferences.relation,
      PhoneNo: this.selectedReferences.phoneNo,
      Email: this.selectedReferences.email,
      TelePhoneNo: this.selectedReferences.telePhoneNo,
    });
    this.showmodalForUpdate();
  }

  handleUpdate()
  {
    if (this.referenceForm.valid) 
      {
        this.referenceForm.value.EmpID = this.EmpId;
        this.referenceService.UpdateReference(this.referenceForm.value).subscribe({
          next: (response) => {
            this.msgService.success(response.message, {
              nzDuration: 3000,
            });
            this.getReferences();
          },
          error: (error) => {
            this.msgService.error(error.message, {
              nzDuration: 3000,
            });
          },
        });
      } else {
        Object.values(this.referenceForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
      this.referenceForm.reset();
      this.isVisible = false;
  }

  Delete(id: any){
    this.referenceService.DeleteReference(id).subscribe({
      next:(res)=>{
        this.msgService.success(res.message);
        this.getReferences();
      },
      error:(err)=>{
        this.msgService.error(err)
      }
    })
  }

}
