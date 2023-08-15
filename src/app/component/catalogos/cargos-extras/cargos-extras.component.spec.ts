import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosExtrasComponent } from './cargos-extras.component';

describe('CargosExtrasComponent', () => {
  let component: CargosExtrasComponent;
  let fixture: ComponentFixture<CargosExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargosExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargosExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
