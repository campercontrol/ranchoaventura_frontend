import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologicalBackgroundComponent } from './pathological-background.component';

describe('PathologicalBackgroundComponent', () => {
  let component: PathologicalBackgroundComponent;
  let fixture: ComponentFixture<PathologicalBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathologicalBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologicalBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
