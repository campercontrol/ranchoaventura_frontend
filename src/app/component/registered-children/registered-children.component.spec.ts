import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredChildrenComponent } from './registered-children.component';

describe('RegisteredChildrenComponent', () => {
  let component: RegisteredChildrenComponent;
  let fixture: ComponentFixture<RegisteredChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredChildrenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
