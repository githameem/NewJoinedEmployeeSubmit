import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeBasic } from '../app.interfaces/employee-basic';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { environment } from '../environments/environment.development';
import { ResponseDTO } from '../app.interfaces/response-dto';

@Injectable({
  providedIn: 'root',
})
export class BasicInformationService {
  constructor(private _HttpClient: HttpClient, private service : CommonService<EmployeeBasic>) {}

  baseURL = environment.apiUrl;

  GetBasicInfoById(id: any) {
    const payload = { id: id };
    return this._HttpClient.post(this.baseURL+"EmployeeBasic/GetEmployeeBasicById",payload);
  }

  // GetBasicInfoByCode(Code: string): Observable<any> {
  //   const payload = { Code: Code };
  //   return this._HttpClient.get<ResponseDTO<any>>(this.baseURL + 'EmployeeBasic/GetEmployeeBasicByCode?Code='+ Code);
  // }
  GetBasicInfoByCode(Code: string): Observable<any> {
    const payload = JSON.stringify(Code);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post<any>(this.baseURL + "EmployeeBasic/GetEmployeeBasicByCode", payload, { headers: headers });
  }
  GetBasicInfoByCodeEF(Code: any) {
    const payload = { Code: Code };
    return this._HttpClient.post<ResponseDTO<any>>(this.baseURL+"EmployeeBasic/GetEmployeeBasicByCode",payload);
  }

  updateEmployee(employee: any): Observable<any> 
  {
    return this._HttpClient.post<any>(this.baseURL+"EmployeeBasic/UpdateEmployeeBasic", employee);
  }
  UpdateEmployeeBasicWithFile(employeeBasic: any): Observable<any> 
  {
    return this._HttpClient.post<any>(this.baseURL+"EmployeeBasic/UpdateEmployeeBasicWithFile", employeeBasic);
  }
  AddNewEmployee(employee: EmployeeBasic): Observable<EmployeeBasic> 
  {
    return this._HttpClient.post<any>(this.baseURL+"EmployeeBasic/AddNewEmployeeBasic", employee);
  }
}
