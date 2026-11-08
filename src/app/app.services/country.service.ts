import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL = environment.apiUrl;

  GetCountries(): Observable<any> {
    return this._HttpClient.get(
      this.baseURL + 'Country/GetAllCountries'
    );
  }
}
