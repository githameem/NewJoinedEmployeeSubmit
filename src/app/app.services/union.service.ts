import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnionService {

  constructor(private _HttpClient:HttpClient) { }
  baseURL = environment.apiUrl;

  GetAllUnions(): Observable<any> {
    return this._HttpClient.get(
      this.baseURL + 'Location/GetAllUnions'
    );
  }
  GetAllUnionsByUpazila(upazilaID: number) :Observable<any> {
    const payload = JSON.stringify(upazilaID);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(
      this.baseURL + "Location/GetAllUnionsByUpazila",
      payload,{headers:headers}
    );
  }
}
