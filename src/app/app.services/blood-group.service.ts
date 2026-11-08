import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BloodGroupService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL = environment.apiUrl;

  GetBloodGroups(): Observable<any> {
    return this._HttpClient.get(
      this.baseURL + 'BloodGroup/GetAllBloodgroups'
    );
  }
}
