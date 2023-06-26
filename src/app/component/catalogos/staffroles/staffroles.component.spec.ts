import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffrolesComponent } from './staffroles.component';

describe('StaffrolesComponent', () => {
  let component: StaffrolesComponent;
  let fixture: ComponentFixture<StaffrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffrolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
