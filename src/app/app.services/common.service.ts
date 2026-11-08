import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService<T> {
  constructor(private _HttpClient: HttpClient) {}


  GetById(id: any, url :string) {
    const payload = { id: id };
    return this._HttpClient.post(url,payload);
  }
  GetByCode(Code: any,url:string) {
    const payload = { Code: Code };
    return this._HttpClient.post(url,payload);
  }
  GetCodeEF(Code: any,url:string) {
    const payload = { Code: Code };
    return this._HttpClient.post(url,payload);
  }
  update(entity:T, url:string): Observable<T> {
    return this._HttpClient.post<T>(url, entity);
  }
  Add(entity: T, url:string): Observable<T> {
    return this._HttpClient.post<T>(url, entity);
  }
  Delete(entity: T, url:string): Observable<T> {
    return this._HttpClient.post<T>(url, entity);
  }

}
