import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologicalBackgroundFamilyComponent } from './pathological-background-family.component';

describe('PathologicalBackgroundFamilyComponent', () => {
  let component: PathologicalBackgroundFamilyComponent;
  let fixture: ComponentFixture<PathologicalBackgroundFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathologicalBackgroundFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologicalBackgroundFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
