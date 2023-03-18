import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoControlComponent } from './punto-control.component';

describe('PuntoControlComponent', () => {
  let component: PuntoControlComponent;
  let fixture: ComponentFixture<PuntoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntoControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
