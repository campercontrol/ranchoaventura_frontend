import { Component, ElementRef, OnInit, Renderer2, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/services/catalogos.service';
import { CreateCampsService } from 'src/services/create-camps.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PaymentsService } from 'src/services/payments.service';
import { concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.scss']
})
export class AdminStaffComponent implements OnInit {

  
  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  public Editor = ClassicEditor;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  vacunas:any = [];
  selectHijos:any = [];
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
  informacion:any=[];
  moneda:any = [];
  metodosPagos:any = [];
  campamentos:any =[];
  displayEdit:boolean= false;
  nombrePadres:any = [];
  metodosPago:any = [];
  nameParent="";
  campersd:any = [];
  tipoTransacion=[];
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
  
  constructor(private createCamp: CreateCampsService, private formGrup: FormBuilder, private render :Renderer2,private catalogos:CatalogosService,private paymants:PaymentsService,private router:Router) {  
  }

  info() {
    this.cargando = true; // Set loading state to true before fetching data
  
    this.catalogos.getStaff().subscribe((staffResponse: any) => {
      console.log(staffResponse.data, 'respuesta staff');
      this.listcatalogos = staffResponse.data;
      this.listcatalogos.forEach(element => {
        element.tipo = "Staff"
      });
  
      this.catalogos.getProspectos().subscribe((prospectResponse: any) => {
        let b = prospectResponse.data;
        console.log(b);
        
         b.forEach((prospect:any) => {
          prospect.tipo ="Prospecto"
         });
        this.listcatalogos = [...prospectResponse.data, ...this.listcatalogos]; // Concatenate arrays correctly
        this.cargando = false; // Set loading state to false after both requests are complete
      }, (error: any) => {
        console.error('Error fetching prospectos:', error);
        this.cargando = false; // Set loading state to false even if an error occurs
      });
    }, (error: any) => {
      console.error('Error fetching staff:', error);
      this.cargando = false; // Set loading state to false even if an error occurs
    });
  }
  

  ngOnInit(): void {
    
    this.info()


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
  showDialogSearch() {
    this.displayEdit =!this.displayEdit;

  }
  searchparten(){
    this.resSearch= false;
    let a :any = this.formFood.get('parent_name').value
    if( a.length>2){
      this.catalogos.searchPerent(a).subscribe((res:any)=>{
        this.parent = res.data;
        console.log(this.parent);
        this.resSearch= true;
        
      },error=>{
        console.log(error);
        
      })
    }

  }

  closeModal3() {
    this.display3 = false;

  }
  closeModal2() {
    this.display2 = false;
    this.resteValu();

  }
  perfil(customer){
    this.router.navigate(['dashboard/staff/perfil/'+customer.Staff.id]);

  }
  

  getCatalogos() {
    
    this.paymants.getPagos().subscribe((res: any) => {
      this.listcatalogos = res.data;
      console.log(this.listcatalogos);

      this.listcatalogos.map((pago:any) => {
        pago.metodosPago = this.tipoSearch(pago.payment_method_id);
        pago.nombreCamper = this.nombreCmper(pago.camper_id);
        pago.tipoMovimiento = this.searchTicpo(pago.txn_type_id);
        pago.Padres = this.nombrePadre(pago.camp_id);

        pago.camp = this.campssearch(pago.camp_id);
      });
      this.cargando = false;
      console.log(this.listcatalogos);
    });

  }
  searchTicpo(id){
    let a= this.tipoTransacion.filter((camps)=>{
      return   camps.id ==  id;
    })
    console.log(a);
    
    return a[0].name
    }
  searchMovimiento(id){
    let a= this.tipoTransacion.filter((camps)=>{
      return   camps.id ==  id;
    })
    //console.log(a);
    
    return a[0].name
    }
    

  campssearch(id){
    console.log(id,'id del campamento');
    
    console.log(this.campamentos,'ddd');
    
    let a = this.campamentos.filter((camps:any) => {
      //console.log(camps);
      return camps.id == id;
    });
  
    //console.log(a);
  
    if (a.length > 0) {
      return a[0].name;
    } else {
      // Aquí puedes manejar el caso en el que no se encuentra ningún elemento con el id especificado.
      // Puedes devolver un valor predeterminado o lanzar una excepción, según lo que sea adecuado en tu caso.
      return "No se encontró ningún elemento con el ID especificado";
    }
  }
  nombreCmper(id){
    console.log(id,'id camper');
    
    console.log(this.campersd,'camperssss');
    
    let a :any;
     this.campersd.forEach((camps:any) => {
     if(camps.id == id){
      a = camps
      console.log(a,'si se encontro');
      
     }
    });
  
   console.log(a);
  
    if (a) {
      return a.name;
    } else {
      // Aquí puedes manejar el caso en el que no se encuentra ningún elemento con el id especificado.
      // Puedes devolver un valor predeterminado o lanzar una excepción, según lo que sea adecuado en tu caso.
      return "No se encontró ningún elemento con el ID especificado";
    }
    }
    nombrePadre(id){
      console.log(id,'id padr');
      
      console.log(this.nombrePadres,'padrees');
      
      let a :any;
       this.nombrePadres.forEach((camps:any) => {
       if(camps.id == id){
        a = camps
        console.log(a,'si se encontro');
        
       }
      });
    
     console.log(a);
    
      if (a) {
        return a.name;
      } else {
        // Aquí puedes manejar el caso en el que no se encuentra ningún elemento con el id especificado.
        // Puedes devolver un valor predeterminado o lanzar una excepción, según lo que sea adecuado en tu caso.
        return "No se encontró ningún elemento con el ID especificado";
      }
      }
    tipoSearch(id) {
      //console.log(this.metodosPagos);
    
      let a = this.metodosPagos.filter((camps) => {
        console.log(camps);
        return camps.id == id;
      });
    
    //  console.log(a);
    
      if (a.length > 0) {
        return a[0].name;
      } else {
        // Aquí puedes manejar el caso en el que no se encuentra ningún elemento con el id especificado.
        // Puedes devolver un valor predeterminado o lanzar una excepción, según lo que sea adecuado en tu caso.
        return "No se encontró ningún elemento con el ID especificado";
      }
    }

  prueba(){
    this.spinner=true;
    if(this.formFood.valid){     
    
  

      this.paymants.setpage(this.formFood.value).subscribe((res:any)=>{
          console.log(res);
         
          

            switch (res.detail.status) {
              case 1:
                alert(res.detail.msg); // "Se ha creado correctamente el usuario doctor"
                this.router.navigate(['login']); // Redirigir a la página de login
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
                break;
              case 2:
                alert(res.detail.msg); // "Ya existe un usuario con ese correo"
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
                break;
              case 3:
                alert(res.detail.msg); // "Ocurrió un error al crear el usuario"
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
                break;
              default:
                alert('Ocurrió un error inesperado');
                 }
          
      },error => {
        alert('No se pudo Agregar')
      });
      this.spinner=false;

    }else{
    

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
     this.updateId = item["Staff"].id;
    this.display2= true;
    this.table= false;
   
   

  

   
  
    
  }


  keepUpdate(){
    this.spinner=true;
    
    //console.log(a);
    if(this.formFood.valid){
      this.paymants.updatepage(this.formFood.value,this.updateId).subscribe((res:any)=>{
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
    }
   
   
  }

  cancelarUpdate(){
   this.table =true;
   this.extra_charges = [];
   this.extra_question = [];
   this.display2 =false;
    
  }
  select(){
    let a = this.parent.filter(item=>
     item.tutor_id== this.formFood.get('parent_id').value 
    )
    console.log(this.formFood.get('parent_id').value);
    
    console.log(a);
    
    if(a.length>0){
      console.log('se encontro');
      
      this.nameParent = a[0].tutor_name + a[0].tutor_lastname_father + a[0].tutor_lastname_mother; 
      this.displayEdit = false;
    }
   
  }

  deletModal(){
    this.idDalete= this.updateId;
    this.TextElimint='Estas Seguro que quieres eliminar camp' + this.formFood.get('name').value;
    this.display3 = true; 
   
  }

  delet(){
    this.catalogos.deletCamps(this.idDalete).subscribe((res: any) => {
      if(res.detail.status == 1){

      this.statuAgrgado = true;
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
        this.cancelarUpdate
      }, 500);
    }else{
      alert('No se pudo Eliminar debido a que esta en uso')

    }

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

  manejarEvento(event){
    console.log(event);
    
    if(event == 1){
      this.info();
      this.table = true;
      this.display2= false;
      


    }else if (event == 0){
      this.table= true;
      this.display2= false;

    }
  }

  
  
 
 

 
  
  
 

}
