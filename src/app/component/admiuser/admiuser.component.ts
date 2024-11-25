import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/services/catalogos.service';
import traducciones  from 'src/assets/json/lengua.json';
import { CamperService } from 'src/services/camper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-admiuser',
  templateUrl: './admiuser.component.html',
  styleUrls: ['./admiuser.component.scss']
})
export class AdmiuserComponent implements OnInit {
  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  search:any="";
  vacunas:any = [];
  tabla= true;
  table= false;
  item:any={}
  resSearch:boolean = false;
  @ViewChild("name") name: ElementRef;
  @ViewChild("lastname_father") lastname_father: ElementRef;
  @ViewChild("lastname_mother") lastname_mother: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("gender_id") gender_id: ElementRef;
  @ViewChild("birthday") birthday: ElementRef;
  @ViewChild("school_id") school_id: ElementRef; 
  @ViewChild("grade") grade: ElementRef; 
  @ViewChild("weight") weight: ElementRef; 
  @ViewChild("height") height: ElementRef;

  @ViewChild("blood_type") blood_type: ElementRef; 
  @ViewChild("heart_problems") heart_problems: ElementRef; 
  @ViewChild("prevent_activities") prevent_activities: ElementRef; 
  @ViewChild("affliction") affliction: ElementRef; 
  @ViewChild("nocturnal_disorders") nocturnal_disorders: ElementRef; 
  @ViewChild("phobias") phobias: ElementRef; 
  @ViewChild("psicology_treatments") psicology_treatments: ElementRef; 
  @ViewChild("security_social_number") security_social_number: ElementRef; 
  @ViewChild("insurance_number") insurance_number: ElementRef;  
  @ViewChild("drugs") drugs: ElementRef; 
  @ViewChild("drug_allergies") drug_allergies: ElementRef;  
  @ViewChild("other_allergies") other_allergies: ElementRef; 
  @ViewChild("prohibited_foods") prohibited_foods: ElementRef; 
  @ViewChild("contact_relation") contact_relation: ElementRef; 
  @ViewChild("contact_name") contact_name: ElementRef; 
  @ViewChild("contact_cellphone") contact_cellphone: ElementRef; 
  @ViewChild("contact_homephone") contact_homephone: ElementRef; 
  @ViewChild("photo") photo: ElementRef;
  @ViewChild("school_other") school_other: ElementRef;
  @ViewChild("insurance_company") insurance_company: ElementRef;
  spinner:boolean= false;
  photoSelect : string | ArrayBuffer;
  photoSatus = false;
  spinerPhot= true;
  
  idDalete =0;
  updateId= 0;
  text: any;
  TextElimint="";
  formFood: FormGroup;
  date: Date = new Date();
  statuAgrgado = false;
  textos:any ={};
  nameParent ="";
  licensed_medicines:any = [];
  pathological_background:any = [];
  pathological_background_fm:any = [];
  food_restrictions:any = [];
  blood_types:any = [];
  vaccines:any = [];
  displayEdit:boolean= false;
  genders:any = [];
  grades:any = [];
  school:any = [];
  parent:any = [];
  buscador:boolean=false;
  escuelas:any = [];
  listBuscador:any=[];
  photoSelectUp : string | ArrayBuffer;
  displayEditUpd:boolean = false;
  idioma = 'esp';
  @ViewChild('dt') dt: Table;

  id:any;
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
  
  constructor(private catalogos: CatalogosService, private _FormBuild: FormBuilder,private camperSer: CamperService,private render :Renderer2,private router :Router,private routerAct:ActivatedRoute) {
    this.textos  = traducciones['traduciones'][this.idioma]['formUserChildren'];
    console.log(this.textos);
    this.routerAct.params.subscribe((params) => {
      this.id = params['id'];
      this.infoCatalogos(); 

    })
    this.table=true;   


  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      lastname_father: ["", [Validators.required, Validators.minLength(2)]],
      lastname_mother: [""],
      photo: ["", [Validators.required]],
      gender_id: [0, [Validators.required, this.greaterThanZeroValidator()]],
      birthday: ["", [Validators.required]],
      height: [0, [Validators.required, Validators.min(0.20)]],
      weight: [0, [Validators.required, Validators.min(0.20)]],
      grade: [0, [Validators.required, this.greaterThanZeroValidator()]],
      school_id: [0, [Validators.required, this.greaterThanZeroValidator()]],
      school_other: [""],
      email: [""],
      can_swim: [87],
      affliction: ["", [Validators.required]],
      blood_type: [0, [Validators.required, this.greaterThanZeroValidator()]],
      heart_problems: ["", [Validators.required, Validators.minLength(2)]],
      psicology_treatments: ["", [Validators.required, Validators.minLength(2)]],
      prevent_activities: ["", [Validators.required, Validators.minLength(2)]],
      drug_allergies: ["", [Validators.required, Validators.minLength(2)]],
      other_allergies: ["", [Validators.required, Validators.minLength(2)]],
      nocturnal_disorders: ["", [Validators.required, Validators.minLength(2)]],
      phobias: ["", [Validators.required, Validators.minLength(2)]],
      drugs: ["", [Validators.required, Validators.minLength(2)]],
      doctor_precall: [false],
      prohibited_foods: ["", [Validators.required, Validators.minLength(2)]],
      comments_admin: ["Ninguno"],
      insurance: [false],
      insurance_company: [""],
      insurance_number: [""],
      security_social_number: [""],
      contact_name: ["", [Validators.required, Validators.minLength(2)]],
      contact_relation: ["", [Validators.required, Validators.minLength(3)]],
      contact_homephone: [0, [Validators.required, Validators.minLength(8)]],
      contact_cellphone: [0, [Validators.required, Validators.minLength(8)]],
      record_id: [0],
      parent_id: [0, [Validators.required]],
      parent_name: [""],
    });
    
  }

  infoCatalogos(){
    this.camperSer.getCatalogos().subscribe((res:any)=>{
      //console.log(info.infToken);     
      this.blood_types = res.blood_types;
      this.food_restrictions = res.food_restrictions;
      this.genders = res.genders;
      this.grades = res.grades;
      this.licensed_medicines = res.licensed_medicines;
      this.pathological_background = res.pathological_background;
      this.pathological_background_fm = res.pathological_background_fm;
      this.school = res.school;
      this.vaccines = res.vaccines;
      this.getCatalogos()
      console.log(res);     
    })
    this.table = false;
  }
  cancelarUpdate(){
    this.table =true;
    this.display2 =false;
  }


  showDialog() {
    this.infoCatalogos();
    this.resteValu();

  }
  showDialogSearch() {
    this.displayEdit =!this.displayEdit;

  }
  showDialogSearchUp() {
    this.displayEditUpd =!this.displayEditUpd;

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
    this.table= true;
    this.resteValu();

  }

  getCatalogos() {
    if(this.id == undefined){

      this.catalogos.getCamperAdmi().subscribe((res: any) => {
        this.listcatalogos = res.data;
        console.log(res.data);
       
           
       // this.table=true;
      });
    }else{
      this.update({camper_id:this.id})
      this.catalogos.getCamperAdmi().subscribe((res: any) => {
        this.listcatalogos = res.data;
        console.log(res.data);
       
           
       // this.table=true;
      });
    }
 
  }


  executeSearch() {
    if (this.id !=undefined) {
      this.dt.filterGlobal(this.id, 'contains'); // Limpia cualquier filtro global anterior
     
    } 
  }

  schoolinf(id) {
    //console.log(this.school);
    
    let b = this.school.filter((res:any) => {   
  return res.id == Number(id);
    });
    console.log(b);
    
    return b[0].name; // Assuming 'school' is an array of objects and you want to return the name of the first matching object.
  }



  guardarOrder(){
    let a = []
    this.listcatalogos.forEach((element,index) => {
      a.push({id:element.id,order:index})     
    });
    this.catalogos.order(1,a).subscribe((res: any) => {
      console.log(res);
      
      this.getCatalogos();
      })  
  }
  canelar(){
    this.formFood.reset();
    this.table=true;
    this.display2= false

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

  prueba1(){
    this.spinner=true;
    this.formFood.patchValue({
      record_id:0
    }) 
    if(this.formFood.valid){
      let a ={ 
        "camper":this.formFood.value,
        "vaccines": this.vaccines,
        "licensed_medicines": this.licensed_medicines,
        "food_restrictions": this.food_restrictions,
        "pathological_background":this.pathological_background,
        "pathological_background_fm": this.pathological_background_fm
  
      }
      console.log(a);
      
      this.camperSer.setCamper(a).subscribe((res:any)=>{
          console.log(res);
          if(res.succes = 200){
            this.spinner=false; 
            this.getCatalogos();
            this.statuAgrgado = true;
            this.canelar();
            this.resteValu();
            setTimeout(() => {
              this.statuAgrgado = false;
              this.closeModal();
            }, 1000);    
          }
          
      },error => {
        this.spinner= false;
        alert('No se pudo Agregar')
      });
      this.spinner=false;

    }else{
      this.spinner=false;
      this.getinsurance_company()
      this.getsecurity_social_number();
      this.getinsurance_number();
      this.getcontact_homephone();
      this.getcontact_cellphone();
      this.getcontact_relation();
      this.getcontact_name();
      this.getprohibited_foods();
      this.getpsicology_treatments()
      this.getphobias();
      this.getnocturnal_disorders();
      this.getother_allergies();
      this.getdrug_allergies()
      this.getdrugs();
      this.getaffliction();
      this.getprevent_activities();
      this.getheart_problems();
      this.getblood_type();
      this.getweight();
      this.getheight();
      this.getgrade();
      this.getSchool_other();
      this.getschool_id();
      this.getphoto();
      this.getbirthday();
      this.getgender_id();
      this.getemail();
      this.getlastname_mother();
      this.getlastname_father();
      this.getname();
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
    this.nameParent = "";
    this.formFood.patchValue({
      assigned_id: 0,
      can_swim: 87,
      order: 0,
      created_at: this.date
    })
  }

  update(item){
    this.updateId = item.camper_id; 
   this.camperSer.getCamper(item.camper_id).subscribe((res:any)=>{
    console.log(res,'informacion del camper');

    this.blood_types = res.blood_types;
    this.food_restrictions = res.food_restrictions;
    this.genders = res.genders;
    this.grades = res.grades;
    this.licensed_medicines = res.licensed_medicines;
    this.pathological_background = res.pathological_background;
    this.pathological_background_fm = res.pathological_background_fm;
    this.school = res.school[0];
    this.vaccines = res.vaccines; 
    this.photoSelectUp = 'http://142.93.12.234:8000/'+res['camper'].photo;
   
    
    this.formFood.patchValue({
     
      name:res['camper'].name,
      lastname_father:res['camper'].lastname_father,
      lastname_mother:res['camper'].lastname_mother,
      photo:res['camper'].photo,
      gender_id:res['camper'].gender_id,
      birthday:res['camper'].birthday,
      height:res['camper'].height,
      weight:res['camper'].weight,
      grade:res['camper'].grade,
      school_id:res['camper'].school_id,
      school_other:res['camper'].school_other,
      email: res['camper'].email,
      can_swim: res['camper'].can_swim,
      affliction: res['camper'].affliction,
      blood_type: res['camper'].blood_type,
      heart_problems: res['camper'].heart_problems,
      psicology_treatments: res['camper'].psicology_treatments,
      prevent_activities: res['camper'].prevent_activities,
      drug_allergies: res['camper'].drug_allergies,
      other_allergies: res['camper'].other_allergies,
      nocturnal_disorders: res['camper'].nocturnal_disorders,
      phobias: res['camper'].phobias,
      drugs:res['camper'].drugs,
      doctor_precall: res['camper'].doctor_precall,
      prohibited_foods: res['camper'].prohibited_foods,
      comments_admin: res['camper'].comments_admin,
      insurance: res['camper'].insurance,
      insurance_company: res['camper'].insurance_company,
      insurance_number: res['camper'].insurance_number,
      security_social_number: res['camper'].security_social_number,
      contact_name:res['camper'].contact_name,
      contact_relation: res['camper'].contact_relation,
      contact_homephone: res['camper'].contact_homephone,
      contact_cellphone: res['camper'].contact_cellphone,
      record_id:0,
      parent_id: res['camper'].parent_id,
    })
    this.camperSer.getSearchParen(res['camper'].parent_id).subscribe((res)=>{
      console.log(res.tutor_name);
      
      this.item = res.data;
      console.log(this.item,'padre info');
      
      this.nameParent = this.item.tutor_name + this.item.tutor_lastname_father + this.item.tutor_lastname_mother
      console.log(this.nameParent);
      
  })
    
   })

   this.table= false;
   this.display2= true;

   
  
    
  }

  routerLink(item){


    this.router.navigate(['dashboard/parents/camper/'+item.camper_id])

  }

  updateSeacrh(item){
    this.updateId = item.camper_id; 
   this.camperSer.getCamper(item.camper_id).subscribe((res:any)=>{
    this.blood_types = res.blood_types;
    this.food_restrictions = res.food_restrictions;
    this.genders = res.genders;
    this.grades = res.grades;
    this.licensed_medicines = res.licensed_medicines;
    this.pathological_background = res.pathological_background;
    this.pathological_background_fm = res.pathological_background_fm;
    this.school = res.school[0];
    this.vaccines = res.vaccines; 
    this.photoSelectUp = 'http://142.93.12.234:8000/'+res['camper'].photo;
   

    this.formFood.patchValue({
     
      name:res['camper'].name,
      lastname_father:res['camper'].lastname_father,
      lastname_mother:res['camper'].lastname_mother,
      photo:res['camper'].photo,
      gender_id:res['camper'].gender_id,
      birthday:res['camper'].birthday,
      height:res['camper'].height,
      weight:res['camper'].weight,
      grade:res['camper'].grade,
      school_id:res['camper'].school_id,
      school_other:res['camper'].school_other,
      email: res['camper'].email,
      can_swim: res['camper'].can_swim,
      affliction: res['camper'].affliction,
      blood_type: res['camper'].blood_type,
      heart_problems: res['camper'].heart_problems,
      psicology_treatments: res['camper'].psicology_treatments,
      prevent_activities: res['camper'].prevent_activities,
      drug_allergies: res['camper'].drug_allergies,
      other_allergies: res['camper'].other_allergies,
      nocturnal_disorders: res['camper'].nocturnal_disorders,
      phobias: res['camper'].phobias,
      drugs:res['camper'].drugs,
      doctor_precall: res['camper'].doctor_precall,
      prohibited_foods: res['camper'].prohibited_foods,
      comments_admin: res['camper'].comments_admin,
      insurance: res['camper'].insurance,
      insurance_company: res['camper'].insurance_company,
      insurance_number: res['camper'].insurance_number,
      security_social_number: res['camper'].security_social_number,
      contact_name:res['camper'].contact_name,
      contact_relation: res['camper'].contact_relation,
      contact_homephone: res['camper'].contact_homephone,
      contact_cellphone: res['camper'].contact_cellphone,
      record_id:0,
      parent_id: res['camper'].parent_id,
    })
    this.camperSer.getSearchParen(res['camper'].parent_id).subscribe((res)=>{
      console.log(res.tutor_name);
      
      this.item = res.data;
      console.log(this.item,'padre info');
      
      this.nameParent = this.item.tutor_name + this.item.tutor_lastname_father + this.item.tutor_lastname_mother
      console.log(this.nameParent);
      
  })
    
   })

   this.table= false;
   this.display2= true;
   this.buscador=!this.buscador;
   
  
    
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
      this.camperSer.updateCamper(this.updateId,a).subscribe((res:any)=>{
        console.log(res);
        if(res.succes = 200){
          this.spinner = false;
          this.getCatalogos();
          this.statuAgrgado = true;
          this.resteValu();
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
      console.log('no se logro');
      
      this.spinner=false;
      this.getinsurance_company()
      this.getsecurity_social_number();
      this.getinsurance_number();
      this.getcontact_homephone();
      this.getcontact_cellphone();
      this.getcontact_relation();
      this.getcontact_name();
      this.getprohibited_foods();
      this.getpsicology_treatments()
      this.getphobias();
      this.getnocturnal_disorders();
      this.getother_allergies();
      this.getdrug_allergies()
      this.getdrugs();
      this.getaffliction();
      this.getprevent_activities();
      this.getheart_problems();
      this.getblood_type();
      this.getweight();
      this.getheight();
      this.getgrade();
      this.getSchool_other();
      this.getschool_id();
      this.getphoto();
      this.getbirthday();
      this.getgender_id();
      this.getemail();
      this.getlastname_mother();
      this.getlastname_father();
      this.getname();
     
    }
   
   
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
      alert('No se pudo Eliminar debido a que esta en uso')

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
  greaterThanZeroValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value === null || value === undefined || isNaN(value) || value <= 0) {
        return { greaterThanZero: true };
      }
      return null;
    };
  }
  licensed_medicinesValu(i:any){
    this.licensed_medicines[i].is_active =! this.licensed_medicines[i].is_active;
  }

  pathological_background_fmValu(i:any){
    this.pathological_background_fm[i].is_active =! this.pathological_background_fm[i].is_active;
  }
  pathological_backgroundValu(i:any){
    this.pathological_background[i].is_active =! this.pathological_background[i].is_active;
  }
  food_restrictionsValu(i:any){
    this.food_restrictions[i].is_active =! this.food_restrictions[i].is_active;
  }
  vaccinesValu(i:any){
    this.vaccines[i].is_active =! this.vaccines[i].is_active;
  }

  getname(){
    if( this.formFood.get('name').valid){
      this.render.removeClass(this.name.nativeElement,"is-invalid");
      this.render.addClass(this.name.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.name.nativeElement,"is-valid");
    this.render.addClass(this.name.nativeElement,"is-invalid");
    this.name.nativeElement.focus()

   }
    
  }

  getlastname_father()  {
    if( this.formFood.get('lastname_father').valid){
      this.render.removeClass(this.lastname_father.nativeElement,"is-invalid");
      this.render.addClass(this.lastname_father.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.lastname_father.nativeElement,"is-valid");
    this.render.addClass(this.lastname_father.nativeElement,"is-invalid");
    this.lastname_father.nativeElement.focus()

   }  
  }
  
  getlastname_mother() {
    
    if( this.formFood.get('lastname_mother').valid){
      this.render.removeClass(this.lastname_mother.nativeElement,"is-invalid");
      this.render.addClass(this.lastname_mother.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.lastname_mother.nativeElement,"is-valid");
    this.render.addClass(this.lastname_mother.nativeElement,"is-invalid");
    this.lastname_mother.nativeElement.focus()

   } 
  }
  
  getphoto() {
    if(this.formFood.get('photo').valid){
      this.photoSatus = true;
    }else{
     // this.photo.nativeElement.focus();
      console.log('ere');
      const element:any = document.getElementById("photo");
      element.scrollIntoViewIfNeeded();

      this.photoSatus= false;
    }
     
  }
  
  getgender_id() {
    if( this.formFood.get('gender_id').valid){
      console.log( this.formFood.get('gender_id').valid);
      
      this.render.removeClass(this.gender_id.nativeElement,"is-invalid");
      this.render.addClass(this.gender_id.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.gender_id.nativeElement,"is-valid");
    this.render.addClass(this.gender_id.nativeElement,"is-invalid");
    
    this.gender_id.nativeElement.focus()
    

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
  searchpartenEdit(){
    this.resSearch= false;
    let a :any = this.formFood.get('parent_name').value
    if( a.length>2){
      this.catalogos.searchPerent(a).subscribe((res:any)=>{
        this.parent = res.data;
        console.log(this.parent);
        this.resSearch= true;
        let b = {'tutor_id':this.item.data.tutor_id,'tutor_name':this.item.tutor_name,'tutor_lastname_father':this.item.data.tutor_lastname_father,'tutor_lastname_mother':this.item.data.tutor_lastname_mother}
        this.parent.push(b);
      },error=>{
        let b = {'tutor_id':this.item.data.tutor_id,'tutor_name':this.item.tutor_name,'tutor_lastname_father':this.item.data.tutor_lastname_father,'tutor_lastname_mother':this.item.data.tutor_lastname_mother}
        this.parent.push(b);
        console.log(error);
        
      })
    }

  }
  
  getbirthday() {
    if( this.formFood.get('birthday').valid){
      this.render.removeClass(this.birthday.nativeElement,"is-invalid");
      this.render.addClass(this.birthday.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.birthday.nativeElement,"is-valid");
    this.render.addClass(this.birthday.nativeElement,"is-invalid");
    this.birthday.nativeElement.focus()

   }
  }
  
  getheight() {
    if( this.formFood.get('height').valid){
      this.render.removeClass(this.height.nativeElement,"is-invalid");
      this.render.addClass(this.height.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.height.nativeElement,"is-valid");
    this.render.addClass(this.height.nativeElement,"is-invalid");
    this.height.nativeElement.focus()

   }
  }
  
  getweight() {
    if( this.formFood.get('weight').valid){
      this.render.removeClass(this.weight.nativeElement,"is-invalid");
      this.render.addClass(this.weight.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.weight.nativeElement,"is-valid");
    this.render.addClass(this.weight.nativeElement,"is-invalid");
    this.weight.nativeElement.focus()

   }
  }
  
  getgrade() {
    if( this.formFood.get('grade').valid){
      this.render.removeClass(this.grade.nativeElement,"is-invalid");
      this.render.addClass(this.grade.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.grade.nativeElement,"is-valid");
    this.render.addClass(this.grade.nativeElement,"is-invalid");
    this.grade.nativeElement.focus()

   }
  }
  
  getschool_id() {
    if( this.formFood.get('school_id').valid){
      this.render.removeClass(this.school_id.nativeElement,"is-invalid");
      this.render.addClass(this.school_id.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.school_id.nativeElement,"is-valid");
    this.render.addClass(this.school_id.nativeElement,"is-invalid");
    this.school_id.nativeElement.focus()

   }
  }
  
  getSchool_other() {
    if( this.formFood.get('school_other').valid){
      this.render.removeClass(this.school_other.nativeElement,"is-invalid");
      this.render.addClass(this.school_other.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.school_other.nativeElement,"is-valid");
    this.render.addClass(this.school_other.nativeElement,"is-invalid");
    this.school_other.nativeElement.focus()

   }  }
  
  getemail() {
   
    if( this.formFood.get('email').valid){
      this.render.removeClass(this.email.nativeElement,"is-invalid");
      this.render.addClass(this.email.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.email.nativeElement,"is-valid");
    this.render.addClass(this.email.nativeElement,"is-invalid");
    this.email.nativeElement.focus()

   } 
  }
  
  get can_swim() {
    return this.formFood.get('can_swim')  ;
  }
  
  getaffliction() {
    if( this.formFood.get('affliction').valid){
      this.render.removeClass(this.affliction.nativeElement,"is-invalid");
      this.render.addClass(this.affliction.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.affliction.nativeElement,"is-valid");
    this.render.addClass(this.affliction.nativeElement,"is-invalid");
    this.affliction.nativeElement.focus()

   }
  }
  
  getblood_type() {
    if( this.formFood.get('blood_type').valid){
      this.render.removeClass(this.blood_type.nativeElement,"is-invalid");
      this.render.addClass(this.blood_type.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.blood_type.nativeElement,"is-valid");
    this.render.addClass(this.blood_type.nativeElement,"is-invalid");
    this.blood_type.nativeElement.focus()

   }
  }
  
  getheart_problems() {
    if( this.formFood.get('heart_problems').valid){
      this.render.removeClass(this.heart_problems.nativeElement,"is-invalid");
      this.render.addClass(this.heart_problems.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.heart_problems.nativeElement,"is-valid");
    this.render.addClass(this.heart_problems.nativeElement,"is-invalid");
    this.heart_problems.nativeElement.focus()

   }
  }
  
  getpsicology_treatments() {
    if( this.formFood.get('psicology_treatments').valid){
      this.render.removeClass(this.psicology_treatments.nativeElement,"is-invalid");
      this.render.addClass(this.psicology_treatments.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.psicology_treatments.nativeElement,"is-valid");
    this.render.addClass(this.psicology_treatments.nativeElement,"is-invalid");
    this.psicology_treatments.nativeElement.focus()

   }
  }
  
  getprevent_activities() {
    if( this.formFood.get('prevent_activities').valid){
      this.render.removeClass(this.prevent_activities.nativeElement,"is-invalid");
      this.render.addClass(this.prevent_activities.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.prevent_activities.nativeElement,"is-valid");
    this.render.addClass(this.prevent_activities.nativeElement,"is-invalid");
    this.prevent_activities.nativeElement.focus()

   }
  }
  
  getdrug_allergies() {
    if( this.formFood.get('drug_allergies').valid){
      this.render.removeClass(this.drug_allergies.nativeElement,"is-invalid");
      this.render.addClass(this.drug_allergies.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.drug_allergies.nativeElement,"is-valid");
    this.render.addClass(this.drug_allergies.nativeElement,"is-invalid");
    this.drug_allergies.nativeElement.focus()

   }
  
  }
  
  getother_allergies() {
    if( this.formFood.get('other_allergies').valid){
      this.render.removeClass(this.other_allergies.nativeElement,"is-invalid");
      this.render.addClass(this.other_allergies.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.other_allergies.nativeElement,"is-valid");
    this.render.addClass(this.other_allergies.nativeElement,"is-invalid");
    this.other_allergies.nativeElement.focus()

   }
  }
  
  getnocturnal_disorders() {
    if( this.formFood.get('nocturnal_disorders').valid){
      this.render.removeClass(this.nocturnal_disorders.nativeElement,"is-invalid");
      this.render.addClass(this.nocturnal_disorders.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.nocturnal_disorders.nativeElement,"is-valid");
    this.render.addClass(this.nocturnal_disorders.nativeElement,"is-invalid");
    this.nocturnal_disorders.nativeElement.focus()

   }
  }
  
  getphobias() {
    if( this.formFood.get('phobias').valid){
      this.render.removeClass(this.phobias.nativeElement,"is-invalid");
      this.render.addClass(this.phobias.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.phobias.nativeElement,"is-valid");
    this.render.addClass(this.phobias.nativeElement,"is-invalid");
    this.phobias.nativeElement.focus()

   }
  }
  
  getdrugs() {
    if( this.formFood.get('drugs').valid){
      this.render.removeClass(this.drugs.nativeElement,"is-invalid");
      this.render.addClass(this.drugs.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.drugs.nativeElement,"is-valid");
    this.render.addClass(this.drugs.nativeElement,"is-invalid");
    this.drugs.nativeElement.focus()

   }
    
  }
  
  get doctor_precall() {
    return this.formFood.get('doctor_precall')  ;
  }
  
  getprohibited_foods() {
    if( this.formFood.get('prohibited_foods').valid){
      this.render.removeClass(this.prohibited_foods.nativeElement,"is-invalid");
      this.render.addClass(this.prohibited_foods.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.prohibited_foods.nativeElement,"is-valid");
    this.render.addClass(this.prohibited_foods.nativeElement,"is-invalid");
    this.prohibited_foods.nativeElement.focus()

   }
   
  }
  
  getcomments_admin() {
    return this.formFood.get('comments_admin')  ;
  }
  
  getinsurance() {
    return this.formFood.get('insurance')  ;
  }
  
  getinsurance_company() {
  
    if( this.formFood.get('insurance_company').valid){
      this.render.removeClass(this.insurance_company.nativeElement,"is-invalid");
      this.render.addClass(this.insurance_company.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.insurance_company.nativeElement,"is-valid");
    this.render.addClass(this.insurance_company.nativeElement,"is-invalid");
    this.insurance_company.nativeElement.focus()

   }
  }
  
  getinsurance_number() {
    if( this.formFood.get('insurance_number').valid){
      this.render.removeClass(this.insurance_number.nativeElement,"is-invalid");
      this.render.addClass(this.insurance_number.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.insurance_number.nativeElement,"is-valid");
    this.render.addClass(this.insurance_number.nativeElement,"is-invalid");
    this.insurance_number.nativeElement.focus()

   }
  }
  
  getsecurity_social_number() {
    if( this.formFood.get('security_social_number').valid){
      this.render.removeClass(this.security_social_number.nativeElement,"is-invalid");
      this.render.addClass(this.security_social_number.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.security_social_number.nativeElement,"is-valid");
    this.render.addClass(this.security_social_number.nativeElement,"is-invalid");
    this.security_social_number.nativeElement.focus()

   }
  }
  
  getcontact_name() {
    if( this.formFood.get('contact_name').valid){
      this.render.removeClass(this.contact_name.nativeElement,"is-invalid");
      this.render.addClass(this.contact_name.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_name.nativeElement,"is-valid");
    this.render.addClass(this.contact_name.nativeElement,"is-invalid");
    this.contact_name.nativeElement.focus()

   }
  }
  
  getcontact_relation() {
    if( this.formFood.get('contact_relation').valid){
      this.render.removeClass(this.contact_relation.nativeElement,"is-invalid");
      this.render.addClass(this.contact_relation.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_relation.nativeElement,"is-valid");
    this.render.addClass(this.contact_relation.nativeElement,"is-invalid");
    this.contact_relation.nativeElement.focus()

   }
  }

 
  getcontact_homephone() {
    if( this.formFood.get('contact_homephone').valid){
      this.render.removeClass(this.contact_homephone.nativeElement,"is-invalid");
      this.render.addClass(this.contact_homephone.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_homephone.nativeElement,"is-valid");
    this.render.addClass(this.contact_homephone.nativeElement,"is-invalid");
    this.contact_homephone.nativeElement.focus()

   }
  }
  
  getcontact_cellphone() {
    if( this.formFood.get('contact_cellphone').valid){
      this.render.removeClass(this.contact_cellphone.nativeElement,"is-invalid");
      this.render.addClass(this.contact_cellphone.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_cellphone.nativeElement,"is-valid");
    this.render.addClass(this.contact_cellphone.nativeElement,"is-invalid");
    this.contact_cellphone.nativeElement.focus()

   }
  }
  
 
  subiendo(event: any) {
    this.spinerPhot = false;

    const archivo = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.photoSelect = reader.result;
      reader.readAsDataURL(archivo);

      const formulario = new FormData();
      formulario.append('file',archivo)
      this.camperSer.setPhoto(formulario).subscribe((res: any) => {
        

        console.log(res.path);

        this.formFood.patchValue({
          photo: res.path
        });
        this.photoSatus= true;
        this.spinerPhot = true;

      },
        error => {
          console.log(error);
          this.photoSatus= false;
        })
    }
  }

  searchUser(){
    this.catalogos.searchCamper(this.search).subscribe((res:any)=>{
      this.listBuscador = res.data;
      
      
    },error=>{
      console.log(error);
      
    })
  }
  

}
