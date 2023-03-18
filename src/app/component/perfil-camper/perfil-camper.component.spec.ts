import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCamperComponent } from './perfil-camper.component';

describe('PerfilCamperComponent', () => {
  let component: PerfilCamperComponent;
  let fixture: ComponentFixture<PerfilCamperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilCamperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCamperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
