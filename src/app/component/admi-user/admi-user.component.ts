import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamperService } from 'src/services/camper.service';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-admi-user',
  templateUrl: './admi-user.component.html',
  styleUrls: ['./admi-user.component.scss']
})
export class AdmiUserComponent implements OnInit {

  
  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  vacunas:any = [];
  resSearch:boolean = false;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  @ViewChild("emailConfir") emailConfir: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;
  @ViewChild("tutor_name") tutor_name: ElementRef; 
  @ViewChild("tutor_lastname_father") tutor_lastname_father: ElementRef; 
  @ViewChild("tutor_lastname_mother") tutor_lastname_mother: ElementRef; 
  @ViewChild("tutor_cellphone") tutor_cellphone: ElementRef; 
  @ViewChild("tutor_home_phone") tutor_home_phone: ElementRef; 
  @ViewChild("tutor_work_phone") tutor_work_phone: ElementRef; 
  @ViewChild("contact_name") contact_name: ElementRef; 
  @ViewChild("contact_lastname_father") contact_lastname_father: ElementRef; 
  @ViewChild("contact_lastname_mother") contact_lastname_mother: ElementRef; 
  @ViewChild("contact_cellphone") contact_cellphone: ElementRef; 
  @ViewChild("contact_work_phone") contact_work_phone: ElementRef; 
  @ViewChild("contact_home_phone") contact_home_phone: ElementRef; 
  @ViewChild("contact_email") contact_email: ElementRef; 

 
  spinner:boolean= false;
  photoSelect : string | ArrayBuffer;
  photoSatus = false;
  spinerPhot= true;
  table:boolean=true
  
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
  blood_types:any = [];
  vaccines:any = [];
  genders:any = [];
  grades:any = [];
  school:any = [];
  parent:any = [];
  escuelas:any = [];
  formFood2:FormGroup;
  photoSelectUp : string | ArrayBuffer;
  idioma = 'esp';
  cargando =true;
  rol:any=[];
  tablaPadres=[];
  tablaescuelas=[];
  data =[];
  tablastaff=[];
  displayColumns: string[] = [];

  columns: string[] = [];

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
  
  constructor(private catalogos: CatalogosService, private _FormBuild: FormBuilder,private camperSer: CamperService,private render :Renderer2) {
  //  this.textos  = traducciones['traduciones'][this.idioma]['formUserChildren'];
    console.log(this.textos);
    this.catalogos.getRol().subscribe((res:any)=>{
      console.log(res,'dddd');
      
        this.rol= res.data
    })
     
  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
        "email": ['',[Validators.required,Validators.email]],
        "passw": ['', [Validators.required, Validators.minLength(6) ]],
        "role_id": [0,[Validators.required,Validators.min(1)]],
        "is_coordinator": [false],
        "is_admin": [false],
        "is_employee": [false],
        "is_superuser": [false],
        "is_active": [true]
      
    })
    this.formFood2 = this._FormBuild.group({
      "email": ['',[Validators.required,Validators.email]],
      "hashed_pass":[''],
      "role_id": [0,[Validators.required,Validators.min(1)]],
      "is_coordinator": [false],
      "is_admin": [false],
      "is_employee": [false],
      "is_superuser": [false],
      "is_active": [true]
    
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
    this.catalogos.getUser().subscribe((res: any) => {
      
      this.listcatalogos = res.data;
      this.catalogos.getUserF().subscribe((res: any) => {    
        //console.log(res);
        
        this.listcatalogos =this.listcatalogos.concat(res.data); 
        this.cargando = false;
 
      });
       
    });

   
  }

 



  

  prueba(){
    this.spinner=true;
    if(this.formFood.valid){     
      this.catalogos.postUser(this.formFood.value).subscribe((res:any)=>{
          console.log(res);
            this.spinner=false; 
            this.getCatalogos();
            this.statuAgrgado = true;
            this.resteValu();
            this.spinner=false; 
           // this.table= true;
            setTimeout(() => {
              this.statuAgrgado = false;
              this.table= true;
              this.closeModal();
            }, 1000);    
          
          
      },error => {
        alert('No se pudo Agregar')
        this.spinner=false; 
      });
      this.spinner=false;

    }else{
      this.spinner= false;

    }

    
  }

  guardar() {
    this.catalogos.postAlimentos(this.formFood.value).subscribe((res: any) => {
      this.getCatalogos();
      this.statuAgrgado = true;
      this.resteValu();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal();
      }, 1000);

    }, error => {
      alert('No se pudo Agregar')
    })

  }

  resteValu() {
    this.formFood.reset();
  }
  canelar(){
    this.formFood.reset();
    this.table=true;
    this.display2= false

  }

  update(item){
    this.cargando=true
     this.updateId = item.id;
    this.display2= true;
    this.table= false;
   
    this.formFood2.patchValue({     
      "email":item.email,
        "hashed_pass": "",
        "role_id":item.role_id,
        "is_coordinator":item.is_coordinator,
        "is_admin": item.is_admin,
        "is_employee": item.is_employee,
        "is_superuser": item.is_superuser,
        "is_active": item.is_active,
   })
   this.data=[]
   this.columns=[]

      this.catalogos.getinfodelet(item.id).subscribe((res: any) => {
    console.log(res);
    this.cargando = false;
   

    if (res.role_id == 1) { 
      this.data = res.campers;
      this.columns = ['camper_fullname', 'camps'];
      this.displayColumns = ['Hijos', 'Campamentos'];
    } else if (res.role_id == 2) {
      this.data = res.staff_in_camp;
      this.columns = ['name', 'id'];
      this.displayColumns = ['Campamentos Apuntados', 'ID'];
    } else if (res.role_id == 3) {
      this.data = res.school_camps;
      this.columns = ['name'];
      this.displayColumns = ['Campamentos'];
    }
  }, error => {
    this.cargando = false;
    alert('No se pudo Agregar');
  });
}

// Métodos para manejar datos anidados si es necesario
getCampsSummary(camps: any[]): string {
  return camps.map(camp => camp.name).join(', ');
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
    
   
      
      let form:any ={
        "email": this.formFood2.get('email').value,

        "role_id": this.formFood2.get('role_id').value,
        "is_coordinator": this.formFood2.get('is_coordinator').value,
        "is_admin": this.formFood2.get('is_admin').value,
        "is_employee": this.formFood2.get('is_employee').value,
        "is_superuser": this.formFood2.get('is_superuser').value,
        "is_active": this.formFood2.get('is_active').value
      } 

      console.log(this.formFood2.value);


      let b =this.formFood2.get('hashed_pass').value;
      b = b.trim()
      b.length > 0 ?  form.hashed_pass = this.formFood2.get('hashed_pass').value:"";
      this.catalogos.patchUser(form,this.updateId).subscribe((res:any)=>{
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
      alert('No se pudo Agregar')
    });

    
   
  }

  cancelarUpdate(){
   this.table =true;
   this.display2 =false;
    
  }
  deletModal(){
    this.idDalete= this.updateId;
    this.TextElimint='Estas Seguro que quieres eliminar la cuenta' + this.formFood2.get('email').value;
    this.display3 = true; 
   
  }

  delet(){
    this.catalogos.deletUser(this.idDalete).subscribe((res: any) => {
      this.statuAgrgado = true;
      this.cargando= true;
      this.canelar();
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
        this.cancelarUpdate
      }, 1000);

    }, error => {
      alert('No se pudo Eliminar')
    })
  }
  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
    }
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

  getTutor_lastname_father(){
    if( this.formFood.get('passw').valid){
      this.render.removeClass(this.tutor_lastname_father.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_lastname_father.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_lastname_father.nativeElement,"is-valid");
      this.render.addClass(this.tutor_lastname_father.nativeElement,"is-invalid");
      this.tutor_lastname_father.nativeElement.focus()

     }
  }
  gettutor_lastname_mother(){
    if( this.formFood.get('role_id').valid){
      this.render.removeClass(this.tutor_lastname_mother.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_lastname_mother.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_lastname_mother.nativeElement,"is-valid");
      this.render.addClass(this.tutor_lastname_mother.nativeElement,"is-invalid");
      this.tutor_lastname_mother.nativeElement.focus()

     }
  }
  getTutor_name() {
    if( this.formFood.get('email').valid){
      this.render.removeClass(this.tutor_name.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_name.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_name.nativeElement,"is-valid");
      this.render.addClass(this.tutor_name.nativeElement,"is-invalid");
      this.tutor_name.nativeElement.focus()

     }
    
  }

  
  gettutor_lastname_motherU(){
    if( this.formFood2.get('role_id').valid){
      this.render.removeClass(this.tutor_lastname_mother.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_lastname_mother.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_lastname_mother.nativeElement,"is-valid");
      this.render.addClass(this.tutor_lastname_mother.nativeElement,"is-invalid");
      this.tutor_lastname_mother.nativeElement.focus()

     }
  }
  getTutor_nameU() {
    if( this.formFood2.get('email').valid){
      this.render.removeClass(this.tutor_name.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_name.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_name.nativeElement,"is-valid");
      this.render.addClass(this.tutor_name.nativeElement,"is-invalid");
      this.tutor_name.nativeElement.focus()

     }
    
  }
  

  

  

}
