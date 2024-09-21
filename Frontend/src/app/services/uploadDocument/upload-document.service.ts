import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-Config-Service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadDocumentService {
  private url: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.url = this.apiConfig.getBaseUrl() + 'api/uploadDocument';
  }

  updateVerifyDocument(id: string, document: File): Observable<any> {
    const updateUrl = `${this.url}/${id}`;
    const formData = new FormData();
    formData.append('document', document);
    return this.http.put(updateUrl, formData);
  }

}
