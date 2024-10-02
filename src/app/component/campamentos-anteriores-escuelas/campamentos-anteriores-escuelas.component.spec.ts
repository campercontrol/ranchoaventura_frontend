import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampamentosAnterioresEscuelasComponent } from './campamentos-anteriores-escuelas.component';

describe('CampamentosAnterioresEscuelasComponent', () => {
  let component: CampamentosAnterioresEscuelasComponent;
  let fixture: ComponentFixture<CampamentosAnterioresEscuelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampamentosAnterioresEscuelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampamentosAnterioresEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
