import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PaymentsService } from 'src/services/payments.service';

@Component({
  selector: 'app-paymant-camp',
  templateUrl: `./paymant-camp.component.html`,
  styleUrls: ['./paymant-camp.component.css'],
})
export class PaymantCampComponent {
  cards = [
    { amount: 189800.0, title: 'Pagos recibidos', transactions: 98, bgClass: 'green-background', iconClass: 'pi pi-money-bill' },
    { amount: 6500.0, title: 'Depósito Bbva Kin Camp', transactions: 3, bgClass: 'blue-background', iconClass: 'pi pi-building' },
    { amount: 176800.0, title: 'Depósito Bbva Patricia', transactions: 93, bgClass: 'blue-background', iconClass: 'pi pi-building' },
    { amount: 6500.0, title: 'Paypal Patricia', transactions: 2, bgClass: 'blue-background', iconClass: 'pi pi-paypal' },
    { amount: 29, title: 'Registros activos', transactions: '', bgClass: 'orange-background', iconClass: 'pi pi-users' }
  ];
  @ViewChild("content")content:ElementRef;
  info;
  updatePage:FormGroup;
  tiposMovimiento: any;
  tiposPago: any;
  constructor(private routesA:ActivatedRoute,private pages: PaymentsService, private formBuild:FormBuilder,private modalService: NgbModal,config: NgbModalConfig, private render:Renderer2 ) {
    this.routesA.params.subscribe((params) => {
      const camp = params['camp'];
     
  
        console.log('si entro');
        
        this.pages.getpage(43942,camp).subscribe((res)=>{
          console.log(res,'informacion');
          
          this.info = res;
          this.tiposPago = this.info.payment_methods;
          this.tiposMovimiento = this.info.transaction_type;
   
        })
    })
      
  
   }
  selectedCampers: any[] = [];
  campers = [
      { id: 1, name: 'Camper 1', registered: true, kingswoodPP1: 100, clipPayment: 0, bbvaKinCampDeposit: 100, bbvaPatriciaDeposit: 200, cash: 50, totalPayments: 350, discounts: 10, refunds: 5, balance: 335 },
      { id: 2, name: 'Camper 2', registered: false, kingswoodPP1: 150, clipPayment: 75, bbvaKinCampDeposit: 150, bbvaPatriciaDeposit: 250, cash: 100, totalPayments: 500, discounts: 20, refunds: 0, balance: 480 },
      { id: 3, name: 'Camper 3', registered: true, kingswoodPP1: 200, clipPayment: 100, bbvaKinCampDeposit: 200, bbvaPatriciaDeposit: 300, cash: 75, totalPayments: 575, discounts: 15, refunds: 10, balance: 550 },
      { id: 4, name: 'Camper 4', registered: true, kingswoodPP1: 0, clipPayment: 0, bbvaKinCampDeposit: 0, bbvaPatriciaDeposit: 0, cash: 0, totalPayments: 0, discounts: 0, refunds: 0, balance: 0 },
      { id: 5, name: 'Camper 5', registered: false, kingswoodPP1: 180, clipPayment: 0, bbvaKinCampDeposit: 180, bbvaPatriciaDeposit: 220, cash: 30, totalPayments: 430, discounts: 5, refunds: 2, balance: 423 },
      { id: 6, name: 'Camper 6', registered: true, kingswoodPP1: 120, clipPayment: 90, bbvaKinCampDeposit: 120, bbvaPatriciaDeposit: 260, cash: 90, totalPayments: 470, discounts: 12, refunds: 0, balance: 458 },
      { id: 7, name: 'Camper 7', registered: true, kingswoodPP1: 160, clipPayment: 40, bbvaKinCampDeposit: 160, bbvaPatriciaDeposit: 180, cash: 40, totalPayments: 380, discounts: 8, refunds: 1, balance: 371 },
      { id: 8, name: 'Camper 8', registered: false, kingswoodPP1: 140, clipPayment: 20, bbvaKinCampDeposit: 140, bbvaPatriciaDeposit: 240, cash: 20, totalPayments: 400, discounts: 18, refunds: 3, balance: 379 },
      { id: 9, name: 'Camper 9', registered: true, kingswoodPP1: 220, clipPayment: 60, bbvaKinCampDeposit: 220, bbvaPatriciaDeposit: 300, cash: 60, totalPayments: 580, discounts: 10, refunds: 5, balance: 565 },
      { id: 10, name: 'Camper 10', registered: false, kingswoodPP1: 0, clipPayment: 0, bbvaKinCampDeposit: 0, bbvaPatriciaDeposit: 0, cash: 0, totalPayments: 0, discounts: 0, refunds: 0, balance: 0 }
  ];

  onHeaderCheckboxToggle(event: any) {
      this.selectedCampers = event.value; // Actualiza la selección
  }

  open() {
 
   
    
		this.modalService.open(this.content);
	}


  update(){
  
      this.modalService.dismissAll(this.content);
    

  }
  ngOnInit(): void {


    this.updatePage = this.formBuild.group({

      paid: [true],
      payment_amount: [0,[Validators.required]],
      payment_date: ["",[Validators.required,Validators.minLength(2)]],
      txn_number: ["",[Validators.required,Validators.minLength(2)]],
  
      currency_id:[2],
     
      payment_method_id:[0,[Validators.required,Validators.min(1)]],
      txn_type_id:[0,[Validators.required,Validators.min(1)]],
  

    });
  }
  
}
