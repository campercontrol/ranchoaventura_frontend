import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampamentosNuevosComponent } from './campamentos-nuevos.component';

describe('CampamentosNuevosComponent', () => {
  let component: CampamentosNuevosComponent;
  let fixture: ComponentFixture<CampamentosNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampamentosNuevosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampamentosNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
