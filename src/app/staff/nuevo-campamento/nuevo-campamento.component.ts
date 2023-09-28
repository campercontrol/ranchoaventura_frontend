import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateCampsService } from 'src/services/create-camps.service';

@Component({
  selector: 'app-nuevo-campamento',
  templateUrl: './nuevo-campamento.component.html',
  styleUrls: ['./nuevo-campamento.component.scss']
})
export class NuevoCampamentoComponent implements OnInit {

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
  @ViewChild("location_id") location_id: ElementRef;
  @ViewChild("school_id") school_id: ElementRef;
  @ViewChild("season_id") season_id: ElementRef;
  @ViewChild("insurance") insurance: ElementRef;
  @ViewChild("public_price") public_price: ElementRef;

  extra_question : any = [];
  extra_charges:any = [];
  alerQuestion = false;
  alercharges= false;
  extra_discounts = [];
  fecha = new Date();











  constructor(private createCamp: CreateCampsService, private formGrup: FormBuilder, private render :Renderer2,private router:Router) {
 
    
   }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  payment_accounts:any = [];


 public Editor = ClassicEditor;
  ngOnInit(): void {
       
    this.createCamp.getSede().subscribe((res:any)=>{
      this.location = res.data;
      //console.log(this.location);

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
    this.formCamp = this.formGrup.group({
      name: ["",[Validators.required,Validators.minLength(2)]], //listo
      start: ["",[Validators.required]], //listo
      end:  ["",[Validators.required]], //listo
      start_registration: ["",[Validators.required]], //listo
      end_registration:["",[Validators.required]], //listo
      registration: [true], //listo insurance
      url: [""], //listo
      special_message: ["",[Validators.required]],
      special_message_admin: ["",[Validators.required]],
      public_price:  [0,[Validators.required,Validators.min(1)]], // listo 
      show_payment_parent:  [true], //listo
      show_rebate_parent:  [true],//listo
      show_paypal_button:  [true],// listo
      show_payment_order:  [true],
      reminder_camp_days:  [15],//listo
      reminder_discount_days:  [15],//listo
      insurance:  [0,[Validators.required,Validators.min(1)]], // listo
      venue:  ["",[Validators.required]], // listo 
      photo_url:  ["",[Validators.required]], // listo
      photo_password:  ["",[Validators.required]], // listo
      medical_report:  [""],//listo
      occupancy_camp:  [0], // cupo de campamentos faltante
      active:  [true], //listo
      general_camp:  [true], //listo
      currency_id: [0,[Validators.required,Validators.min(1)]],// listo
      location_id:  [0,[Validators.required,Validators.min(1)]], //listo
      school_id:  [0,[Validators.required,Validators.min(1)]], // listo
      season_id:  [0,[Validators.required,Validators.min(1)]], // listo
      created_at: ['2023-07-20T16:21:21.283177'],
      extra_charges: [this.extra_charges],
      extra_question:[ this.extra_question],
      payment_accounts:[this.payment_accounts]
    })
  }

  createCampPost(){
   // console.log(this.formCamp.value);
   this.spinner=true;
    if(this.formCamp.valid){
      let a = {
          "camp":this.formCamp.value,
          "payment_accounts":this.payment_accounts,
          "extra_question":this.extra_question,
           "extra_charges":this.extra_charges,
           "extra_discounts":this.extra_discounts,
      }
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
    this.validateFormField(this.location_id,'location_id');
  }
  
  validateSchoolId(): void {
    this.validateFormField(this.school_id,'school_id');
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

}
