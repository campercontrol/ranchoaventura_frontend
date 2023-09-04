import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiPagosComponent } from './admi-pagos.component';

describe('AdmiPagosComponent', () => {
  let component: AdmiPagosComponent;
  let fixture: ComponentFixture<AdmiPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
