import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProspectosComponent } from './lista-prospectos.component';

describe('ListaProspectosComponent', () => {
  let component: ListaProspectosComponent;
  let fixture: ComponentFixture<ListaProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProspectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
