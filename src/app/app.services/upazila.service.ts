import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpazilaService {

  constructor(private _HttpClient:HttpClient) { }
  baseURL = environment.apiUrl;

  GetUpazilas(): Observable<any> {
    return this._HttpClient.get(
      this.baseURL + 'Location/GetAllUpazilas'
    );
  }
  GetAllUpazilasByDistrict(districtID: number) :Observable<any> {
    const payload = JSON.stringify(districtID);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + "Location/GetAllUpazilaByDistrict",
      payload,{headers:headers}
    );
  }
}
