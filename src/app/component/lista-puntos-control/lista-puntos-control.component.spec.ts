import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPuntosControlComponent } from './lista-puntos-control.component';

describe('ListaPuntosControlComponent', () => {
  let component: ListaPuntosControlComponent;
  let fixture: ComponentFixture<ListaPuntosControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPuntosControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPuntosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
