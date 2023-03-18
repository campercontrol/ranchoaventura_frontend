import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperNuevoComponent } from './camper-nuevo.component';

describe('CamperNuevoComponent', () => {
  let component: CamperNuevoComponent;
  let fixture: ComponentFixture<CamperNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamperNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
