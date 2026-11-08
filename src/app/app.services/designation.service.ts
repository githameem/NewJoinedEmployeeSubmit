import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DesignationService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;

  GetDesignations(): Observable<any> {
    return this._HttpClient.get(this.baseURL + 'Designation/GetAllDesignation');
  }
}
