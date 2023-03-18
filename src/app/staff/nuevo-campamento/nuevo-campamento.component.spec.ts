import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCampamentoComponent } from './nuevo-campamento.component';

describe('NuevoCampamentoComponent', () => {
  let component: NuevoCampamentoComponent;
  let fixture: ComponentFixture<NuevoCampamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoCampamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoCampamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
