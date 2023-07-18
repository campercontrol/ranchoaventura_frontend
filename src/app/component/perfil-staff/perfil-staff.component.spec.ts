import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilStaffComponent } from './perfil-staff.component';

describe('PerfilStaffComponent', () => {
  let component: PerfilStaffComponent;
  let fixture: ComponentFixture<PerfilStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
