import { TestBed } from '@angular/core/testing';

import { CreateCampsService } from './create-camps.service';

describe('CreateCampsService', () => {
  let service: CreateCampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
