import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  private baseUrl = 'http://localhost:3001/api/load';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/province`);
  }

  getGender(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gender`);
  }

  getCommandType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/command`);
  }

}
