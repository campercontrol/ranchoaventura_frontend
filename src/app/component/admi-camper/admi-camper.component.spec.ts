import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiCamperComponent } from './admi-camper.component';

describe('AdmiCamperComponent', () => {
  let component: AdmiCamperComponent;
  let fixture: ComponentFixture<AdmiCamperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiCamperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiCamperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
