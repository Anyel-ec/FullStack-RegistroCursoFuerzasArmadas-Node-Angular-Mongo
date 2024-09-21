import { TestBed } from '@angular/core/testing';

import { VerifyDocumentService } from './verify-document.service';

describe('VerifyDocumentService', () => {
  let service: VerifyDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
