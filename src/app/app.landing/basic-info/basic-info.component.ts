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
import { EmployeeContextService } from 'src/app/app.services/employee-context.service';

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

  /** null = loading, true = submitted, false = not submitted (API decides) */
  get finalSubmitted$() { return this.context.finalSubmitted$; }
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
    private context: EmployeeContextService,
  ) {}

  ngOnInit(): void {
    this.parmKey = this.activeRoute.snapshot.paramMap.get('key');
    if (this.parmKey) {
      // URL key always wins. It decodes to the EmpCode (not the EmpID).
      this.encID = this.dyc.DycrptToId(this.parmKey);
      if (String(this.encID) !== String(this.context.empCode)) {
        this.context.clear(); // a different employee in this tab
      }
    } else {
      this.encID = this.context.empCode;
      this.parmKey = this.context.encKey;
    }

    if (this.encID) {
      this.getBasicInfo();
    } else {
      this.context.finalSubmitted$.next(false);
    }
    this.getDesignation();
    this.getEmpStatus();
  }

  getBasicInfo() {
    this.basicService.GetBasicInfoByCode(this.encID).subscribe({
      next: (res) => {
        const employee = res?.datas?.[0];
        if (!employee) {
          this.msgService.error(res?.message || 'Employee information was not found.');
          this.context.finalSubmitted$.next(false);
          return;
        }

        this.fetchedEmployeeInfo = res.datas;
        this.context.setEmployee(employee.empID, employee.empCode, this.parmKey);

        this.basicForm.patchValue({
          EmpID: employee.empID,
          EmpCode: employee.empCode,
          NameBan: employee.nameBan,
          DesignationID: employee.designationID,
          EmpStatusID: employee.empStatusID,
        });
        this.cdr.detectChanges();

        this.context.refreshFinalSubmitStatus().subscribe({
          error: (err) => {
            console.error(err);
            this.msgService.error(err?.message || 'Unable to check final submission status.');
            this.context.finalSubmitted$.next(false);
          },
        });
      },
      error: (err) => {
        this.msgService.error(err.message || 'Unable to load employee information.');
        this.context.finalSubmitted$.next(false);
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
