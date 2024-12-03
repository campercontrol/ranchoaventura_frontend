import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalComponentComponent } from './medical-component.component';

describe('MedicalComponentComponent', () => {
  let component: MedicalComponentComponent;
  let fixture: ComponentFixture<MedicalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
