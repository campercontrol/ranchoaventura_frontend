import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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











  constructor(private createCamp: CreateCampsService, private formGrup: FormBuilder, private render :Renderer2) {
 
    
   }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];


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
      name: ["",[Validators.required]], //listo
      start: ["",[Validators.required]], //listo
      end:  ["",[Validators.required]], //listo
      start_registration: ["",[Validators.required]], //listo
      end_registration:["",[Validators.required]], //listo
      registration: [false], //listo insurance
      url: [""], //listo
      special_message: ["",[Validators.required]],
      special_message_admin: ["",[Validators.required]],
      public_price:  [0], // listo 
      show_payment_parent:  [false], //listo
      show_rebate_parent:  [false],//listo
      show_paypal_button:  [false],// listo
      paypal_button:  ["string"],//listo
      show_payment_order:  [false],
      reminder_camp_days:  [15],//listo
      reminder_discount_days:  [15],//listo
      insurance:  [0], // listo
      venue:  ["",[Validators.required]], // listo 
      photo_url:  ["",[Validators.required]], // listo
      photo_password:  ["",[Validators.required]], // listo
      medical_report:  [""],//listo
      occupancy_camp:  [0],
      active:  [true], //listo
      general_camp:  [false], //listo
      currency_id: [0,[Validators.required,Validators.minLength(1)]],// listo
      location_id:  [0,[Validators.required,Validators.minLength(1)]], //listo
      school_id:  [0,[Validators.required,Validators.minLength(1)]], // listo
      season_id:  [0,[Validators.required,Validators.minLength(1)]], // listo
    })
  }

  createCampPost(){
    console.log(this.formCamp.value);
    if(this.formCamp.validator){
      this.createCamp.postCamp(this.formCamp.value).subscribe((res:any)=>{
        console.log(res);
        
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
      this.validateSpecialMessageAdmin();
      this.validateSpecialMessage();
      this.validateEndRegistration();
      this.validateStartRegistration();
      this.validateEnd();
      this.validateStart();
      this.validateName();

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
  
  validateSpecialMessage(): void {
    this.validateFormField(this.special_message,'special_message');
  }
  
  validateSpecialMessageAdmin(): void {
    this.validateFormField(this.special_message_admin,'special_message_admin');
  }
  
  validateVenue(): void {
    this.validateFormField(this.venue,'venue');
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

}
