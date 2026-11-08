import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DrivingLicense } from '../app.interfaces/driving-license';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrivingLicenseService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetDrivingLicenseById(id: any): Observable<any> {
    const payload = JSON.stringify(id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + 'DrivingLicense/GetDrivingLicenseById',
      payload,{headers:headers}
    );
  }

  AddNewDrivingLicense(
    drivingLicense: any
  ): Observable<any> {
    return this._HttpClient.post<any>(
      this.baseURL + 'DrivingLicense/AddNewDrivingLicense',
      drivingLicense
    );
  }
  UpdateDrivingLicense(
    drivingLicense: any
  ): Observable<any> {
    return this._HttpClient.post<DrivingLicense>(
      this.baseURL + 'DrivingLicense/UpdateDrivingLicense',
      drivingLicense
    );
  }

  DeleteDrivingLicense(id: any) {
    const payload = { EmpId: id };
    return this._HttpClient.post<any>(
      this.baseURL + 'DrivingLicense/DeleteDrivingLicense',
      payload
    );
  }
}
