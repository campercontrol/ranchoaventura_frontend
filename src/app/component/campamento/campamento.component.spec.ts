import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampamentoComponent } from './campamento.component';

describe('CampamentoComponent', () => {
  let component: CampamentoComponent;
  let fixture: ComponentFixture<CampamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
