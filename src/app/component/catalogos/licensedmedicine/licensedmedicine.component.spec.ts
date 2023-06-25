import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensedmedicineComponent } from './licensedmedicine.component';

describe('LicensedmedicineComponent', () => {
  let component: LicensedmedicineComponent;
  let fixture: ComponentFixture<LicensedmedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensedmedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensedmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
