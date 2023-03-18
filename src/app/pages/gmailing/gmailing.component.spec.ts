import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailingComponent } from './gmailing.component';

describe('GmailingComponent', () => {
  let component: GmailingComponent;
  let fixture: ComponentFixture<GmailingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
