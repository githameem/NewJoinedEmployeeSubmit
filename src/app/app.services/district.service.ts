import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetDistricts(): Observable<any> {
    return this._HttpClient.get(
      this.baseURL + 'Location/GetAllDistricts'
    );
  }
  GetAllDistrictByDivision(divisionID: number) :Observable<any> {
    const payload = JSON.stringify(divisionID);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + "Location/GetAllDistrictsByDivision",
      payload,{headers:headers}
    );
  }
}
