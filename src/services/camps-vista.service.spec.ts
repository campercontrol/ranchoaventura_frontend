import { TestBed } from '@angular/core/testing';

import { CampsVistaService } from './camps-vista.service';

describe('CampsVistaService', () => {
  let service: CampsVistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampsVistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
