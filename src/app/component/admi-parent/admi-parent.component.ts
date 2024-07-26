import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { CamperService } from 'src/services/camper.service';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-admi-parent',
  templateUrl: './admi-parent.component.html',
  styleUrls: ['./admi-parent.component.scss']
})
export class AdmiParentComponent implements OnInit {
  buscador:boolean=false;
  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  displayEdit: boolean=false;
  nameParent="";
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  vacunas:any = [];
  item:any={}
  displayEditUpd:boolean= false;
  resSearch:boolean = false;
  cargando:boolean = false;
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
  @ViewChild('dt') dt: Table;

  photoSelectUp : string | ArrayBuffer;
  idioma = 'esp';
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
  id:any ;
  
  constructor(private catalogos: CatalogosService, private _FormBuild: FormBuilder,private camperSer: CamperService,private render :Renderer2,private routerAct:ActivatedRoute) {
  //  this.textos  = traducciones['traduciones'][this.idioma]['formUserChildren'];
    console.log(this.textos);
     
  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
      tutor_lastname_father:["",[Validators.required,,Validators.minLength(1)]],
      tutor_cellphone:      ["",[Validators.required,
                             Validators.pattern("^[0-9]*$"),
                             Validators.minLength(8), Validators.maxLength(10)]],
      tutor_home_phone:     ["",[Validators.required,
                              Validators.pattern("^[0-9]*$"),
                              Validators.minLength(8), Validators.maxLength(10)]],
      contact_name:         ["",[Validators.required,Validators.minLength(1)]],
    
    contact_lastname_mother:[""],
    contact_home_phone:     ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]], 
    contact_email:          ["",[Validators.required,
                                   Validators.email]],
    tutor_name :            ["",[Validators.required,Validators.minLength(1)]],
    tutor_lastname_mother:  [""], 
    tutor_work_phone:       ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]],
    contact_lastname_father:  ["",[Validators.required]], 
    contact_cellphone:      ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]],
    contact_work_phone:     ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]],
    user_id:                ["",[Validators.required,Validators.min(1)]],
    parent_name:             [""],
      
    })

    this.routerAct.params.subscribe((params) => {
      this.id = params['id'];
      this.getCatalogos();

    })
    
  }

 
  manejarEventoDesdeHijo(event:any){
    this.update(event);
    this.buscador=!this.buscador;

    
  }

  showDialog() {
   this.nameParent="";
   this.formFood.reset();
    this.table = false;
  }
  showDialog2() {
    this.display2 = true;
  }
  closeModal() {
    this.display = false;

  }

  emitirEvento(item){
    this.update(item)
  }

  closeModal3() {
    this.display3 = false;

  }
  closeModal2() {
    this.display2 = false;
    this.resteValu();

  }
  showDialogSearchUp() {
    this.displayEditUpd =!this.displayEditUpd;

  }
  searchpartenEdit(){
    this.resSearch= false;
    let a :any = this.formFood.get('parent_name').value
    if( a.length>2){
      this.catalogos.searchUser(a).subscribe((res:any)=>{
        this.parent = res.data;
        console.log(this.parent);
        this.resSearch= true;
        let b = {'user_id':this.item.user_id,'tutor_email':this.item.tutor_email}
        this.parent.push(b);
      },error=>{
         let b = {'user_id':this.item.user_id,'tutor_email':this.item.tutor_email}
        this.parent.push(b);
        console.log(error);
        
      })
    }

  }

  getCatalogos() {
    

    if (this.id ==undefined) {
      this.catalogos.getParentAdmi().subscribe((res: any) => {
        this.listcatalogos = res.data;
      
        console.log(this.listcatalogos);
       
      });     
    } else{
      console.log('update---',this.id);
      
      this.updateInfo({id:this.id})

    }
  }

  updateInfo(item){
    this.resteValu()
    this.display2= true;
    this.table= false;
 
    this.catalogos.getParentU(item.id).subscribe((res:any)=>{
   console.log(res);
   this.item={user_id:res.data.user_id,tutor_email:res.data.tutor_email};
   this.nameParent= res.data.tutor_name + res.data.tutor_lastname_mother + res.data.tutor_lastname_father;
   this.updateId = res.data.id;

    this.formFood.patchValue({
     
      tutor_lastname_father:res.data.tutor_lastname_father,
      tutor_cellphone:      res.data.tutor_cellphone,
      tutor_home_phone:     res.data.tutor_home_phone,
      contact_name:         res.data.contact_name,
    
    contact_lastname_mother:res.data.contact_lastname_mother,
    contact_home_phone:     res.data.contact_home_phone, 
    contact_email:          res.data.contact_email,
    tutor_name :           res.data.tutor_name,
    tutor_lastname_mother:  res.data.tutor_lastname_mother, 
    tutor_work_phone:      res.data.tutor_work_phone,
    contact_lastname_father:  res.data.contact_lastname_father, 
    contact_cellphone:      res.data.contact_cellphone,
    contact_work_phone:     res.data.contact_work_phone,
    user_id:                res.data.user_id,
    parent_name:            name,
    })

    this.catalogos.getParentAdmi().subscribe((res: any) => {
      this.listcatalogos = res.data;
    
      console.log(this.listcatalogos);
     
    });   
   
   })

  

   
  
    
  }

      

  executeSearch() {
    if (this.id !=undefined) {
      this.dt.filterGlobal(this.id, 'contains'); // Limpia cualquier filtro global anterior
     
    } 
  }

  schoolinf(id) {
    console.log(this.school);
    
    let b = this.school.filter((res:any) => {   
  return res.id == Number(id);
    });
    console.log(b);
    
    return b[0].name; // Assuming 'school' is an array of objects and you want to return the name of the first matching object.
  }



  

  prueba(){
    this.spinner=true;
    if(this.formFood.valid){     
      this.catalogos.postParent(this.formFood.value).subscribe((res:any)=>{
          console.log(res);
          if(res.succes == 200){

            this.spinner=false; 
            this.getCatalogos();
            this.statuAgrgado = true;
            this.resteValu();
            this.table= true;
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

      this.getcontact_email();
      this.getcontact_home_phone();
      this.getcontact_work_phone();
      this.getcontact_cellphone();
      this.getcontact_lastname_mother();
      this.getcontact_lastname_father();
      this.getcontact_name();
      this.gettutor_work_phone();
      this.gettutor_home_phone();
      this.gettutor_cellphone();
      this.gettutor_lastname_mother();
      this.getTutor_lastname_father();
      this. getTutor_name();
      
    }

    
  }

  guardar() {
    if(this.formFood.valid){
      this.catalogos.patchParent(this.updateId,this.formFood.value).subscribe((res: any) => {
        this.getCatalogos();
        this.statuAgrgado = true;
        this.resteValu();
        setTimeout(() => {
          this.statuAgrgado = false;
          this.closeModal();
          this.table=true;
          this.display2= false
        }, 1000);
  
      }, error => {
        alert('No se pudo Agregar')
      })
    }else{
      
      this.getcontact_email();
      this.getcontact_home_phone();
      this.getcontact_work_phone();
      this.getcontact_cellphone();
      this.getcontact_lastname_mother();
      this.getcontact_lastname_father();
      this.getcontact_name();
      this.gettutor_work_phone();
      this.gettutor_home_phone();
      this.gettutor_cellphone();
      this.gettutor_lastname_mother();
      this.getTutor_lastname_father();
      this. getTutor_name();
    }
   

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
    this.resteValu()
     this.updateId = item.id;
    this.display2= true;
    this.table= false;
    this.item={user_id:item.user_id,tutor_email:item.tutor_email};
    this.nameParent= item.tutor_name + item.tutor_lastname_mother + item.tutor_lastname_father;
    this.catalogos.getParentU(item.tutor_id).subscribe((res:any)=>{
   console.log(res);
   
    this.formFood.patchValue({
     
      tutor_lastname_father:res.data.tutor_lastname_father,
      tutor_cellphone:      res.data.tutor_cellphone,
      tutor_home_phone:     res.data.tutor_home_phone,
      contact_name:         res.data.contact_name,
    
    contact_lastname_mother:res.data.contact_lastname_mother,
    contact_home_phone:     res.data.contact_home_phone, 
    contact_email:          res.data.contact_email,
    tutor_name :           res.data.tutor_name,
    tutor_lastname_mother:  res.data.tutor_lastname_mother, 
    tutor_work_phone:      res.data.tutor_work_phone,
    contact_lastname_father:  res.data.contact_lastname_father, 
    contact_cellphone:      res.data.contact_cellphone,
    contact_work_phone:     res.data.contact_work_phone,
    user_id:                res.data.user_id,
    parent_name:            name,
    })

    
   
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
    let a = {
      "camper":this.formFood.value,
      "vaccines": this.vaccines,
      "licensed_medicines": this.licensed_medicines,
      "food_restrictions": this.food_restrictions,
      "pathological_background":this.pathological_background,
      "pathological_background_fm": this.pathological_background_fm

    }
    console.log(a);
    if(this.formFood.valid){
      this.catalogos.patchParent(this.updateId,this.formFood.value).subscribe((res:any)=>{
        console.log(res);
        if(res.succes == 200){

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

    }else{
      this.spinner= false;
      this.getcontact_email();
      this.getcontact_home_phone();
      this.getcontact_work_phone();
      this.getcontact_cellphone();
      this.getcontact_lastname_mother();
      this.getcontact_lastname_father();
      this.getcontact_name();
      this.gettutor_work_phone();
      this.gettutor_home_phone();
      this.gettutor_cellphone();
      this.gettutor_lastname_mother();
      this.getTutor_lastname_father();
      this. getTutor_name();       
    }
  }

  cancelarUpdate(){
   this.table =true;
   this.display2 =false;
    
  }
  deletModal(name,id){
    this.idDalete= id;
    this.TextElimint='Deseas Eliminar '+ name + '  del catalogo';
    this.display3 = true; 
   
  }

  delet(){
    this.camperSer.deletCamper(this.idDalete).subscribe((res: any) => {
      if(res.detail.status == 1){

      this.statuAgrgado = true;
      this.resteValu();
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);
    }else{
      alert('No se pudo Eliminar debido que esta en uso')

    }

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
      this.catalogos.searchUser(a).subscribe((res:any)=>{
        this.parent = res.data;
        console.log(this.parent);
        this.resSearch= true;
        
      },error=>{
        console.log(error);
        
      })
    }

  }

  getTutor_lastname_father(){
    if( this.formFood.get('tutor_lastname_father').valid){
      this.render.removeClass(this.tutor_lastname_father.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_lastname_father.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_lastname_father.nativeElement,"is-valid");
      this.render.addClass(this.tutor_lastname_father.nativeElement,"is-invalid");
      this.tutor_lastname_father.nativeElement.focus()

     }
  }
  gettutor_lastname_mother(){
    if( this.formFood.get('tutor_lastname_mother').valid){
      this.render.removeClass(this.tutor_lastname_mother.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_lastname_mother.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_lastname_mother.nativeElement,"is-valid");
      this.render.addClass(this.tutor_lastname_mother.nativeElement,"is-invalid");
      this.tutor_lastname_mother.nativeElement.focus()

     }
  }
  gettutor_cellphone(){
    if( this.formFood.get('tutor_cellphone').valid){
      this.render.removeClass(this.tutor_cellphone.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_cellphone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_cellphone.nativeElement,"is-valid");
      this.render.addClass(this.tutor_cellphone.nativeElement,"is-invalid");
      this.tutor_cellphone.nativeElement.focus()

     }
  }
  gettutor_home_phone(){
    if( this.formFood.get('tutor_home_phone').valid){
      this.render.removeClass(this.tutor_home_phone.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_home_phone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_home_phone.nativeElement,"is-valid");
      this.render.addClass(this.tutor_home_phone.nativeElement,"is-invalid");
      this.tutor_home_phone.nativeElement.focus()

     }
  }
  gettutor_work_phone(){
    if( this.formFood.get('tutor_work_phone').valid){
      this.render.removeClass(this.tutor_work_phone.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_work_phone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_work_phone.nativeElement,"is-valid");
      this.render.addClass(this.tutor_work_phone.nativeElement,"is-invalid");
      this.tutor_work_phone.nativeElement.focus()

     }
  }

  getcontact_name(){
    if( this.formFood.get('contact_name').valid){
      this.render.removeClass(this.contact_name.nativeElement,"is-invalid");
        this.render.addClass(this.contact_name.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_name.nativeElement,"is-valid");
      this.render.addClass(this.contact_name.nativeElement,"is-invalid");
      this.contact_name.nativeElement.focus()

     }
  }
  showDialogSearch() {
    this.displayEdit =!this.displayEdit;

  }

  getcontact_lastname_father(){
    if( this.formFood.get('contact_lastname_father').valid){
      this.render.removeClass(this.contact_lastname_father.nativeElement,"is-invalid");
        this.render.addClass(this.contact_lastname_father.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_lastname_father.nativeElement,"is-valid");
      this.render.addClass(this.contact_lastname_father.nativeElement,"is-invalid");
      this.contact_lastname_father.nativeElement.focus()

     }

  }

  getcontact_lastname_mother(){
    if( this.formFood.get('contact_lastname_mother').valid){
      this.render.removeClass(this.contact_lastname_mother.nativeElement,"is-invalid");
        this.render.addClass(this.contact_lastname_mother.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_lastname_mother.nativeElement,"is-valid");
      this.render.addClass(this.contact_lastname_mother.nativeElement,"is-invalid");
      this.contact_lastname_mother.nativeElement.focus()

     }

  }
  getcontact_cellphone(){
    if( this.formFood.get('contact_cellphone').valid){
      this.render.removeClass(this.contact_cellphone.nativeElement,"is-invalid");
        this.render.addClass(this.contact_cellphone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_cellphone.nativeElement,"is-valid");
      this.render.addClass(this.contact_cellphone.nativeElement,"is-invalid");
      this.contact_cellphone.nativeElement.focus()

     }

  }
  getcontact_work_phone(){
    if( this.formFood.get('contact_work_phone').valid){
      this.render.removeClass(this.contact_work_phone.nativeElement,"is-invalid");
        this.render.addClass(this.contact_work_phone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_work_phone.nativeElement,"is-valid");
      this.render.addClass(this.contact_work_phone.nativeElement,"is-invalid");
      this.contact_work_phone.nativeElement.focus()

     }

  }
  getcontact_home_phone(){
    if( this.formFood.get('contact_home_phone').valid){
      this.render.removeClass(this.contact_home_phone.nativeElement,"is-invalid");
        this.render.addClass(this.contact_home_phone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_home_phone.nativeElement,"is-valid");
      this.render.addClass(this.contact_home_phone.nativeElement,"is-invalid");
      this.contact_home_phone.nativeElement.focus()

     }
  }
  getcontact_email(){
    if( this.formFood.get('contact_email').valid){
      this.render.removeClass(this.contact_email.nativeElement,"is-invalid");
        this.render.addClass(this.contact_email.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_email.nativeElement,"is-valid");
      this.render.addClass(this.contact_email.nativeElement,"is-invalid");
      this.contact_email.nativeElement.focus()

     }
  }
  getTutor_name() {
    if( this.formFood.get('tutor_name').valid){
      this.render.removeClass(this.tutor_name.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_name.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_name.nativeElement,"is-valid");
      this.render.addClass(this.tutor_name.nativeElement,"is-invalid");
      this.tutor_name.nativeElement.focus()

     }
    
  }
  select(){
    let a = this.parent.filter(item=>
     item.user_id== this.formFood.get('user_id').value 
    )
    console.log(this.formFood.get('user_id').value);
    
    console.log(a);
    
    if(a.length>0){
      console.log('se encontro');
      
      this.nameParent = a[0].tutor_email; 
      this.displayEdit = false;
    }
   
  }
  

  

  

}
