import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppAntdModule } from './app.antd/app.antd.module';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RouterModule, provideRouter } from '@angular/router';
import { AppLandingModule } from './app.landing/app.landing.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NoPageFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppAntdModule,
    AppRoutingModule,
    AppLandingModule,
    DatePipe,
    NzSpinModule
],
  providers: [
    {
      provide: NZ_I18N, useValue: en_US
     },DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
