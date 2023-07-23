import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEventComponent } from './training-event.component';

describe('TrainingEventComponent', () => {
  let component: TrainingEventComponent;
  let fixture: ComponentFixture<TrainingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
