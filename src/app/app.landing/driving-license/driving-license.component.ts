import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CountryService } from 'src/app/app.services/country.service';
import { DrivingLicenseService } from 'src/app/app.services/driving-license.service';

@Component({
  selector: 'app-driving-license',
  templateUrl: './driving-license.component.html',
  styleUrls: ['./driving-license.component.css']
})
export class DrivingLicenseComponent implements OnInit 
{
  drivingLicenseList: any;
  EmpId : any;
  countryList: any;
  isVisible = false;
  isConfirmLoading = false;
  showInsertButton = true;
  showUpdateButton = true;
  constructor(private drivinlicenseService: DrivingLicenseService, private countryService : CountryService,
    private msgService: NzMessageService, private cdr : ChangeDetectorRef){

  }
  ngOnInit(): void {
    this.EmpId = sessionStorage.getItem("EmpID");
    this.getCountry();
    this.getDrivingLisenceByEmp();
  }

  drivingLicenseForm = new FormGroup({
    EmpID : new FormControl(''),
    DrivingLicense : new FormControl(''),
    DIssuedate : new FormControl(''),
    DExpiredate : new FormControl(''),
    DAuthorityCountryID : new FormControl('')
  })

  getCountry(){
    this.countryService.GetCountries().subscribe({
      next:(res)=>{
        this.countryList = res.datas;
      }
    })
  }
  getDrivingLisenceByEmp(){
    this.drivinlicenseService.GetDrivingLicenseById(this.EmpId).subscribe({
      next: (res)=>{
        console.log(res)
        this.drivingLicenseList = res.data;
        this.drivingLicenseList = res.data;
        if (this.drivingLicenseList != null) {
          this.showInsertButton = false;
        }
        if (this.drivingLicenseList == undefined) {
          this.showUpdateButton = false
        }
        this.drivingLicenseForm.patchValue({
          EmpID: res.data.empID,
          DrivingLicense: res.data.drivingLicense,
          DIssuedate: res.data.dIssueDate ,
          DExpiredate: res.data.dExpireDate,
          DAuthorityCountryID: res.data.dAuthorityCountryID,
        });
        this.cdr.detectChanges();
      }
    })
  }

  handleOk(): void 
  {
    if (this.drivingLicenseForm.valid) 
    {
      var drivingObj = this.drivingLicenseForm.value;
      this.drivingLicenseForm.value.EmpID = this.EmpId;
      this.drivinlicenseService.AddNewDrivingLicense(drivingObj).subscribe({
        next: (response) => {
          this.msgService.success(response.message, {
            nzDuration: 3000,
          });
          this.getDrivingLisenceByEmp();
          this,this.showUpdateButton = true;
        },
        error: (error) => {
          this.msgService.error(error.message, {
            nzDuration: 3000,
          });
        },
      });
    } else {
      Object.values(this.drivingLicenseForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  handleUpdate()
  {
    this.drivingLicenseForm.value.EmpID = this.EmpId;
    var drivingValue = this.drivingLicenseForm.value;
    this.drivinlicenseService.UpdateDrivingLicense(drivingValue).subscribe({
      next:(res)=>{
        this.msgService.success(res.message);
        this.getDrivingLisenceByEmp();
      },
      error: (err)=>{
        this.msgService.error(err.message)
      }
    }) 
  }
}
