import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { EmployeeNomineeService } from 'src/app/app.services/employee-nominee.service';
import { RelationshipService } from 'src/app/app.services/relationship.service';

@Component({
  selector: 'app-nominee-info',
  templateUrl: './nominee-info.component.html',
  styleUrls: ['./nominee-info.component.css'],
})
export class NomineeInfoComponent implements OnInit {
  isVisible = false;
  relationshipList: any;
  demoValue = 100;
  nomineePhotoList: [] | any;
  EmpId: any;
  EmpCode: any;
  NomineeList: any;
  NID: any;
  Photo: any;
  selectedNominee: any;
  showButton = true;
  showButtonSubmit = true;
  showButtonUpdate = true;

  constructor(
    private relationService: RelationshipService,
    private nomineeService: EmployeeNomineeService,
    private datePipe: DatePipe,
    private msgService: NzMessageService
  ) {}
  nomineeForm = new FormGroup({
    NomineeId: new FormControl(''),
    NomineeName: new FormControl('', [Validators.required]),
    RelationshipId: new FormControl('', [Validators.required]),
    RelationshipOthers: new FormControl(''),
    NID: new FormControl('', Validators.required),
    DateOfBirth: new FormControl(new Date()),
    BirthRegNo: new FormControl(''),
    NomineeOwnership: new FormControl('', Validators.required),
  });

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');

  ngOnInit(): void {
    this.EmpId = sessionStorage.getItem('EmpID');
    this.EmpCode = sessionStorage.getItem('EmpCode');
    this.GetRelationShips();
    this.GetNomineesByEmployee();
  }
  //#region Get relation
  GetRelationShips() {
    this.relationService.GetRelationhips().subscribe({
      next: (res) => {
        this.relationshipList = res.datas;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  //#endregion

  //#region Nominee Service
  GetNomineesByEmployee() {
    this.nomineeService.GetNomineeByEmpId(this.EmpId).subscribe({
      next: (response) => {
        sessionStorage.setItem('NomineeId', response.datas.nomineeId);
        this.NomineeList = response.datas;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  //#endregion

  //#region Modal
  showModal() {
    this.isVisible = true;
    this.showButtonSubmit = true;
    this.showButtonUpdate = false;
  }
  showmodalForUpdate() {
    this.isVisible = true;
    this.showButtonSubmit = false;
    this.showButtonUpdate = true;
  }
  //#region Insert
  handleOk(): void {
    if (this.nomineeForm.valid) {
      const formdata = new FormData();
      formdata.append('empId', this.EmpId);
      formdata.append(
        'nomineeName',
        this.nomineeForm.value.NomineeName as string
      );
      formdata.append('nid', this.nomineeForm.value.NID as string);
      formdata.append(
        'relationshipId',
        this.nomineeForm.value.RelationshipId as string
      );
      formdata.append(
        'dateOfBirth',
        this.datePipe.transform(
          this.nomineeForm.value.DateOfBirth,
          'yyyy-MM-dd'
        ) as string
      );
      formdata.append(
        'birthRegNo',
        this.nomineeForm.value.BirthRegNo as string
      );
      formdata.append(
        'nomineeOwnership',
        this.nomineeForm.value.NomineeOwnership as string
      );

      const nidFile = this.NID;
      const photo = this.Photo;

      if (photo != undefined) {
        var blobPhoto = this.convertNzUploadFileToBlob(photo);
        formdata.append('PhotoFile', blobPhoto);
      }
      if (nidFile != undefined) {
        var blobNid = this.convertNzUploadFileToBlob(nidFile);
        formdata.append("DocumentFile", blobNid);
      }
      if (nidFile == undefined) 
      {
        this.msgService.error('Please Select an NID PDF File', {
          nzDuration: 3000,
        });
      }
      if (nidFile != undefined) {
        var blobNid = this.convertNzUploadFileToBlob(nidFile);
        if (blobNid.size > 5 * 1024 * 1024) {
          this.msgService.error('File size exceeds the limit of 5 MB', {
            nzDuration: 3000,
          });
        } else {
          this.nomineeService.Addnominee(formdata).subscribe({
            next: (response) => {
              this.msgService.success(response.message, {
                nzDuration: 3000,
              });
              this.nomineeForm.reset();
              this.GetNomineesByEmployee();
            },
            error: (error) => {
              this.msgService.error(error.message, {
                nzDuration: 3000,
              });
            },
          });
        }
      }
    } else {
      Object.values(this.nomineeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isVisible = false;
  }
  //#endregion

  //#region Update
  Update(data: any) {
    this.selectedNominee = data;
    this.nomineeForm.patchValue({
      NomineeId: this.selectedNominee.nomineeId,
      NomineeName: this.selectedNominee.nomineeName,
      RelationshipId: this.selectedNominee.relationshipId,
      RelationshipOthers: this.selectedNominee.relationshipOthers,
      NID: this.selectedNominee.nid,
      DateOfBirth: this.selectedNominee.dateOfBirth,
      BirthRegNo: this.selectedNominee.birthRegNo,
      NomineeOwnership: this.selectedNominee.nomineeOwnership,
    });
    this.showmodalForUpdate();
  }
  //#endregion
  //#region  Delete
  Delete(nomineeId: any) {
    this.nomineeService.DeleteNominee(nomineeId).subscribe({
      next: (response) => {
        this.msgService.success(response.message);
        this.GetNomineesByEmployee();
      },
      error: (err) => {
        this.msgService.error(err.message);
      },
    });
  }
  //#endregion

  handleCancel(): void {
    this.isVisible = false;
  }
  //#endregion
  handleUpdate() {
    if (this.nomineeForm.valid) {
      const formdata = new FormData();
      formdata.append('nomineeId', this.selectedNominee.nomineeId);
      formdata.append('empId', this.EmpId);
      formdata.append(
        'nomineeName',
        this.nomineeForm.value.NomineeName as string
      );
      formdata.append(
        'relationshipOthers',
        this.nomineeForm.value.RelationshipOthers as string
      );
      formdata.append('nid', this.nomineeForm.value.NID as string);
      formdata.append(
        'relationshipId',
        this.nomineeForm.value.RelationshipId as string
      );
      formdata.append(
        'dateOfBirth',
        this.datePipe.transform(
          this.nomineeForm.value.DateOfBirth,
          'yyyy-MM-dd'
        ) as string
      );
      formdata.append(
        'birthRegNo',
        this.nomineeForm.value.BirthRegNo as string
      );
      formdata.append(
        'nomineeOwnership',
        this.nomineeForm.value.NomineeOwnership as string
      );

      const nidFile = this.NID;
      const photo = this.Photo;

      if ( photo != undefined) {
        var blobPhoto = this.convertNzUploadFileToBlob(photo);
        formdata.append('PhotoFile', blobPhoto);
      }
      if (nidFile != undefined) {
        var blobNid = this.convertNzUploadFileToBlob(nidFile);
        if (blobNid.size > 5 * 1024 * 1024) {
          this.msgService.error('File size exceeds the limit of 5 MB', {
            nzDuration: 3000,
          });
        } 
        else 
        {
          var blobNid = this.convertNzUploadFileToBlob(nidFile);
          formdata.append("DocumentFIle", blobNid);
        }
      }

      this.nomineeService.UpdateNominee(formdata).subscribe({
        next: (response) => {
          this.msgService.success(response.message, {
            nzDuration: 3000,
          });
          this.GetNomineesByEmployee();
          this.nomineeForm.reset();
        },
        error: (error) => {
          this.msgService.error(error.message, {
            nzDuration: 3000,
          });
        },
      });
    } else {
      Object.values(this.nomineeForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isVisible = false;
  }

  //#region image
  convertNzUploadFileToBlob(file: NzUploadFile): Blob {
    const originFile: File = file?.originFileObj as File;
    // Convert file to Blob
    return new Blob([originFile], { type: originFile.type });
  }
  // nidhandleChange({ file }: NzUploadChangeParam): void {
  //   this.NID = file;
  // }
  nidhandleChange({ file }: NzUploadChangeParam): void {
    if (file.type !== 'application/pdf') {
      this.msgService.error("The selected file must be a PDF file", {
        nzDuration: 3000,
      });
      this.NID = null;
    } else {
      this.NID = file;
    }
  }
  photohandleChange({ file }: NzUploadChangeParam): void {
    this.Photo = file;
  }
  //#endregion
}
