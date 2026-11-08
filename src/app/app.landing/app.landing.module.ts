import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLandingRoutingModule } from './app.landing-routing.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { DrivingLicenseComponent } from './driving-license/driving-license.component';
import { EducationInfoComponent } from './education-info/education-info.component';
import { EmployeePhotoComponent } from './employee-photo/employee-photo.component';
import { ExperienceInfoComponent } from './experience-info/experience-info.component';
import { NomineeInfoComponent } from './nominee-info/nominee-info.component';
import { PassportInfoComponent } from './passport-info/passport-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ReferencesInfoComponent } from './references-info/references-info.component';
import { TrainingInfoComponent } from './training-info/training-info.component';
import { AppAntdModule } from '../app.antd/app.antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinalSubmitComponent } from './final-submit/final-submit.component';
import { SignatureComponent } from './signature/signature.component';


@NgModule({
  declarations: [
    BasicInfoComponent,
    ContactInfoComponent,
    DrivingLicenseComponent,
    EducationInfoComponent,
    EmployeePhotoComponent,
    ExperienceInfoComponent,
    NomineeInfoComponent,
    PassportInfoComponent,
    PersonalInfoComponent,
    ReferencesInfoComponent,
    TrainingInfoComponent,
    FinalSubmitComponent,
    SignatureComponent,
    
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AppLandingRoutingModule,
    AppAntdModule
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    BasicInfoComponent,
    ContactInfoComponent,
    DrivingLicenseComponent,
    EducationInfoComponent,
    EmployeePhotoComponent,
    ExperienceInfoComponent,
    NomineeInfoComponent,
    PassportInfoComponent,
    PersonalInfoComponent,
    ReferencesInfoComponent,
    TrainingInfoComponent,

  ]
})
export class AppLandingModule { }
