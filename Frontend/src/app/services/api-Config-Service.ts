import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private baseUrl: string = 'http://localhost:3001/';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
