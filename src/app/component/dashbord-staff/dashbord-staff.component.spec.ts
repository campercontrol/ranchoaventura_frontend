import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordStaffComponent } from './dashbord-staff.component';

describe('DashbordStaffComponent', () => {
  let component: DashbordStaffComponent;
  let fixture: ComponentFixture<DashbordStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
