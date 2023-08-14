import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PaymentsService } from 'src/services/payments.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {
  activeIndex1: number = 0;

  activeIndex2: number = 0;
  activeIndex: number = 0;
	public isCollapsed = true;

  alumnos= [{id:1,acampador:"alan camper"},{id:2,acampador:"prueba de camper"},{id:3,acampador:"prueba de camper3"},{id:4,acampador:"prueba de camper4"},{id:5,acampador:"prueba de camper5"}]
  id:any="";
  selectedCustomers: any[];
  
  loading: boolean = false;
  tabla:any=[];
  @ViewChild("content")content:ElementRef;

  tiposPago:any=[];
  tiposMovimiento:any=[];
  metodoPago:any=0;
  monto:number=0;
  tipMovimiento:any=0;
  numeroTrans:number=0;
  updatePage:FormGroup;
  updateRes={};
  
  idCamp: any=0;
  idCamper:any =0;
  info: any = {};
  camperIncamp= false;
  camperIncampValue= 0;
  newPayments:FormGroup;
  fecha :any = new Date();
  parent_id =0;
  closeResult = '';
  idUpdate = 0;


  constructor(private routesA:ActivatedRoute,private pages: PaymentsService, private formBuild:FormBuilder,private modalService: NgbModal,config: NgbModalConfig ) {
    this.routesA.params.subscribe((params) => {
      this.idCamp = params['idCamp'];
      this.idCamper = params['idCamper'];
      if(this.idCamper>0 || this.idCamp>0){
        this.pages.getpage(this.idCamp,this.idCamper).subscribe((res)=>{
          console.log(res);
          
          this.info = res;
          this.camperIncamp = true;
          this.tiposPago = this.info.payment_methods;
          this.tiposMovimiento = this.info.transaction_type;
          this.parent_id = this.info.parent_id;
          this.tabla = this.info.payment_table
        })
      }else{
        this.camperIncamp = false;
      }
    
    })
    config.backdrop = 'static';
		config.keyboard = false;
   }

  ngOnInit(): void {

    this.newPayments = this.formBuild.group({

      paid: [true],
      payment_amount: [0,[Validators.required]],
      payment_date: ["",[Validators.required,Validators.minLength(2)]],
      txn_number: ["",[Validators.required,Validators.minLength(2)]],
      camp_id: [this.idCamp],
      camper_id: [this.idCamper],
      currency_id:[1],
      parent_id:[this.parent_id],
      payment_method_id:[0,[Validators.required,Validators.min(1)]],
      txn_type_id:[0,[Validators.required,Validators.min(1)]],
      created_at: [this.fecha]

    });
    this.updatePage = this.formBuild.group({

      paid: [true],
      payment_amount: [0,[Validators.required]],
      payment_date: ["",[Validators.required,Validators.minLength(2)]],
      txn_number: ["",[Validators.required,Validators.minLength(2)]],
      camp_id: [this.idCamp],
      camper_id: [this.idCamper],
      currency_id:[1],
      parent_id:[this.parent_id],
      payment_method_id:[0,[Validators.required,Validators.min(1)]],
      txn_type_id:[0,[Validators.required,Validators.min(1)]],
      created_at: [this.fecha]

    });
  }


  createPage(){
    this.newPayments.patchValue({
      parent_id:this.info.parent_id,
      camper_id:this.info.camper_id,
      camp_id:this.info.camp_id
    })
    this.pages.setpage(this.newPayments.value).subscribe((res)=>{
      console.log(res);
     
      this.returnInfo();
      this.reteForm();
      
    })
  }

  reteForm(){
    this.newPayments.reset();
    this.newPayments.patchValue({
      parent_id:this.info.parent_id,
      currency_id:1,
      paid:true,
      created_at:this.fecha,
      txn_type_id:0,
      camp_id:this.idCamp,
      camper_id:this.idCamper,
      payment_method_id:0


    })
  }

  returnInfo(){
    if(this.idCamper>0 || this.idCamp>0){
      this.pages.getpage(this.idCamp,this.idCamper).subscribe((res)=>{
        console.log(res);
        
        this.info = res;
        this.camperIncamp = true;
        this.tiposPago = this.info.payment_methods;
        this.tiposMovimiento = this.info.transaction_type;
        this.parent_id = this.info.parent_id;
        this.tabla = this.info.payment_table
      })
    }else{
      //this.camperIncamp = false;
      this.camperIncampview()
    }
  }

  camperIncampview(){
    console.log(this.camperIncampValue);
    
    this.pages.getpage(0,0,this.camperIncampValue).subscribe((res)=>{
      console.log(res);
      
      this.info = res;
      this.camperIncamp = true;
      this.tiposPago = this.info.payment_methods;
      this.tiposMovimiento = this.info.transaction_type;
      this.parent_id = this.info.parent_id;
      this.tabla = this.info.payment_table
    })
  }

  open(id) {
    this.idUpdate = id;
   
   this.pages.getPageIndi(id).subscribe((data:any)=>{
    let res = data.data;
    
    this.updatePage.patchValue({
      "id": res.id,
      "payment_amount": res.payment_amount,
      "paid": true,
      "camp_id": res.camp_id,
      "parent_id": res.parent_id,
      "txn_type_id": res.txn_type_id,
      "updated_at": this.fecha,
      "payment_date": res.payment_date,
      
      "txn_number":res.txn_number,
      "camper_id": res.camper_id,
      "currency_id": res.currency_id,
      "payment_method_id": res.payment_method_id,
    })
   })
    
		this.modalService.open(this.content);
	}
  update(){
    this.pages.updatepage(this.idUpdate,this.updatePage.value).subscribe((data:any)=>{
      console.log(data);
      this.returnInfo();
      this.modalService.dismissAll(this.content);
    });

  }

}
