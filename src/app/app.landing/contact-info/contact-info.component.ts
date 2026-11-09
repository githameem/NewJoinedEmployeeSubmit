import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { every } from 'rxjs';
import { DistrictService } from 'src/app/app.services/district.service';
import { DivisionService } from 'src/app/app.services/division.service';
import { EmployeeContactService } from 'src/app/app.services/employee-contact.service';
import { ThanaService } from 'src/app/app.services/thana.service';
import { UnionService } from 'src/app/app.services/union.service';
import { UpazilaService } from 'src/app/app.services/upazila.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  districtList:any;
  divisionList: any;
  thanaList: any;
  upazilaList: any;
  unionList: any;
  EmpId :any;
  contactInfo :any;
  showInsertButton = true;
  showUpdateButton = true;
  checked = false;
  sameAsPresent : boolean = false;
  constructor(private districtService : DistrictService, 
              private divisionService : DivisionService, 
              private thanaService : ThanaService,
              private upazilaService: UpazilaService,
              private unionService : UnionService,
              private contactService: EmployeeContactService,
              private messageService: NzMessageService,
              private cdr : ChangeDetectorRef)
  {  }
  ngOnInit(): void {
    this.EmpId = sessionStorage.getItem("EmpID");
    this.getContacts();
    this.getDistrict();
    this.getDivision();
    this.getThana();
    this.getUpazila();
    this.getUnion();
  }
 
  contactForm = new FormGroup({
    EmpID : new FormControl(''),
    Mobile : new FormControl('',Validators.required),
    Email: new FormControl('',[Validators.email,Validators.required]),
    EmailOffice: new FormControl({ value: '', disabled: true }),
    PABX:new FormControl({ value: '', disabled: true }),
    EmergContact:new FormControl('',Validators.required),
    EmergContactName: new FormControl('',Validators.required),
    EmergContactAddress: new FormControl('',Validators.required),
    RelationWith: new FormControl(''),
    FAX: new FormControl({ value: '', disabled: true }),
    SocialMediaID: new FormControl(''),
    PreVillage: new FormControl('',Validators.required),
    PerVillage: new FormControl('',Validators.required),
    PreRoad : new FormControl('',Validators.required),
    PerRoad: new FormControl('',Validators.required),
    PreDivisionID: new FormControl(0),
    PerDivisionID: new FormControl(0),
    PerThanaID: new FormControl(0),
    PreThanaID: new FormControl(0),
    PreDistrictID : new FormControl(0),
    PerDistrictID: new FormControl(0),
    PreUpazilaID : new FormControl(0),
    PerUpazilaID: new FormControl(0),
    PreUnionID : new FormControl(0),
    PerUnionID: new FormControl(0),
    PerPostOffice: new FormControl(''),
    PrePostOffice: new FormControl(''),
    PrePostCode: new FormControl(''),
    PerPostCode: new FormControl(''),
    PreVillageBan: new FormControl(''),
    PerVillageBan: new FormControl(''),
    PreRoadBan : new FormControl(''),
    PerRoadBan: new FormControl(''),
    PerPostOfficeBan: new FormControl(''),
    PrePostOfficeBan: new FormControl(''),
    PrePostCodeBan: new FormControl(''),
    PerPostCodeBan: new FormControl(''),
    BusStop : new FormControl('')
  })
  
  getContacts(){
    this.contactService.GetContactById(this.EmpId).subscribe({
      next:(res)=>{
        if (res.data != null) {
          this.showInsertButton = false;
        }
        if (res.data == undefined) {
          this.showUpdateButton = false
        }
        this.contactForm.patchValue({
          Mobile: res.data.mobile,
          Email: res.data.email,
          EmailOffice: res.data.emailOffice,
          PABX:res.data.pabx,
          EmergContact:res.data.emergContact,
          EmergContactName: res.data.emergContactName,
          EmergContactAddress: res.data.emergContactAddress,
          RelationWith: res.data.relationWith,
          FAX: res.data.fax,
          SocialMediaID:res.data.socialMediaID,
          PreVillage: res.data.preVillage,
          PerVillage: res.data.perVillage,
          PreRoad :res.data.preRoad,
          PerRoad: res.data.perRoad,
          PreDivisionID: res.data.preDivisionID,
          PerDivisionID:res.data.perDivisionID,
          PerThanaID: res.data.perThanaID,
          PreThanaID: res.data.preThanaID,
          PreDistrictID : res.data.preDistrictID,
          PerDistrictID: res.data.perDistrictID,
          PreUpazilaID: res.data.preUpazilaID,
          PerUpazilaID: res.data.perUpazilaID,
          PreUnionID: res.data.preUnionID,
          PerUnionID: res.data.perUnionID,
          PerPostOffice:res.data.perPostOffice,
          PrePostOffice: res.data.prePostOffice,
          PrePostCode: res.data.prePostCode,
          PerPostCode: res.data.perPostCode,
          PreVillageBan: res.data.preVillageBan,
          PerVillageBan: res.data.perVillageBan,
          PreRoadBan : res.data.preRoadBan,
          PerRoadBan: res.data.perRoadBan,
          PerPostOfficeBan: res.data.perPostOfficeBan,
          PrePostOfficeBan: res.data.prePostOfficeBan,
          PrePostCodeBan: res.data.prePostCodeBan,
          PerPostCodeBan: res.data.perPostCodeBan,
          BusStop : res.data.busStop
        });
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
  getDistrict()
  {
    this.districtService.GetDistricts().subscribe({
      next: (response)=>{
        this.districtList = response.datas;
        this.districtList.unshift({
          districtID: 0,  // Or a specific default ID, such as 0
          districtName: '-- Select --'
        });
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  getUpazila(){
    this.upazilaService.GetUpazilas().subscribe({
      next: (response)=>{
        this.upazilaList = response.datas;
        this.upazilaList.unshift({
          upazilaID: 0,  // Or a specific default ID, such as 0
          upazilaName: '-- Select --'
        });
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  onUpazilaChange(upazilaId :any)
  {
    this.unionService.GetAllUnionsByUpazila(upazilaId).subscribe({
      next: (res)=>{
        this.unionList = res.datas;
        this.unionList.unshift({
          unionID: 0,  // Or a specific default ID, such as 0
          unionName: '-- Select --'
        });
      }
    })
  }
  getUnion(){
    this.unionService.GetAllUnions().subscribe({
      next: (response)=>{
        this.unionList = response.datas;
        this.unionList.unshift({
          unionID: 0,  // Or a specific default ID, such as 0
          unionName: '-- Select --'
        });
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  onDistrictChange(districtId :any)
  {
    this.thanaService.GetAllThanasByDistrict(districtId).subscribe({
      next: (res)=>{
        this.thanaList = res.datas;
        this.thanaList.unshift({
          thanaID: 0,  // Or a specific default ID, such as 0
          thanaName: '-- Select --'
        });
      }
    })
    this.upazilaService.GetAllUpazilasByDistrict(districtId).subscribe({
      next: (res)=>{
        this.upazilaList = res.datas;
        this.upazilaList.unshift({
          upazilaID: 0,  // Or a specific default ID, such as 0
          upazilaName: '-- Select --'
        });
      }
    })
  }
  getDivision(){
    this.divisionService.Getdivisions().subscribe({
      next: (response)=>{
        this.divisionList = response.datas;
        this.divisionList.unshift({
          divisionID: 0,  // Or a specific default ID, such as 0
          divisionName: '-- Select --'
        });
      }
    })
  }
  onDivisionChange(divisionID: any){
    this.districtService.GetAllDistrictByDivision(divisionID).subscribe({
      next:(res)=>{
        this.districtList = res.datas;
        this.districtList.unshift({
          districtID: 0,  // Or a specific default ID, such as 0
          districtName: '-- Select --'
        });
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  getThana(){
    this.thanaService.GetThanas().subscribe({
      next: (response)=>{
        this.thanaList = response.datas;
        this.thanaList.unshift({
          thanaID: 0,  // Or a specific default ID, such as 0
          thanaName: '-- Select --'
        });
      }
    })
  }

  submitForm(): void 
  {
    this.contactForm.value.EmpID = this.EmpId;
    if (this.contactForm.valid) 
    {
      var contactFormValue = this.contactForm.value;
      this.contactService.AddNewContact(contactFormValue).subscribe({
        next:(res)=>{
          this.messageService.success(res.message)
          this.getContacts();
          this.showUpdateButton = true;
        },
        error: (err)=>{
          this.messageService.error(err.message)
        }
      })

    } else {
      Object.values(this.contactForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  UpdateInfo():void
  {
    this.contactForm.value.EmpID = this.EmpId;
    var contactFormValue = this.contactForm.value;
    this.contactService.UpdateContact(contactFormValue).subscribe({
      next:(res)=>{
        this.messageService.success(res.message);
        this.getContacts();
      },
      error: (err)=>{
        this.messageService.error(err.message)
      }
    })
  }
  onCheckboxChange(value: boolean): void 
  {
    if (value == true) 
    {
       // Set the present address values to the permanent address
    this.contactForm.patchValue({
      PerVillage: this.contactForm.get('PreVillage')?.value,
      PerVillageBan: this.contactForm.get('PreVillageBan')?.value,
      PerRoad: this.contactForm.get('PreRoad')?.value,
      PerRoadBan: this.contactForm.get('PreRoadBan')?.value,
      PerDivisionID: this.contactForm.get('PreDivisionID')?.value,
      PerDistrictID: this.contactForm.get('PreDistrictID')?.value,
      PerUpazilaID: this.contactForm.get('PreUpazilaID')?.value,
      PerUnionID: this.contactForm.get('PreUnionID')?.value,
      PerThanaID: this.contactForm.get('PreThanaID')?.value,
      PerPostOffice: this.contactForm.get('PrePostOffice')?.value,
      PerPostOfficeBan: this.contactForm.get('PrePostOfficeBan')?.value,
      PerPostCode: this.contactForm.get('PrePostCode')?.value
    });
    } 
    else
    {
      this.contactForm.patchValue({
        PerVillage: '',
        PerVillageBan: '',
        PerRoad: '',
        PerRoadBan: '',
        PerDivisionID: 0,
        PerDistrictID: 0,
        PerUpazilaID: 0,
        PerUnionID: 0,
        PerThanaID: 0,
        PerPostOffice: '',
        PerPostOfficeBan: '',
        PerPostCode: ''
      });
    }
    console.log('Checkbox is checked:', value);
  }

}
