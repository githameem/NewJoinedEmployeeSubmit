import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelationshipService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL = environment.apiUrl;
  GetRelationhips(): Observable<any> {
    return this._HttpClient.get(
      this.baseURL + 'Relationship/GetAllRelationships'
    );
  }
}
