import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupingAdmiComponent } from './grouping-admi.component';

describe('GroupingAdmiComponent', () => {
  let component: GroupingAdmiComponent;
  let fixture: ComponentFixture<GroupingAdmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupingAdmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupingAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
