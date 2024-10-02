import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampamentosProximosEscuelasComponent } from './campamentos-proximos-escuelas.component';

describe('CampamentosProximosEscuelasComponent', () => {
  let component: CampamentosProximosEscuelasComponent;
  let fixture: ComponentFixture<CampamentosProximosEscuelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampamentosProximosEscuelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampamentosProximosEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
