import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { YearCell } from 'ng-zorro-antd/date-picker/lib/interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { BoardService } from 'src/app/app.services/board.service';
import { DegreeService } from 'src/app/app.services/degree.service';
import { EmployeeEducationService } from 'src/app/app.services/employee-education.service';

@Component({
  selector: 'app-education-info',
  templateUrl: './education-info.component.html',
  styleUrls: ['./education-info.component.css'],
})
export class EducationInfoComponent implements OnInit {
  educationList: any;
  isVisible = false;
  isConfirmLoading = false;
  degreeList: any;
  boardList: any;
  CertificateFile: any;
  passingYear: any;
  EmpId: any;
  eduUpdateObj: any;
  selectedEducation: any;
  showButton = true;
  showButtonSubmit = true;
  showButtonUpdate = true;
  educationInsert = false;
  constructor(
    private educationService: EmployeeEducationService,
    private degreeService: DegreeService,
    private boardService: BoardService,
    private eduservice: EmployeeEducationService,
    private msgService: NzMessageService
  ) {}
  ngOnInit(): void {
    this.EmpId = localStorage.getItem('EmpID');
    this.getDegree();
    this.getBoard();
    this.getEducation();
    localStorage.setItem("eduInsert",(this.educationInsert).toString());
  }

  educationForm = new FormGroup({
    DegreeID: new FormControl('', Validators.required),
    PassingYear: new FormControl('', Validators.required),
    Institute: new FormControl('', Validators.required),
    BoardID: new FormControl('', Validators.required),
    Result: new FormControl('', Validators.required),
    OutOf: new FormControl('', Validators.required),
    SubjectName: new FormControl('', Validators.required),
  });
  getEducation() {
    this.eduservice.GetEducationByEmpId(this.EmpId).subscribe({
      next: (res) => {
        console.log(res.datas);
        this.educationList = res.datas;
      },
      error: (err) => {},
    });
  }
  getDegree() {
    this.degreeService.GetDegrees().subscribe({
      next: (res) => {
        this.degreeList = res.datas;
      },
    });
  }
  getBoard() {
    this.boardService.GetBoards().subscribe({
      next: (res) => {
        this.boardList = res.datas;
      },
    });
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
    this.educationForm.value.PassingYear = this.passingYear;
    if (this.educationForm.valid) {
      const formdata = new FormData();
      formdata.append('empID', this.EmpId);
      formdata.append('degreeID', this.educationForm.value.DegreeID as string);
      formdata.append('passingYear',this.educationForm.value.PassingYear as string);
      formdata.append('institute',this.educationForm.value.Institute as string);
      formdata.append('boardID', this.educationForm.value.BoardID as string);
      formdata.append('result', this.educationForm.value.Result as string);
      formdata.append('outOf', this.educationForm.value.OutOf as string);
      formdata.append('subjectName',this.educationForm.value.SubjectName as string);

      const nidFile = this.CertificateFile;
      if (nidFile == undefined) {
        this.msgService.error("Please Add Your education Cirtifacate as Pdf", {
          nzDuration: 3000,
        });
      }
      if (nidFile != undefined) 
      {
        const certificateBlob = this.convertNzUploadFileToBlob(nidFile);
        formdata.append('EduFile', certificateBlob);
      }
     
      if (nidFile != undefined) 
      {
        const certificateBlob = this.convertNzUploadFileToBlob(nidFile);
        if (certificateBlob.size > 5 * 1024 * 1024) {
          this.msgService.error("Please Add Your education Cirtifacate  PDF Less Than 5MB", {
            nzDuration: 3000,
          });
        }
        else 
        {
          this.educationService.AddNewEducation(formdata).subscribe({
            next: (response) => 
              {
              this.educationInsert = true;
              localStorage.setItem("eduInsert",(this.educationInsert).toString());
              this.msgService.success(response.message, 
              {
                nzDuration: 3000,
              });
              this.educationForm.reset();
              this.getEducation();
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
      Object.values(this.educationForm.controls).forEach((control) => {
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

  // onChange(result: any): void {
  //   this.passingYear = result.getFullYear();
  // }
  onChange(result: Date): void {
    if (result instanceof Date) {
      this.passingYear = result.getFullYear();
    }
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


  Delete(id: any) {
    this.educationService.DeleteEducation(id).subscribe({
      next: (res) => {
        this.msgService.success(res.message);
        this.getEducation();
      },
      error: (err) => {
        this.msgService.error(err.message);
      },
    });
  }
  Update(data: any) {
    this.selectedEducation = data;
    this.educationForm.patchValue({
      DegreeID: this.selectedEducation.degreeID,
      SubjectName: this.selectedEducation.subjectName,
      Institute: this.selectedEducation.institute,
      PassingYear: this.selectedEducation.passingYear,
      Result: this.selectedEducation.result,
      OutOf: this.selectedEducation.outOf,
      BoardID: this.selectedEducation.boardID,
    });
    this.showmodalForUpdate();
  }
  handleUpdate(){
    this.educationForm.value.PassingYear = this.passingYear;
    if (this.educationForm.valid) 
    {
      const formdata = new FormData();
      formdata.append('id',this.selectedEducation.id)
      formdata.append('empID', this.EmpId);
      formdata.append('degreeID', this.educationForm.value.DegreeID as string);
      formdata.append('passingYear',this.educationForm.value.PassingYear as string);
      formdata.append('institute',this.educationForm.value.Institute as string);
      formdata.append('boardID', this.educationForm.value.BoardID as string);
      formdata.append('result', this.educationForm.value.Result as string);
      formdata.append('outOf', this.educationForm.value.OutOf as string);
      formdata.append('subjectName',this.educationForm.value.SubjectName as string);
      formdata.append('document',this.selectedEducation.document);

      const nidFile = this.CertificateFile;
      if (nidFile != undefined) 
      {
        const certificateBlob = this.convertNzUploadFileToBlob(nidFile);
        formdata.append('EduFile', certificateBlob);
      }
      this.educationService.UpdateEducation(formdata).subscribe({
        next: (response) => {
          this.msgService.success(response.message, {
            nzDuration: 3000,
          });
          this.educationForm.reset();
          this.getEducation();
        },
        error: (error) => {
          this.msgService.error(error.message, {
            nzDuration: 3000,
          });
        },
      });
    } 
    else 
    {
      Object.values(this.educationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.isVisible = false;
  }
}
