import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStaffComponent } from './lista-staff.component';

describe('ListaStaffComponent', () => {
  let component: ListaStaffComponent;
  let fixture: ComponentFixture<ListaStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
