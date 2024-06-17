import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';
import { CampsVistaService } from 'src/services/camps-vista.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CreateCampsService } from 'src/services/create-camps.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/services/catalogos.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-campamentos-staff',
  templateUrl: './campamentos-staff.component.html',
  styleUrls: ['./campamentos-staff.component.scss'],
  providers: [AdvancedService, DecimalPipe]

})
export class CampamentosStaffComponent implements OnInit {


  selectedCustomers: any[];

  representatives: any[];

  statuses: any[];

  loading: boolean = false;
  displayMaximizable: boolean;
  listCampers:any= [];
  spinner:boolean = false;
  listStaffConfirm:any= [];
  listaStaff:any=[];
  headerInfo:boolean=true;
  headerCampers:boolean=true;
  headerStaffConf:boolean=true;
  headerStaffApun:boolean=true;
  extra_discounts:any=[]
  alerQuestion = false;
  showTable:boolean =false;
  Catpaymanacout:any =[];







  rolSatff:any=[];
  staffApuntado:any=[];
  staff:any = [];
  staffNoselecionado:any = [];
  staffSelecionado:any = [];
  displayMaximizable2:boolean=false;
  modalConfir:boolean= false;
  selectRol:number=0;
  infoCamp:campss={
    id: 0,
    special_message: '',
    reminder_camp_days: 0,
    active: false,
    name: '',
    special_message_admin: '',
    reminder_discount_days: 0,
    start: undefined,
    public_price: 0,
    insurance: 0,
    general_camp: false,
    updated_at: undefined,
    end: undefined,
    show_payment_parent: false,
    venue: '',
    currency_id: 0,
    start_registration: undefined,
    show_rebate_parent: false,
    photo_url: '',
    location_id: 0,
    created_at: undefined,
    end_registration: undefined,
    show_paypal_button: false,
    photo_password: '',
    school_id: 0,
    uid: '',
    registration: false,
    show_payment_order: false,
    medical_report: '',
    season_id: 0,
    url: '',
    occupancy_camp: 0
  };
  cargando= false;
  

  idCamp = 0;
  activityValues: number[] = [0, 100];
  items = [];
  rol=0;
  user_admin=false 
  user_coordinator=false
  formFood: FormGroup;

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
  location:any = [];
  temporada:any = [];
  school:any = [];
  currency:any = [];
  extra_question : any = [];
  extra_charges:any = [];
  payment_accounts:any = [];
  fecha = new Date();
  alercharges= false;
  public Editor = ClassicEditor;


  

  constructor(private capms:CampsVistaService,private router :ActivatedRoute,private routerN: Router,private info : AuthenticationService, private createCamp: CreateCampsService,private formGrup: FormBuilder,private render :Renderer2,private catalogos:CatalogosService) { 
  
    this.rol=this.info.infToken.role_id
    this.catalogos.getpaymentaccounts().subscribe((res: any) => {
      this.Catpaymanacout = res.data;
   
    });

    this.user_admin = info.infToken.user_admin ;
      this.user_coordinator= info.infToken.user_coordinator ;
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
  cars = [{ Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  { Nombre: "Campamento con agrupaciones", grado: "prueba2", inicio: "2020-11-10 ", termina: "2020-11-10 " },
  ]
  customer = [{id:2, name: "Alberto Ulises Hernandez Cruz", record: { n: 2, b: 2, d: 3 }, precio: 5500, sede: "Los Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: true }
    , {id:3, name: "Arueba de Nombre", record: { n: 12, b: 2, d: 3 }, precio: 2500, sede: "Los Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: false },
  {id:4, name: "Lrueba de Nombre", record: { n: 12, b: 2, d: 3 }, precio: 5500, sede: "aLos Potros", inicio: "2023-11-28", termina: "2023-11-28", estado: "Pagado", cumple: true }]

  ngOnInit(): void {
    this.getInof();
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
      reminder_discount_days:  [0],//listo
      insurance:  [0,[Validators.required]], // listo
      venue:  ["",[Validators.required]], // listo 
      photo_url:  ["",[Validators.required]], // listo
      photo_password:  ["",[Validators.required]], // listo
      medical_report:  ["  "],//listo
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

  }

  getInof(){
    this.cargando= false;
    this.capms.getRolSatff().subscribe((res:any)=>{
      console.log(res);
      
      this.rolSatff= res.data
    });
    this.router.params.subscribe((res)=>{
        this.idCamp= res.id;
    })
    this.capms.getInfoCamp(this.idCamp).subscribe((res:any)=>{
      console.log(res);
      this.infoCamp = res.camp
      this.listCampers = res.campers;
      this.listStaffConfirm = res.staff_confirmed;
      this.staffApuntado = res.staff_volunteer;

      this.infoCamp.special_message=this.parseHTMLContent(this.infoCamp.special_message);
      this.infoCamp.special_message_admin=this.parseHTMLContent(this.infoCamp.special_message_admin);

      this.cargando= true;

      
    })
    this.capms.getListaSatff().subscribe((res:any)=>{
      console.log(res);
      
      this.listaStaff = res.data;
    })

  }

  parseHTMLContent(html: any): string {
    const regex = /<[^>]*>/g;
    return html.replace(regex, '');
  }

  agregarStaffNoApuntado(){
    //console.log(this.staffNoselecionado);
    let a = [];
    this.cargando = false;
    this.staffNoselecionado.forEach(element => {
      console.log(element['Staff'].id);
      
      a.push(element['Staff'].id);   
    });
    //console.log(a);
    
    this.capms.aceptarStaff(this.idCamp,a).subscribe((res:any)=>{
      console.log(res);
      this.displayMaximizable=false;
      this.getInof()
      this.cargando = true;


      
    },error=>{
      alert('no se pudo agregar el staff por favor intentelo mas tarde');
      this.displayMaximizable=false;
      this.cargando = true;

    })
    
    
  }
  agregarStaffApuntado(){
    //console.log(this.staffNoselecionado);
    let a = [];
    this.cargando = false;

    this.staffSelecionado.forEach(element => {
     
      
      a.push(element.staff_id);   
    });
    //console.log(a);
    
    this.capms.aceptarStaff(this.idCamp,a).subscribe((res:any)=>{
      this.getInof()
      console.log(res);
      this.displayMaximizable2=false;
      this.cargando = true;


      
    },error=>{
      alert('no se pudo agregar el staff por favor intentelo mas tarde');
      this.displayMaximizable2=false;
      this.cargando = true;

    })
    
    
  }
  verStaff(id){
    this.routerN.navigate(['/dashboard/staff/perfil/'+id])

  }
  vercamper(id){
    this.routerN.navigate(['/dashboard/parents/inscription/camper/'+id])


  }

  selectstaff(){
    let a = [];
        this.cargando = false;

    this.selectedCustomers.forEach(element => {
     
      
      a.push(element.staff_id);   
    });
    this.capms.asignarRolStaff(this.idCamp,this.selectRol,a).subscribe((res:any)=>{
      this.getInof()
      this.modalConfir=false;
      this.cargando = true;

    },error=>{
      this.modalConfir=false;
      this.cargando = true;

      alert('No se pudo realizar la accion intentelo mas tarde')
    
    })
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  pulserac11(){
    this.capms.pulseras1x11(this.idCamp).subscribe((res:any)=>{
      console.log(res);
      const dataBinary = [];
      dataBinary.push(res);
      const filePath =  window.URL.createObjectURL(new Blob(dataBinary,{type: 'application/pdf'}));
      const link = document.createElement('a');
      link.href =filePath;
      link.setAttribute('download','pulseras 1x11');
      document.body.appendChild(link);
      link.click();
 
    })
  }
  pulseras8() {
    this.capms.pulseras8hoja(this.idCamp).subscribe(
      (res: any) => {
        if (res instanceof Blob) {
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'pulsera 8');
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('La respuesta no es un Blob válido.');
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }
  
  pdfinfodecampers(){
    this.capms.Pdfinfodecampers(this.idCamp).subscribe((res:any)=>{
      console.log(res);
      const dataBinary = [];
      dataBinary.push(res);
      const filePath =  window.URL.createObjectURL(new Blob(dataBinary,{type: 'application/pdf'}));
      const link = document.createElement('a');
      link.href =filePath;
      let titulo ='Informacion acamapadores'+" " +this.idCamp;
      link.setAttribute('download',titulo);
      document.body.appendChild(link);
      link.click();
 
    })
  }

  cumpleanosEnRango( cumpleanos: any): boolean {
    let fechaInicio =  new Date(this.infoCamp.start);
    let fechaFin =  new Date(this.infoCamp.end);
    cumpleanos = new Date(cumpleanos);

    // Verificar si el cumpleaños del asistente está dentro del rango del evento
    return cumpleanos >= fechaInicio && cumpleanos <= fechaFin;
  }
  linkPagos(idCamp){
    if(this.user_admin==true || this.user_coordinator==true){
        this.routerN.navigate(['dashboard/payments/'+idCamp +'/'+this.idCamp])
    }
  }
  Agrupaciones(){
        this.routerN.navigate(['dashboard/staff/grouping/'+this.idCamp])
  }
  medicos(){
    this.routerN.navigate(['dashboard/medical/camp-medical/'+this.idCamp])
}
puntosControl(){
  this.routerN.navigate(['dashboard/staff/checkpoint/'+this.idCamp])
}

update(){
  this.cargando = false;
 this.createCamp.getCampId(this.idCamp).subscribe((res:any)=>{
   let item = res.camp;
   this.showTable =  true;
   this.cargando = true;

   console.log(item.registration);
   
 this.formFood.patchValue({     
   name: item.name, //listo
   start: this.fechaParse(item.start), //listo
   end:  this.fechaParse(item.end), //listo
   start_registration: this.fechaParse(item.start_registration), //listo
   end_registration:this.fechaParse(item.end_registration), //listo
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
this.extra_charges = res.extra_charges;
this.extra_question =res.extra_questions;
 });




 
}

fechaParse(fechaDesdeBackend){
 const fechaSinSegundos = fechaDesdeBackend.substring(0, 16); // Elimina segundos y milisegundos
 return fechaSinSegundos;
}


keepUpdate(){
 if(this.formFood.valid){    
  this.spinner = true; 
   let a = {
     "camp":this.formFood.value,
     "payment_accounts":this.payment_accounts,
     "extra_question":this.extra_question,
      "extra_charges":this.extra_charges,
      "extra_discounts":this.extra_discounts,
 }


   this.createCamp.patchCamp(this.idCamp,a).subscribe((res:any)=>{
       console.log(res);
       if(res.succes = 200){
        window.location.reload();
        this.spinner = false; 


       }
       
   },error => {
     alert('No se pudo Agregar')
   });

 }else{
  this.spinner = false; 

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

export interface campss {
  id:                     number;
  special_message:        string;
  reminder_camp_days:     number;
  active:                 boolean;
  name:                   string;
  special_message_admin:  string;
  reminder_discount_days: number;
  start:                  string;
  public_price:           number;
  insurance:              number;
  general_camp:           boolean;
  updated_at:             string;
  end:                    string;
  show_payment_parent:    boolean;
  venue:                  string;
  currency_id:            number;
  start_registration:     string;
  show_rebate_parent:     boolean;
  photo_url:              string;
  location_id:            number;
  created_at:             string;
  end_registration:       string;
  show_paypal_button:     boolean;
  photo_password:         string;
  school_id:              number;
  uid:                    string;
  registration:           boolean;
  show_payment_order:     boolean;
  medical_report:         string;
  season_id:              number;
  url:                    string;
  occupancy_camp:         number;
}



