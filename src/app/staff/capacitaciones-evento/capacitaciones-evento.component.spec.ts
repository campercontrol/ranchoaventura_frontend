import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionesEventoComponent } from './capacitaciones-evento.component';

describe('CapacitacionesEventoComponent', () => {
  let component: CapacitacionesEventoComponent;
  let fixture: ComponentFixture<CapacitacionesEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionesEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitacionesEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
