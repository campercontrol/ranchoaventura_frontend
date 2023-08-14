import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasExtrasComponent } from './preguntas-extras.component';

describe('PreguntasExtrasComponent', () => {
  let component: PreguntasExtrasComponent;
  let fixture: ComponentFixture<PreguntasExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntasExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
