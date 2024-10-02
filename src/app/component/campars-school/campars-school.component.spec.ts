import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamparsSchoolComponent } from './campars-school.component';

describe('CamparsSchoolComponent', () => {
  let component: CamparsSchoolComponent;
  let fixture: ComponentFixture<CamparsSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamparsSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamparsSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
