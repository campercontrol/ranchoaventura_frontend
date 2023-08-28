import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiuserComponent } from './admiuser.component';

describe('AdmiuserComponent', () => {
  let component: AdmiuserComponent;
  let fixture: ComponentFixture<AdmiuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
