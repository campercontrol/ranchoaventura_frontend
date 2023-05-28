import { TestBed } from '@angular/core/testing';

import { ChekpointService } from './chekpoint.service';

describe('ChekpointService', () => {
  let service: ChekpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChekpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
