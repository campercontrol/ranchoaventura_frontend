import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditStaffComponent } from './admin-edit-staff.component';

describe('AdminEditStaffComponent', () => {
  let component: AdminEditStaffComponent;
  let fixture: ComponentFixture<AdminEditStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
