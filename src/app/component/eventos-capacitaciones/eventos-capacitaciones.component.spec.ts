import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosCapacitacionesComponent } from './eventos-capacitaciones.component';

describe('EventosCapacitacionesComponent', () => {
  let component: EventosCapacitacionesComponent;
  let fixture: ComponentFixture<EventosCapacitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosCapacitacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosCapacitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
