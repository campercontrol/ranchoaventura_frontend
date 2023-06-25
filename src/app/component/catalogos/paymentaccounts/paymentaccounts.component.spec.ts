import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentaccountsComponent } from './paymentaccounts.component';

describe('PaymentaccountsComponent', () => {
  let component: PaymentaccountsComponent;
  let fixture: ComponentFixture<PaymentaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentaccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
