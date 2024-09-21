import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private baseUrl = 'http://localhost:3001/api/registers';

  constructor(private http: HttpClient) {}

  getRegisters(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getRegisterById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRegisterByIdentification(identification: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/identification/${identification}`);
  }

  createOrUpdateRegister(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateRegister(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  updateRegisterByIdentification(
    identification: string,
    data: any
  ): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/identification/${identification}`,
      data
    );
  }

  deleteRegister(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
