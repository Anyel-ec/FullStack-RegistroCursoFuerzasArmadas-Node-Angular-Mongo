import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-Config-Service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyDocumentService {
  private url: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.url = this.apiConfig.getBaseUrl() + 'api/verifyDocument';

  }

  getRelationsVerifyDocument(): Observable<any> {
    return this.http.get(this.url);
  }

  updateVerifyDocument(id: string, updatedData: any): Observable<any> {
    const updateUrl = `${this.url}/${id}`;
    return this.http.put(updateUrl, updatedData);
  }

  deleteVerifyDocument(id: string): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl);
  }
  
  updateUploadDocumentAgain(id: string): Observable<any> {
    const updateUrl = `${this.url}/again/${id}`;
    return this.http.put(updateUrl,id);
  }
  

}
