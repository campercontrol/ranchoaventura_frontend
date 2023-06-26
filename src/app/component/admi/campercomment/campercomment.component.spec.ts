import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampercommentComponent } from './campercomment.component';

describe('CampercommentComponent', () => {
  let component: CampercommentComponent;
  let fixture: ComponentFixture<CampercommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampercommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampercommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
