import { TestBed } from '@angular/core/testing';

import { UploadDocumentService } from './upload-document.service';

describe('UploadDocumentService', () => {
  let service: UploadDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
