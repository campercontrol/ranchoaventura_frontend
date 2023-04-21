import { TestBed } from '@angular/core/testing';

import { CampsService } from './camps.service';

describe('CampsService', () => {
  let service: CampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
