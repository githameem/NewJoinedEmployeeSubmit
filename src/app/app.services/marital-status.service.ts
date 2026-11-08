import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaritalStatusService {
  constructor(private _httpClient: HttpClient) {}
  baseURL = environment.apiUrl;

  GetMaritalStatus(): Observable<any> {
    return this._httpClient.get(
      this.baseURL + 'MaritalStatus/GetAllMaritalStatus'
    );
  }
}
