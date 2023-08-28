import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiParentComponent } from './admi-parent.component';

describe('AdmiParentComponent', () => {
  let component: AdmiParentComponent;
  let fixture: ComponentFixture<AdmiParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
