import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgSelectComponent } from '@ng-select/ng-select';
import { log } from 'console';
import { set } from 'date-fns';
import { CatalogosService } from 'src/services/catalogos.service';
import { CreateCampsService } from 'src/services/create-camps.service';

@Component({
  selector: 'app-nuevo-campamento',
  templateUrl: './nuevo-campamento.component.html',
  styleUrls: ['./nuevo-campamento.component.scss']
})
export class NuevoCampamentoComponent implements OnInit,AfterViewInit {

  location:any = [];
  temporada:any = [];
  school:any = [];
  public formCamp!:FormGroup;
  currency:any = [];
  spinner:boolean = false;
  @ViewChild("name") name: ElementRef;
  @ViewChild("start") start: ElementRef;
  @ViewChild("end") end: ElementRef;
  @ViewChild("start_registration") start_registration: ElementRef;
  @ViewChild("end_registration") end_registration: ElementRef;
  @ViewChild("special_message") special_message: ElementRef;
  @ViewChild("special_message_admin") special_message_admin: ElementRef;
  @ViewChild("venue") venue: ElementRef;
  @ViewChild("photo_url") photo_url: ElementRef;
  @ViewChild("photo_password") photo_password: ElementRef;
  @ViewChild("currency_id") currency_id: ElementRef;
  @ViewChild("location_id", { static: false }) location_id!: NgSelectComponent;

  @ViewChild('school_id', { static: false }) school_id!: NgSelectComponent;

  @ViewChild("season_id") season_id: ElementRef;
  @ViewChild("insurance") insurance: ElementRef;
  @ViewChild("public_price") public_price: ElementRef;

  extra_question : any = [];
  extra_charges:any = [];
  alerQuestion = false;
  alercharges= false;
  extra_discounts = [];
  fecha = new Date();
  Catpaymanacout:any = []
  fecha_pago:any = [];
  alertPago =false
  tipoPago =[{'name':'Mercado pago','id':1},{'name':'Pago en escuela','id':2},{'name':'Ficha de pago','id':3},{'name':'Personalizado','id':4}]













  constructor(private createCamp: CreateCampsService, private formGrup: FormBuilder, private render :Renderer2,private router:Router, private catalogo :CatalogosService) {
 
    
   }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  payment_accounts:any = [];


 public Editor = ClassicEditor;

 ngAfterViewInit() {
  this.school_id.open();
 
}
  ngOnInit(): void {
     this.catalogo.getpaymentaccounts().subscribe((res: any) => {
      this.Catpaymanacout = res.data;
   
    });

       
    this.createCamp.getSede().subscribe((res:any)=>{
      this.location = res.data;
      this.location.sort((a, b) => b.name.localeCompare(a.name));


     });
     this.createCamp.getTemporada().subscribe((res:any)=>{
      this.temporada = res.data;
      //console.log(this.location);

     });
     this.createCamp.getcurrency().subscribe((res:any)=>{
      this.currency = res.data;
      //console.log(this.location);

     });
     this.createCamp.gerSchool().subscribe((res:any)=>{
      this.school = res.data;
      //console.log(this.location);

     });
    this.formCamp =this.formGrup.group({
      name: ["",[Validators.required,Validators.minLength(2)]], //listo
      start: ["",[Validators.required]], //listo
      end:  ["",[Validators.required]], //listo
      start_registration: ["",[Validators.required]], //listo
      end_registration:["",[Validators.required]], //listo
      registration: [true], //listo insurance
      url: [""], //listo
      special_message: [""],
      special_message_admin: [""],
      public_price:  [0,[Validators.required]], // listo 
      show_payment_parent:  [true], //listo
      show_mercadopago_button:[false],
      show_rebate_parent:  [true],//listo
      show_paypal_button:  [true],// listo
      show_payment_order:  [true],
      reminder_camp_days:  [15],//listo fecha limite de pago
      reminder_discount_days:  [10],//listo
      insurance:  [0,[Validators.required]], // listo
      venue:  ["",[Validators.required]], // listo 
      photo_url:  ["",[Validators.required]], // listo
      photo_password:  ["",[Validators.required]], // listo
      medical_report:  ["  "],//listo
      occupancy_camp:  [0], // cupo de campamentos faltante
      active:  [true], //listo
      general_camp:  [false], //listo
      currency_id: [0,[Validators.required,Validators.min(1)]],// listo
      location_id:  [0,[Validators.required,Validators.min(1)]], //listo
      school_id:  [0,[Validators.required,Validators.min(1)]], // listo
      season_id:  [0,[Validators.required,Validators.min(1)]], // listo
      created_at: [this.fecha],
      recommended_payment_dates:[''],
      extra_charges: [this.extra_charges],
      extra_question:[ this.extra_question],
      payment_accounts:[this.payment_accounts]
      
    })
    const today = new Date();

    // Configurar la fecha de inicio: hoy a las 6:30 AM
     const startDefault = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 30);
  
     // Configurar la fecha de fin: hoy a las 5:30 PM
     const endDefault = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 30);
  
     this.formCamp.patchValue({
        "start":this.formatDateToInputValue(startDefault),
        "end":this.formatDateToInputValue(endDefault)
     })
  }
  formatDateToInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  createCampPost(){
   // console.log(this.formCamp.value);
   this.spinner=true;
    if(this.formCamp.valid){
      this.formCamp.patchValue({

        recommended_payment_dates: this.arrayToJsonString(this.fecha_pago)

      }) 
    this.payment_accounts=  this.formCamp.get('payment_accounts').value;
      let a = {
          "camp":this.formCamp.value,
          "payment_accounts":this.payment_accounts,
          "extra_question":this.extra_question,
           "extra_charges":this.extra_charges,
           "extra_discounts":this.extra_discounts,
      }
      delete a.camp.payment_accounts;
      delete a.camp.extra_question;
      delete a.camp.extra_charges;

      if(this.payment_accounts.length==0){this.formCamp.patchValue({payment_accounts:[]})}
      if(this.extra_question.length==0){this.formCamp.patchValue({extra_question:[]})}
      if(this.extra_charges.length==0){this.formCamp.patchValue({extra_charges:[]})}
      if(this.extra_charges.length==0){this.formCamp.patchValue({extra_discounts:[]})}


console.log(a);

      this.createCamp.postCamp(a).subscribe((res:any)=>{
        console.log(res);
        this.extra_charges = [];
        this.extra_question= [];
        this.formCamp.reset;
        this.router.navigate(['dashboard/staff/camps'])
        
      },error=>{
        console.log(error);
        
      })
    }else{
      this.validateSeasonId();
      this.validateSchoolId();
      this.validateLocationId();
      this.validateCurrencyId();
      this.validatePhotoPassword();
      this.validatePhotoUrl();
      this.validateVenue();
      
      this.validateinsurance()
      this.validatepublic_price()
      this.validateEndRegistration();
      this.validateStartRegistration();
      this.validateEnd();
      this.validateStart();
      this.validateName();
      this.spinner=false;


    }
   
  }

  validateFormField(elementRef: any,name): void {
    if (this.formCamp.get(name).valid) {
      this.render.removeClass(elementRef.nativeElement, "is-invalid");
      this.render.addClass(elementRef.nativeElement, "is-valid");
    } else {
      this.render.removeClass(elementRef.nativeElement, "is-valid");
      this.render.addClass(elementRef.nativeElement, "is-invalid");
      elementRef.nativeElement.focus();
    }
  }

  validateName(): void {
    this.validateFormField(this.name,'name');
  }
  
  validateStart(): void {
    this.validateFormField(this.start,'start');
  }
  
  validateEnd(): void {
    this.validateFormField(this.end,'end');
  }
  
  validateStartRegistration(): void {
    this.validateFormField(this.start_registration,'start_registration');
  }
  
  validateEndRegistration(): void {
    this.validateFormField(this.end_registration,'end_registration');
  }
  
 
  
  validateVenue(): void {
    this.validateFormField(this.venue,'venue');
  }
  validateinsurance(): void {
    this.validateFormField(this.insurance,'insurance');
  }
  validatepublic_price(): void {
    this.validateFormField(this.public_price,'public_price');
  }
  
  validatePhotoUrl(): void {
    this.validateFormField(this.photo_url,'photo_url');
  }
  
  validatePhotoPassword(): void {
    this.validateFormField(this.photo_password,'photo_password');
  }
  
  validateCurrencyId(): void {
    this.validateFormField(this.currency_id,'currency_id');
  }
  
  validateLocationId(): void {
    this.validateLocotion();
  }
  
  validateSchoolId(): void {
    const schoolControl = this.formCamp.get('school_id');
  
  if (schoolControl?.valid) {
    // Si el control es válido, aplicar clase 'is-valid'
   } else {
    // Si el control es inválido, aplicar clase 'is-invalid'
    schoolControl?.markAsTouched();

      this.school_id.focus();
    }
  }

  validateLocotion(): void {
    const schoolControl = this.formCamp.get('location_id');
  
  if (schoolControl?.valid) {
    // Si el control es válido, aplicar clase 'is-valid'
   } else {
    // Si el control es inválido, aplicar clase 'is-invalid'
    schoolControl?.markAsTouched();

      this.location_id.focus();
    }
  }

 
    
  
  validateSeasonId(): void {
    this.validateFormField(this.season_id,'season_id');
  }
  newExtraQuestion(){
    let a = this.extra_question.length;
    if(this.extra_question.length>0){
      let b =this.extra_question[a-1].question
      if( b.length>0){
        let a = {
          "question": "",
          "is_required": false,
          "created_at":this.fecha

        }
        this.extra_question.push(a);
        this.alerQuestion = false;
      }else{
        this.alerQuestion = true;
      }
    }else{
      let a = {
        "question": "",
        "is_required": false,
        "created_at":this.fecha

      }
      this.extra_question.push(a);
      this.alerQuestion = false
    }
   
  }
  deletExtraQuestion(i){
    this.extra_question.splice(i);

  }

  newExtracharges(){
    let a = this.extra_charges.length;
    if(this.extra_charges.length>0){
      let b =this.extra_charges[a-1].name;
      if( b.length>0){
        let a = {
          "name": "",
          "price": 0,
          "currency_id": 0,
          "created_at":this.fecha

        }
        this.extra_charges.push(a);
        this.alercharges = false;
      }else{
        this.alercharges = true;
      }
    }else{
      let a = {
        "name": "",
        "price": 0,
        "currency_id": 0,
        "created_at":this.fecha
      }
      this.extra_charges.push(a);
      this.alercharges = false
    }
   
  }
  deletExtracharges(i){
    this.extra_charges.splice(i);

  }

  onChange(event:any){
    if(event.id == 1){
      this.formCamp.patchValue({
        show_mercadopago_button: true,
        show_payment_order:false,
        show_paypal_button: false,
        show_payment_parent:true,
        show_rebate_parent:true
      })
    }else if(event.id == 2){
      this.formCamp.patchValue({
        show_paypal_button: false,
        show_payment_order:false,
        show_payment_parent:false,
        show_rebate_parent:false,
        show_mercadopago_button: false,

      })

    }else if(event.id == 3){
      this.formCamp.patchValue({
        show_paypal_button: false,
        show_payment_order:true,
        show_payment_parent:true,
        show_rebate_parent:true,
        show_mercadopago_button: false,

      })
    }
}
newFechaPago(){
  let a = this.extra_charges.length;
  if(this.extra_charges.length>0){
    let b =this.extra_charges[a-1].name;
    if( b.length>0){
      let a = {
        "name": "",
        "price": 0,
        "created_at":this.fecha

      }
      this.fecha_pago.push(a);
      this.alertPago = false;
    }else{
      this.alertPago = true;
    }
  }else{
    let a = {
      "name": "",
      "price": 0,
      "created_at":this.fecha
    }
    this.fecha_pago.push(a);
    this.alertPago = false
  }
 
}

deletFechaPago(i){
  this.fecha_pago.splice(i);

}


arrayToJsonString(array: any[]): string {
  return JSON.stringify(array);
}

jsonStringToArray(jsonString: string | null | undefined): any[] {
  if (jsonString !== null && jsonString !== undefined) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error al parsear JSON:", error);
      return [];
    }
  }
  return [];
}


}
