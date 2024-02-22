import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoAgrupacionesComponent } from './admin-tipo-agrupaciones.component';

describe('AdminTipoAgrupacionesComponent', () => {
  let component: AdminTipoAgrupacionesComponent;
  let fixture: ComponentFixture<AdminTipoAgrupacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTipoAgrupacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTipoAgrupacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
