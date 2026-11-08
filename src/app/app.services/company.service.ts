import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetCompanies(): Observable<any> {
    return this._HttpClient.get(this.baseURL + 'Company/GetAllCompanies');
  }
}
