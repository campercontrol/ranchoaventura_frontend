import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEscuelaComponent } from './perfil-escuela.component';

describe('PerfilEscuelaComponent', () => {
  let component: PerfilEscuelaComponent;
  let fixture: ComponentFixture<PerfilEscuelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilEscuelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
