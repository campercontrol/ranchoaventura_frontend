import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCamperComponent } from './update-camper.component';

describe('UpdateCamperComponent', () => {
  let component: UpdateCamperComponent;
  let fixture: ComponentFixture<UpdateCamperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCamperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCamperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
