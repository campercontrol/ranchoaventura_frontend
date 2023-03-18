import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAgrupacionComponent } from './agregar-agrupacion.component';

describe('AgregarAgrupacionComponent', () => {
  let component: AgregarAgrupacionComponent;
  let fixture: ComponentFixture<AgregarAgrupacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAgrupacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAgrupacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
