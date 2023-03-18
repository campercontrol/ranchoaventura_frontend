import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampamentosStaffComponent } from './campamentos-staff.component';

describe('CampamentosStaffComponent', () => {
  let component: CampamentosStaffComponent;
  let fixture: ComponentFixture<CampamentosStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampamentosStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampamentosStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
