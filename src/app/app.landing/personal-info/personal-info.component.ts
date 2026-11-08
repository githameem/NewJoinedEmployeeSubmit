import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, map } from 'rxjs';
import { EmployeeBasic } from 'src/app/app.interfaces/employee-basic';
import { BasicInformationService } from 'src/app/app.services/basic-information.service';
import { BloodGroupService } from 'src/app/app.services/blood-group.service';
import { CountryService } from 'src/app/app.services/country.service';
import { GenderService } from 'src/app/app.services/gender.service';
import { MaritalStatusService } from 'src/app/app.services/marital-status.service';
import { ReligionService } from 'src/app/app.services/religion.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent implements OnInit {
  maritalstatusList: any;
  genderList: any;
  religionList: any;
  countryList: any;
  bloodGroupList: any;
  NIDfileList = [];
  OfferLetterDocList = [];
  fetchdata: any;
  PersonalInfo: any;
  EmpID: any;
  blobNid :any;
  blobOfferletter: any;
  nidUrl: any;
  offerLetterUrl : any;
  showNidUrl = false;
  showOfferLetterUrl = false;
  OfferLetter: any;
  NID: any;

  constructor(
    private formBuilder: FormBuilder,
    private _HttpClient: HttpClient,
    private personalService: BasicInformationService,
    private maritalService: MaritalStatusService,
    private genderService: GenderService,
    private religionService: ReligionService,
    private countryService: CountryService,
    private bloodGroupservice: BloodGroupService,
    private datePipe:DatePipe,
    private messageService: NzMessageService,
    private route : Router
  ) {}
  ngOnInit(): void {
    this.GetPersonaInfo();
    this.GetMaritalstatus();
    this.GetGender();
    this.GetReligion();
    this.GetCountrie();
    this.GetBloodGroups();
  }
  GetBloodGroups() {
    this.bloodGroupservice.GetBloodGroups().subscribe({
      next: (res) => {
        console.log(res);
        this.bloodGroupList = res.datas;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  GetPersonaInfo() {
    this.EmpID = localStorage.getItem('EmpCode');
    this.PersonalInfo = this.personalService
      .GetBasicInfoByCode(this.EmpID)
      .subscribe({
        next: (res) => {
          this.fetchdata = res.datas;
          const data = res.datas[0];
          if (data.documentNID != null) {
            this.showNidUrl=true
          }
          if (data.docOfferLetter != null) {
            this.showOfferLetterUrl=true
          }
          this.nidUrl = data.documentNID;
          this.offerLetterUrl = data.docOfferLetter;
          this.personalForm.patchValue({
            DateOfBirth: data.dateOfBirth,
            FathersName: data.fathersName,
            MothersName: data.mothersName,
            MaritalStatusID: data.maritalStatusID,
            SpouseName: data.spouseName,
            GenderID: data.genderID,
            ReligionID: data.religionID,
            CountryID: data.countryID,
            NidNo: data.nidNo,
            BirthCertificateNo: data.birthCertificateNo,
            BloodGroupID: data.bloodGroupID,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  GetMaritalstatus() {
    this.maritalService.GetMaritalStatus().subscribe({
      next: (res) => {
        this.maritalstatusList = res.datas;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  GetGender() {
    this.genderService.GetGenders().subscribe({
      next: (res) => {
        this.genderList = res.datas;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  GetReligion() {
    this.religionService.GetReligions().subscribe({
      next: (res) => {
        this.religionList = res.datas;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  GetCountrie() {
    this.countryService.GetCountries().subscribe({
      next: (res) => {
        this.countryList = res.datas;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  personalForm = new FormGroup({
    DateOfBirth: new FormControl(new Date(), [Validators.required]),
    FathersName: new FormControl(''),
    MothersName: new FormControl(''),
    MaritalStatusID: new FormControl(''),
    SpouseName: new FormControl(''),
    GenderID: new FormControl(''),
    ReligionID: new FormControl(''),
    CountryID: new FormControl(''),
    NidNo: new FormControl('', [Validators.required]),
    BirthCertificateNo: new FormControl(''),
    BloodGroupID: new FormControl('', [Validators.required]),
  });

  convertNzUploadFileToBlob(file: NzUploadFile): Blob {
    const originFile: File = file?.originFileObj as File;
    // Convert file to Blob
    return new Blob([originFile], { type: originFile.type });
  }
  UpdatePersonalInfo() 
  {
    if 
    (this.personalForm.valid) 
      {
      var formdata = new FormData();
      this.fetchdata[0].sectionID = 0;
      this.fetchdata[0].approvedBy = 0;
      this.fetchdata[0].rollBackBy = 0;
      // this.fetchdata[0].updateDate = this.datePipe.transform(new Date(),'dd-MM-yyy');
      this.fetchdata[0].empCategoryID = 1;
      this.fetchdata[0].nationalityID = 1;
      // this.fetchdata[0].finalSubmitDate = this.datePipe.transform(new Date(),'dd-MM-yyy');
      //this.fetchdata[0].designationSpecId = 0;
      this.fetchdata[0].taxPayeeCategoryId = 1;
      this.fetchdata[0].dateOfBirth = this.datePipe.transform(this.personalForm.value.DateOfBirth,'yyyy-MM-dd');
      this.fetchdata[0].fathersName = this.personalForm.value.FathersName;
      this.fetchdata[0].mothersName = this.personalForm.value.MothersName;
      this.fetchdata[0].maritalStatusID =this.personalForm.value.MaritalStatusID;
      this.fetchdata[0].spouseName = this.personalForm.value.SpouseName;
      this.fetchdata[0].genderID = this.personalForm.value.GenderID;
      this.fetchdata[0].religionID = this.personalForm.value.ReligionID;
      this.fetchdata[0].countryID = this.personalForm.value.CountryID;
      this.fetchdata[0].nidNo = this.personalForm.value.NidNo;
      this.fetchdata[0].birthCertificateNo = this.personalForm.value.BirthCertificateNo;
      this.fetchdata[0].bloodGroupID = this.personalForm.value.BloodGroupID;
      this.fetchdata[0].isRollBack = false;
      this.fetchdata[0].isApproved = false;
      this.fetchdata[0].finalSubmitBy = 1;
      this.fetchdata[0].isFinalSubmit = false;
      for (const key in this.fetchdata[0]) {
        if (Object.prototype.hasOwnProperty.call(this.fetchdata[0], key)) {
          formdata.append(key, this.fetchdata[0][key]);
        }
      }
      if (this.nidUrl != null) {
        formdata.append('DocumentNID',this.nidUrl);
      }
      if (this.offerLetterUrl != null) {
        formdata.append('DocOffetLetter',this.offerLetterUrl);
      }
      const Nidfile = this.NID;
      const OfferLetter = this.OfferLetter;

      if (Nidfile != undefined) {
         this.blobNid = this.convertNzUploadFileToBlob(Nidfile);
         formdata.append('NID',this.blobNid);
      }
      if(OfferLetter != undefined){
         this.blobOfferletter = this.convertNzUploadFileToBlob(OfferLetter);
         formdata.append("OfferLetter",this.blobOfferletter);
      }
      
      this.personalService.UpdateEmployeeBasicWithFile(formdata).subscribe({
        next: (res) => {
          // window.location.reload();
          this.messageService.success(res.message, {
            nzDuration: 3000
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (err) => {
          this.messageService.error(err.message, {
            nzDuration: 3000
          });
        },
      });
    } else {
      Object.values(this.personalForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  nidbeforeUpload = (): boolean => {
    return false;
  };

  // nidhandleChange({ file }: NzUploadChangeParam): void {
  //   this.NID = file;
  //   this.showNidUrl = false;
  // }
  nidhandleChange({ file }: NzUploadChangeParam): void {
    if (file.type !== 'application/pdf') {
      this.messageService.error("The selected file must be a PDF file", {
        nzDuration: 3000,
      });
      this.NID = null;
    } else {
      this.NID = file;
      this.showNidUrl = false;
    }
  }

  offerletterbeforeUpload = (): boolean => {
    return false;
  };
  // offerLetterhandleChange({ file }: NzUploadChangeParam): void {
  //   this.OfferLetter = file;
  //   this.showOfferLetterUrl = false;
  // }
  offerLetterhandleChange({ file }: NzUploadChangeParam): void {
    if (file.type !== 'application/pdf') {
      this.messageService.error("The selected file must be a PDF file", {
        nzDuration: 3000,
      });
      this.OfferLetter = null;
    } else {
      this.OfferLetter = file;
      this.showOfferLetterUrl = false;
    }
  }
}
