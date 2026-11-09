import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CountryService } from 'src/app/app.services/country.service';
import { PassportService } from 'src/app/app.services/passport.service';

@Component({
  selector: 'app-passport-info',
  templateUrl: './passport-info.component.html',
  styleUrls: ['./passport-info.component.css'],
})
export class PassportInfoComponent implements OnInit {
  passportList: any;
  EmpId: any;
  countryList: any;
  isVisible = false;
  isConfirmLoading = false;
  showInsertButton = true;
  showUpdateButton = true;
  passportInfo: any;
  constructor(
    private passportService: PassportService,
    private msgService: NzMessageService,
    private countryService: CountryService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.EmpId = sessionStorage.getItem('EmpID');
    this.passportInfo = this.getCountry();
    this.getpassportByEmp();
  }

  passportForm = new FormGroup({
    EmpID: new FormControl(''),
    PassportNo: new FormControl('',Validators.required),
    PIssuedate: new FormControl('',Validators.required),
    PExpiredate: new FormControl('',Validators.required),
    PAuthorityCountryID: new FormControl('',Validators.required),
  });

  getCountry() {
    this.countryService.GetCountries().subscribe({
      next: (res) => {
        this.countryList = res.datas;
      },
    });
  }
  getpassportByEmp() {
    this.passportService.GetPassportById(this.EmpId).subscribe({
      next: (res) => 
        {
        this.passportList = res.data;
        if (this.passportList != null) {
          this.showInsertButton = false;
        }
        if (this.passportList == undefined) {
          this.showUpdateButton = false
        }

        this.passportForm.patchValue({
          EmpID: res.data.empID,
          PassportNo: res.data.passportNo,
          PIssuedate: res.data.pIssueDate,
          PExpiredate: res.data.pExpireDate,
          PAuthorityCountryID: res.data.pAuthorityCountryID,
        });
        this.cdr.detectChanges();
      },
    });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.passportForm.valid) {
      this.passportForm.value.EmpID = this.EmpId;
      var passObj = this.passportForm.value;
      this.passportForm.value.EmpID = this.EmpId;
      this.passportService.AddPassport(passObj).subscribe({
        next: (response) => {
          this.msgService.success(response.message, {
            nzDuration: 3000,
          });
          this.getpassportByEmp();
          this.showUpdateButton = true;
        },
        error: (error) => {
          this.msgService.error(error.message, {
            nzDuration: 3000,
          });
        },
      });
    } else {
      Object.values(this.passportForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleUpdate() {
    this.passportForm.value.EmpID = this.EmpId;
    var drivingValue = this.passportForm.value;
    this.passportService.UpdatePassport(drivingValue).subscribe({
      next: (res) => {
        this.msgService.success(res.message);
        this.getpassportByEmp();
      },
      error: (err) => {
        this.msgService.error(err.message);
      },
    });
  }
}
