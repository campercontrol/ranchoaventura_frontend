import { TestBed } from '@angular/core/testing';

import { AdmiService } from './admi.service';

describe('AdmiService', () => {
  let service: AdmiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
