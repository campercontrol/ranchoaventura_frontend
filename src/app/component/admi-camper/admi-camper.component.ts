import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/services/catalogos.service';
import { CreateCampsService } from 'src/services/create-camps.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-admi-camper',
  templateUrl: './admi-camper.component.html',
  styleUrls: ['./admi-camper.component.scss']
})
export class AdmiCamperComponent implements OnInit {

 
  
  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  public Editor = ClassicEditor;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  vacunas:any = [];
  resSearch:boolean = false; 
  spinner:boolean= false;
  photoSelect : string | ArrayBuffer;
  photoSatus = false;
  spinerPhot= true;
  table:boolean=true;

  location:any = [];
  temporada:any = [];
  school:any = [];
  currency:any = [];
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
  
  idDalete =0;
  updateId= 0;
  text: any;
  TextElimint="";
  formFood: FormGroup;
  date: Date = new Date();
  statuAgrgado = false;
  textos:any ={};
  licensed_medicines:any = [];
  pathological_background:any = [];
  pathological_background_fm:any = [];
  food_restrictions:any = [];
  payment_accounts:any = [];
  blood_types:any = [];
  vaccines:any = [];
  genders:any = [];
  grades:any = [];
  parent:any = [];
  escuelas:any = [];
  photoSelectUp : string | ArrayBuffer;
  idioma = 'esp';
  cargando =true;
  rol:any=[];
  cat: any = {
    '0': 'ninguno',
    '1': 'Staff',
    '2': 'Acampador',
    '3': 'Staff y Acampador'
  }
  capa = {
    name: ''
  }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];
  
  constructor(private createCamp: CreateCampsService, private formGrup: FormBuilder, private render :Renderer2,private catalogos:CatalogosService) {  
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
  }

  ngOnInit(): void {
    this.formFood = this.formGrup.group({
      name: ["",[Validators.required,Validators.minLength(2)]], //listo
      start: ["",[Validators.required]], //listo
      end:  ["",[Validators.required]], //listo
      start_registration: ["",[Validators.required]], //listo
      end_registration:["",[Validators.required]], //listo
      registration: [true], //listo insurance
      url: [""], //listo
      special_message: ["",[Validators.required]],
      special_message_admin: ["",[Validators.required]],
      public_price:  [0,[Validators.required]], // listo 
      show_payment_parent:  [true], //listo
      show_rebate_parent:  [true],//listo
      show_paypal_button:  [true],// listo
      show_payment_order:  [true],
      reminder_camp_days:  [15],//listo
      reminder_discount_days:  [15],//listo
      insurance:  [0,[Validators.required]], // listo
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
      created_at: [this.fecha],
      extra_charges: [this.extra_charges],
      extra_question:[ this.extra_question],
      payment_accounts:[this.payment_accounts]
      
    })
   
    this.getCatalogos();
  }
  showDialog() {
   
    this.table = false;
  }
  showDialog2() {
    this.display2 = true;
  }
  closeModal() {
    this.display = false;

  }

  closeModal3() {
    this.display3 = false;

  }
  closeModal2() {
    this.display2 = false;
    this.resteValu();

  }

  getCatalogos() {
    this.listcatalogos=[];
    this.catalogos.getCamps().subscribe((res: any) => {
      
      this.listcatalogos = res.data;
      this.cargando = false;
      console.log(this.listcatalogos);
      
    });

   
  }

  prueba(){
    this.spinner=true;
    if(this.formFood.valid){     
      let a = {
        "camp":this.formFood.value,
        "payment_accounts":this.payment_accounts,
        "extra_question":this.extra_question,
         "extra_charges":this.extra_charges,
         "extra_discounts":this.extra_discounts,
    }
  

      this.createCamp.postCamp(a).subscribe((res:any)=>{
          console.log(res);
          if(res.succes = 200){
            this.spinner=false; 
            this.getCatalogos();
            this.statuAgrgado = true;
            this.extra_charges = [];
            this.extra_question= [];
            this.formFood.reset;
            this.resteValu();
           // this.table= true;
            setTimeout(() => {
              this.statuAgrgado = false;
              this.table= true;
              this.closeModal();
            }, 1000);    
          }
          
      },error => {
        alert('No se pudo Agregar')
      });
      this.spinner=false;

    }else{
      this.spinner= false;
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

    }

    
  }
  resteValu() {
    this.formFood.reset();
  }
  canelar(){
    this.formFood.reset();
    this.extra_charges = [];
   this.extra_question = [];
    this.table=true;
    this.display2= false

  }

  update(item){
     this.updateId = item.id;
    this.display2= true;
    this.table= false;
   
    this.formFood.patchValue({     
      name: item.name, //listo
      start: item.start, //listo
      end:  item.end, //listo
      start_registration: item.start_registration, //listo
      end_registration:item.end_registration, //listo
      registration: item.registration, //listo insurance
      url: item.url, //listo
      special_message: item.special_message,
      special_message_admin:item.special_message_admin,
      public_price:  item.public_price, // listo 
      show_payment_parent:  item.show_payment_parent, //listo
      show_rebate_parent:  item.show_rebate_parent,//listo
      show_paypal_button:  item.show_paypal_button,// listo
      show_payment_order:  item.show_payment_order,
      reminder_camp_days:  item.reminder_camp_days,//listo
      reminder_discount_days:  item.reminder_discount_days,//listo
      insurance:  item.insurance, // listo
      venue: item.venue, // listo 
      photo_url: item.photo_url, // listo
      photo_password:  item.photo_password, // listo
      medical_report:  item.medical_report,//listo
      occupancy_camp:  item.occupancy_camp, // cupo de campamentos faltante
      active: item.active, //listo
      general_camp: item.general_camp, //listo
      currency_id: item.currency_id,// listo
      location_id:  item.location_id, //listo
      school_id: item.school_id, // listo
      season_id:  item.season_id, // listo
      extra_charges:item.extra_charges,
      extra_question:item.extra_question,
      payment_accounts:item.payment_accounts
   })

  

   
  
    
  }
  getVaccinesValues(){
    console.log(this.vacunas);
    
    this.vaccines.map((item:any)=>{
      for(let   param of this.vacunas){
        if(item.id == param.id){
          item.is_active = true;
        }else{
          item.is_active = false;
        }
      }

    })
  }

  keepUpdate(){
    this.spinner=true;
    this.getVaccinesValues();
    
    //console.log(a);
    if(this.formFood.valid){
      this.catalogos.patchCamps(this.formFood.value,this.updateId).subscribe((res:any)=>{
        console.log(res);
        if(res.succes = 200){
          this.spinner = false;
          this.getCatalogos();
          this.statuAgrgado = true;
          this.cancelarUpdate();
          setTimeout(() => {
            this.statuAgrgado = false;
            this.closeModal2();
          }, 1000);
        }
        
    }, error => {
      console.log(error);
      this.spinner = false;
      alert('No se pudo Editar')
    });

    }else{
      this.spinner=false;

      this.spinner= false;
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
      
     
     
    }
   
   
  }

  cancelarUpdate(){
   this.table =true;
   this.extra_charges = [];
   this.extra_question = [];
   this.display2 =false;
    
  }
  deletModal(){
    this.idDalete= this.updateId;
    this.TextElimint='Estas Seguro que quieres eliminar camp' + this.formFood.get('name').value;
    this.display3 = true; 
   
  }

  delet(){
    this.catalogos.deletCamps(this.idDalete).subscribe((res: any) => {
      this.statuAgrgado = true;
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
        this.cancelarUpdate
      }, 500);

    }, error => {
      alert('No se pudo Eliminar')
    })
  }

  validateFormField(elementRef: any,name): void {
    if (this.formFood.get(name).valid) {
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
