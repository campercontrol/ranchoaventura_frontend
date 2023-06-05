import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { CamperService } from 'src/services/camper.service';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-camper-nuevo',
  templateUrl: './camper-nuevo.component.html',
  styleUrls: ['./camper-nuevo.component.scss']
})
export class CamperNuevoComponent implements OnInit {
  visibleBarOptions: Options = {
    floor: 0,
    ceil: 180,
    showSelectionBar: true
  };
  visibleSelection=0;
  statusImg = false;
  blood_types:any = [];
  food_restrictions:any = [];
  genders:any = [];
  grades:any = [];
  licensed_medicines:any = [];
  pathological_background:any = [];
  pathological_background_fm:any = [];
  school:any = [];
  vaccines:any = [];
  foto:any;
  spinner:boolean= false;
  photoSelect : string | ArrayBuffer;

  public formUser : FormGroup;
  public formGen : FormGroup;
  vacunas:any = [];







  sexo:string[]=['Hombre','Mujer',"No binario"," Prefiero no decir"]

  constructor(private catalogos: CamperService , private formGrup: FormBuilder, private router:Router) {
    this.catalogos.getCatalogos().subscribe((res:any)=>{

      this.blood_types = res.blood_types;
      this.food_restrictions = res.food_restrictions;
      this.genders = res.genders;
      this.grades = res.grades;
      this.licensed_medicines = res.licensed_medicines;
      this.pathological_background = res.pathological_background;
      this.pathological_background_fm = res.pathological_background_fm;
      this.school = res.school;
      this.vaccines = res.vaccines;

      console.log(res);     
    })

  }

  ngOnInit(): void {

    this.formUser = this.formGrup.group({
      name:["",[Validators.required]],
      lastname_father:["",[Validators.required]],
      lastname_mother:["",[Validators.required]],
      photo:["",[Validators.required]],
      gender_id:[0,[Validators.required]],
      birthday:["",[Validators.required]],
      height:[0,[Validators.required,Validators.min(0.20)]],
      weight:[0,[Validators.required,Validators.min(0.20)]],
      grade:[0,[Validators.required]],
      school_id:[0,[Validators.required]],
      school_other:["",],
      email: ["",[Validators.required,Validators.email]],
      can_swim: [0],
      affliction: ["",[Validators.required]],
      blood_type: [0,[Validators.required]],
      heart_problems: ["",[Validators.required]],
      psicology_treatments: ["",[Validators.required]],
      prevent_activities: ["",[Validators.required]],
      drug_allergies: ["",[Validators.required]],
      other_allergies: ["",[Validators.required]],
      nocturnal_disorders: ["",[Validators.required]],
      phobias: ["",[Validators.required]],
      drugs: ["",[Validators.required]],
      doctor_precall: [false],
      prohibited_foods: ["",[Validators.required]],
      comments_admin: ["Ninguno"],
      insurance: [false],
      insurance_company: [true],
      insurance_number: [""],
      security_social_number: ["",],
      contact_name: ["",[Validators.required]],
      contact_relation: ["",[Validators.required]],
      contact_homephone: ["",[Validators.required,Validators.minLength(8)]],
      contact_cellphone: ["",[Validators.required,Validators.minLength(8)]],
      record_id: [0,],
      parent_id: [1,[Validators.required]],
      terms: ["",[Validators.required,Validators.requiredTrue]],
    })
    
  }

  get name(){
    return this.formUser.get('name');
  }

  get lastname_father()  {
    return this.formUser.get('lastname_father');
  }
  
  get lastname_mother() {
    return this.formUser.get('lastname_mother');
  }
  
  get photo() {
    return this.formUser.get('photo');
  }
  
  get gender_id() {
    return this.formUser.get('gender_id');
  }
  
  get birthday() {
    return this.formUser.get('birthday');
  }
  
  get height() {
    return this.formUser.get('height');
  }
  
  get weight() {
    return this.formUser.get('weight')  ;
  }
  
  get grade() {
    return this.formUser.get('grade')  ;
  }
  
  get school_id() {
    return this.formUser.get('school_id')  ;
  }
  
  get school_other() {
    return this.formUser.get('school_other')  ;
  }
  
  get email() {
    return this.formUser.get('email')  ;
  }
  
  get can_swim() {
    return this.formUser.get('can_swim')  ;
  }
  
  get affliction() {
    return this.formUser.get('affliction')  ;
  }
  
  get blood_type() {
    return this.formUser.get('blood_type')  ;
  }
  
  get heart_problems() {
    return this.formUser.get('heart_problems')  ;
  }
  
  get psicology_treatments() {
    return this.formUser.get('psicology_treatments')  ;
  }
  
  get prevent_activities() {
    return this.formUser.get('prevent_activities')  ;
  }
  
  get drug_allergies() {
    return this.formUser.get('drug_allergies')  ;
  }
  
  get other_allergies() {
    return this.formUser.get('other_allergies')  ;
  }
  
  get nocturnal_disorders() {
    return this.formUser.get('nocturnal_disorders')  ;
  }
  
  get phobias() {
    return this.formUser.get('phobias')  ;
  }
  
  get drugs() {
    return this.formUser.get('drugs')  ;
  }
  
  get doctor_precall() {
    return this.formUser.get('doctor_precall')  ;
  }
  
  get prohibited_foods() {
    return this.formUser.get('prohibited_foods')  ;
  }
  
  get comments_admin() {
    return this.formUser.get('comments_admin')  ;
  }
  
  get insurance() {
    return this.formUser.get('insurance')  ;
  }
  
  get insurance_company() {
    return this.formUser.get('insurance_company')  ;
  }
  
  get insurance_number() {
    return this.formUser.get('insurance_number')  ;
  }
  
  get security_social_number() {
    return this.formUser.get('security_social_number')  ;
  }
  
  get contact_name() {
    return this.formUser.get('contact_name')  ;
  }
  
  get contact_relation() {
    return this.formUser.get('contact_relation')  ;
  }
  
  get contact_homephone() {
    return this.formUser.get('contact_homephone')  ;
  }
  
  get contact_cellphone() {
    return this.formUser.get('contact_cellphone')  ;
  }
  
  get record_id()  {
    return this.formUser.get('record_id') ;
  }
  
  get parent_id() {
    return this.formUser.get('parent_id') ;
  }
  subiendo(event: any) {
    const archivo = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.photoSelect = reader.result;
      reader.readAsDataURL(archivo);

      const formulario = new FormData();
      formulario.append('file',archivo)
      this.catalogos.setPhoto(formulario).subscribe((res: any) => {
        

        console.log(res.path);
        this.formUser.patchValue({
          photo: res.path
        })
      },
        error => {
          console.log(error);
          this.statusImg= true;
        })
    }
  }




public fileOver(event){
  console.log(event);
}

public fileLeave(event){
  console.log(event);

}

  
  prueba1(){
    this.spinner=true;
    let a = {
      "camper":this.formUser.value,
      "vaccines": this.vaccines,
      "licensed_medicines": this.licensed_medicines,
      "food_restrictions": this.food_restrictions,
      "pathological_background":this.pathological_background,
      "pathological_background_fm": this.pathological_background_fm

    }
    console.log(a);
    
    this.catalogos.setCamper(a).subscribe((res:any)=>{
        console.log(res);
        if(res.succes = 200){
          this.spinner=false;
         this.router.navigate(['parents/camper/inscription/1']);
        }
        
    });
    
  }
  prueba2(){
    console.log(this.foto);
    
    this.catalogos.setPhoto(this.foto).subscribe((res:any)=>{
      console.log(res);
      
    })
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
}
