import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCampersEscuelasComponent } from './tabla-campers-escuelas.component';

describe('TablaCampersEscuelasComponent', () => {
  let component: TablaCampersEscuelasComponent;
  let fixture: ComponentFixture<TablaCampersEscuelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCampersEscuelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCampersEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
