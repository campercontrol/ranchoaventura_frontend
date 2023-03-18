import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TienditaComponent } from './tiendita.component';

describe('TienditaComponent', () => {
  let component: TienditaComponent;
  let fixture: ComponentFixture<TienditaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TienditaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TienditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
