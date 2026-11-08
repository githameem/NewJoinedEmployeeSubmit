import { NgModule } from '@angular/core';
import { RouterModule, Routes, withHashLocation } from '@angular/router';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { BasicInfoComponent } from './app.landing/basic-info/basic-info.component';
import { ContactInfoComponent } from './app.landing/contact-info/contact-info.component';
import { DrivingLicenseComponent } from './app.landing/driving-license/driving-license.component';
import { EducationInfoComponent } from './app.landing/education-info/education-info.component';
import { EmployeePhotoComponent } from './app.landing/employee-photo/employee-photo.component';
import { ExperienceInfoComponent } from './app.landing/experience-info/experience-info.component';
import { NomineeInfoComponent } from './app.landing/nominee-info/nominee-info.component';
import { PassportInfoComponent } from './app.landing/passport-info/passport-info.component';
import { PersonalInfoComponent } from './app.landing/personal-info/personal-info.component';
import { ReferencesInfoComponent } from './app.landing/references-info/references-info.component';
import { TrainingInfoComponent } from './app.landing/training-info/training-info.component';
import { FinalSubmitComponent } from './app.landing/final-submit/final-submit.component';
import { AuthGuard } from './app.guard/auth.guard';
import { SignatureComponent } from './app.landing/signature/signature.component';
const routes: Routes = [
  {
    path: '',
    component: BasicInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'basic/:key',
    component: BasicInfoComponent
  },
  {
    path: 'contact',
    component: ContactInfoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'drivinglicense',
    component: DrivingLicenseComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'education',
    component: EducationInfoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'photo',
    component: EmployeePhotoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'experience',
    component: ExperienceInfoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'nominee',
    component: NomineeInfoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'passport',
    component: PassportInfoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'personal',
    component: PersonalInfoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'reference',
    component: ReferencesInfoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'training',
    component: TrainingInfoComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'finalsubmit',
    component: FinalSubmitComponent
  },
  {
    path: 'signature',
    component:SignatureComponent
  },
  {
    path: '**',
    component: NoPageFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
