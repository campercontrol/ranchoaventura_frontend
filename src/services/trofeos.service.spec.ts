import { TestBed } from '@angular/core/testing';

import { TrofeosService } from './trofeos.service';

describe('TrofeosService', () => {
  let service: TrofeosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrofeosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
