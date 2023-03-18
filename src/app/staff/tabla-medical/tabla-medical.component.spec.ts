import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMedicalComponent } from './tabla-medical.component';

describe('TablaMedicalComponent', () => {
  let component: TablaMedicalComponent;
  let fixture: ComponentFixture<TablaMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
