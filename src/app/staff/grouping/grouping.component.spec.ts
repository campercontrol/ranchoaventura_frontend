import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoupingComponent } from './grouping.component';

describe('RoupingComponent', () => {
  let component: RoupingComponent;
  let fixture: ComponentFixture<RoupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoupingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
