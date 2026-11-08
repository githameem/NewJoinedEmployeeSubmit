import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { BasicInformationService } from 'src/app/app.services/basic-information.service';
import { DesignationService } from 'src/app/app.services/designation.service';
import { EmploymentStatusService } from 'src/app/app.services/employment-status.service';
import { EmployeeBasic } from 'src/app/app.interfaces/employee-basic';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DycriptionService } from 'src/app/app.services/dycription.service';
import { EmployeeFinalSubmitService } from 'src/app/app.services/employee-final-submit.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
})
export class BasicInfoComponent implements OnInit {
  basicInformation: any;
  designationList: any;
  employmentStatusList: any;
  selectedDesignationValue: any;
  fetchedEmployeeInfo: any;
  encID: any;
  parmKey: any;
  empID: any;
  submittingForm: boolean = false;

  isfinalSubmit = false;
  showFinalSubmitedPage = false;
  constructor(
    private fb: NonNullableFormBuilder,
    private basicService: BasicInformationService,
    private designationService: DesignationService,
    private EmpStatusService: EmploymentStatusService,
    private cdr: ChangeDetectorRef,
    private msgService: NzMessageService,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute,
    private dyc: DycriptionService,
    private finalSubmitservice: EmployeeFinalSubmitService,
  ) {}


  ngOnInit(): void {
    this.parmKey = this.activeRoute.snapshot.paramMap.get('key');
    if (this.parmKey !== null) {
      localStorage.setItem('EncKey', this.parmKey);
      this.encID = this.dyc.DycrptToId(this.parmKey);
    } else {
      this.encID = localStorage.getItem('EmpCode');
    }

    this.getBasicInfo();
    this.getDesignation();
    this.getEmpStatus();
  }

  getBasicInfo() {
    this.basicService.GetBasicInfoByCode(this.encID).subscribe({
      next: (res) => {
        const employee = res?.datas?.[0];
        if (!employee) {
          this.msgService.error(res?.message || 'Employee information was not found.');
          return;
        }

        this.fetchedEmployeeInfo = res.datas;
        localStorage.setItem('EmpID', employee.empID);
        localStorage.setItem('EmpCode', employee.empCode);
        if (this.parmKey !== null) {
          localStorage.setItem('EncKey', this.parmKey);
        }

        this.basicForm.patchValue({
          EmpID: employee.empID,
          EmpCode: employee.empCode,
          NameBan: employee.nameBan,
          DesignationID: employee.designationID,
          EmpStatusID: employee.empStatusID,
        });
        this.cdr.detectChanges();

        this.finalSubmitservice.isFinalSubmitted(employee.empID).subscribe((submitted) => {
          this.isfinalSubmit = !submitted;
          this.showFinalSubmitedPage = submitted;
        });
      },
      error: (err) => {
        this.msgService.error(err.message || 'Unable to load employee information.');
      },
    });
  }
  getDesignation() {
    this.designationService.GetDesignations().subscribe((res) => {
      console.log(res);
      this.designationList = res.datas;
    });
  }
  getEmpStatus() {
    this.EmpStatusService.GetEmploymentStatus().subscribe((res) => {
      console.log(res);
      this.employmentStatusList = res.datas;
    });
  }
  basicForm = new FormGroup({
    EmpID: new FormControl(''),
    EmpCode: new FormControl(''),
    // Title: new FormControl({disabled: true }),
    // Name: new FormControl({disabled: true }),
    // TitleBan: new FormControl({disabled: true }),
    NameBan: new FormControl(''),
    DesignationID: new FormControl(''),
    EmpStatusID: new FormControl(''),
  });

  //#region  Submit
  // submitForm(): void {
  //   if (this.basicForm.valid) {
  //     var basicValue = this.basicForm.value;
  //     this.fetchedEmployeeInfo[0].empID = this.basicForm.value.EmpID;
  //     this.fetchedEmployeeInfo[0].empCode = this.basicForm.value.EmpCode;
  //     this.fetchedEmployeeInfo[0].title = this.basicForm.value.Title;
  //     this.fetchedEmployeeInfo[0].name = this.basicForm.value.Name;
  //     this.fetchedEmployeeInfo[0].titleBan = this.basicForm.value.TitleBan;
  //     this.fetchedEmployeeInfo[0].nameBan = this.basicForm.value.NameBan;
  //     this.fetchedEmployeeInfo[0].dsignationID =
  //       this.basicForm.value.DesignationID;
  //     this.fetchedEmployeeInfo[0].empStatusID =
  //       this.basicForm.value.EmpStatusID;

  //     this.basicService.updateEmployee(this.fetchedEmployeeInfo[0]).subscribe({
  //       next: (res) => {
  //         this.msgService.success(res.message, {
  //           nzDuration: 3000,
  //         });
  //       },
  //       error: (err) => {
  //         this.msgService.create('error', err.message);
  //       },
  //     });
  //   } else {
  //     Object.values(this.basicForm.controls).forEach((control) => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }
  //#endregion
  UpdateInfo() {
    if (this.basicForm.valid) {
      var basicValue = this.basicForm.value;
      this.fetchedEmployeeInfo[0].empID = this.basicForm.value.EmpID;
      this.fetchedEmployeeInfo[0].empCode = this.basicForm.value.EmpCode;
      // this.fetchedEmployeeInfo[0].title = this.basicForm.value.Title;
      // this.fetchedEmployeeInfo[0].name = this.basicForm.value.Name;
      // this.fetchedEmployeeInfo[0].titleBan = this.basicForm.value.TitleBan;
      this.fetchedEmployeeInfo[0].nameBan = this.basicForm.value.NameBan;
      this.fetchedEmployeeInfo[0].dsignationID =
        this.basicForm.value.DesignationID;
      this.fetchedEmployeeInfo[0].empStatusID =
        this.basicForm.value.EmpStatusID;

      this.basicService.updateEmployee(this.fetchedEmployeeInfo[0]).subscribe({
        next: (res) => {
          this.msgService.success(res.message, {
            nzDuration: 3000,
          });
        },
        error: (err) => {
          this.msgService.create('error', err.message);
        },
      });
    } else {
      Object.values(this.basicForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
