import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCampamentosComponent } from './mis-campamentos.component';

describe('MisCampamentosComponent', () => {
  let component: MisCampamentosComponent;
  let fixture: ComponentFixture<MisCampamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisCampamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisCampamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
