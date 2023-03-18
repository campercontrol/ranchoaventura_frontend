import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsInscripcionCampComponent } from './parents-inscripcion-camp.component';

describe('ParentsInscripcionCampComponent', () => {
  let component: ParentsInscripcionCampComponent;
  let fixture: ComponentFixture<ParentsInscripcionCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsInscripcionCampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsInscripcionCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
