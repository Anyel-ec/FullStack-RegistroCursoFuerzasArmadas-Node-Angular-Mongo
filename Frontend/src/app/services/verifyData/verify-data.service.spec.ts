import { TestBed } from '@angular/core/testing';

import { VerifyDataService } from './verify-data.service';

describe('VerifyDataService', () => {
  let service: VerifyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
