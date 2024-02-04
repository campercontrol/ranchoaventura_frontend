import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffCreateComponent } from './admin-staff-create.component';

describe('AdminStaffCreateComponent', () => {
  let component: AdminStaffCreateComponent;
  let fixture: ComponentFixture<AdminStaffCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaffCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaffCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
