import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-Config-Service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyDataService {
  private url: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.url = this.apiConfig.getBaseUrl() + 'api/verifyData';

  }

  getRelationsVerifyData(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteVerifyData(id: string): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl);
  }

  updateVerifyData(id: string, updatedData: any): Observable<any> {
    const updateUrl = `${this.url}/${id}`;
    return this.http.put(updateUrl, updatedData);
  }
  

}
