import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampamentosAnterioresComponent } from './campamentos-anteriores.component';

describe('CampamentosAnterioresComponent', () => {
  let component: CampamentosAnterioresComponent;
  let fixture: ComponentFixture<CampamentosAnterioresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampamentosAnterioresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampamentosAnterioresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
