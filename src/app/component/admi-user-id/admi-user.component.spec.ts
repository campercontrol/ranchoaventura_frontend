import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiUserComponent } from './admi-user.component';

describe('AdmiUserComponent', () => {
  let component: AdmiUserComponent;
  let fixture: ComponentFixture<AdmiUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
