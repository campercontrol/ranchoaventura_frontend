import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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





  sexo:string[]=['Hombre','Mujer',"No binario"," Prefiero no decir"]

  constructor(private catalogos: CamperService , private formGrup: FormBuilder, private router:Router,private render:Renderer2) {
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
      name:["",[Validators.required,Validators.minLength(2)]],
      lastname_father:["",[Validators.required,,Validators.minLength(2)]],
      lastname_mother:["",[Validators.required,,Validators.minLength(2)]],
      photo:["",[Validators.required]],
      gender_id:[0,[Validators.required,Validators.min(0)]],
      birthday:["",[Validators.required]],
      height:[0,[Validators.required,Validators.min(0.20)]],
      weight:[0,[Validators.required,Validators.min(0.20)]],
      grade:[0,[Validators.required,Validators.min(0)]],
      school_id:[0,[Validators.required,Validators.min(0)]],
      school_other:["",],
      email: ["",[Validators.required,Validators.email]],
      can_swim: [0],
      affliction: ["",[Validators.required]],
      blood_type: [0,[Validators.required]],
      heart_problems: ["",[Validators.required,Validators.minLength(2)]],
      psicology_treatments: ["",[Validators.required,Validators.minLength(2)]],
      prevent_activities: ["",[Validators.required,Validators.minLength(2)]],
      drug_allergies: ["",[Validators.required,Validators.minLength(2)]],
      other_allergies: ["",[Validators.required,Validators.minLength(2)]],
      nocturnal_disorders: ["",[Validators.required,Validators.minLength(2)]],
      phobias: ["",[Validators.required,Validators.minLength(2)]],
      drugs: ["",[Validators.required,Validators.minLength(2)]],
      doctor_precall: [false],
      prohibited_foods: ["",[Validators.required,Validators.minLength(2)]],
      comments_admin: ["Ninguno"],
      insurance: [false],
      insurance_company: [true],
      insurance_number: [""],
      security_social_number: ["",],
      contact_name: ["",[Validators.required,Validators.minLength(2)]],
      contact_relation: ["",[Validators.required,Validators.minLength(3)]],
      contact_homephone: ["",[Validators.required,Validators.minLength(8)]],
      contact_cellphone: ["",[Validators.required,Validators.minLength(8)]],
      record_id: [0,],
      parent_id: [1,[Validators.required]],
      terms: ["",[Validators.required,Validators.requiredTrue]],
    })
    
  }

  getname(){
    if( this.formUser.get('name').valid){
      this.render.removeClass(this.name.nativeElement,"is-invalid");
      this.render.addClass(this.name.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.name.nativeElement,"is-valid");
    this.render.addClass(this.name.nativeElement,"is-invalid");
    this.name.nativeElement.focus()

   }
    
  }

  getlastname_father()  {
    if( this.formUser.get('lastname_father').valid){
      this.render.removeClass(this.lastname_father.nativeElement,"is-invalid");
      this.render.addClass(this.lastname_father.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.lastname_father.nativeElement,"is-valid");
    this.render.addClass(this.lastname_father.nativeElement,"is-invalid");
    this.lastname_father.nativeElement.focus()

   }  
  }
  
  getlastname_mother() {
    
    if( this.formUser.get('lastname_mother').valid){
      this.render.removeClass(this.lastname_mother.nativeElement,"is-invalid");
      this.render.addClass(this.lastname_mother.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.lastname_mother.nativeElement,"is-valid");
    this.render.addClass(this.lastname_mother.nativeElement,"is-invalid");
    this.lastname_mother.nativeElement.focus()

   } 
  }
  
  getphoto() {
    if(this.formUser.get('photo').valid){
      return true
    }else{
      return false

    }
     
  }
  
  getgender_id() {
    if( this.formUser.get('gender_id').valid){
      this.render.removeClass(this.gender_id.nativeElement,"is-invalid");
      this.render.addClass(this.gender_id.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.gender_id.nativeElement,"is-valid");
    this.render.addClass(this.gender_id.nativeElement,"is-invalid");
    this.gender_id.nativeElement.focus()

   }
  }
  
  getbirthday() {
    if( this.formUser.get('birthday').valid){
      this.render.removeClass(this.birthday.nativeElement,"is-invalid");
      this.render.addClass(this.birthday.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.birthday.nativeElement,"is-valid");
    this.render.addClass(this.birthday.nativeElement,"is-invalid");
    this.birthday.nativeElement.focus()

   }
  }
  
  getheight() {
    if( this.formUser.get('height').valid){
      this.render.removeClass(this.height.nativeElement,"is-invalid");
      this.render.addClass(this.height.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.height.nativeElement,"is-valid");
    this.render.addClass(this.height.nativeElement,"is-invalid");
    this.height.nativeElement.focus()

   }
  }
  
  getweight() {
    if( this.formUser.get('weight').valid){
      this.render.removeClass(this.weight.nativeElement,"is-invalid");
      this.render.addClass(this.weight.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.weight.nativeElement,"is-valid");
    this.render.addClass(this.weight.nativeElement,"is-invalid");
    this.weight.nativeElement.focus()

   }
  }
  
  getgrade() {
    if( this.formUser.get('grade').valid){
      this.render.removeClass(this.grade.nativeElement,"is-invalid");
      this.render.addClass(this.grade.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.grade.nativeElement,"is-valid");
    this.render.addClass(this.grade.nativeElement,"is-invalid");
    this.grade.nativeElement.focus()

   }
  }
  
  getschool_id() {
    if( this.formUser.get('school_id').valid){
      this.render.removeClass(this.school_id.nativeElement,"is-invalid");
      this.render.addClass(this.school_id.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.school_id.nativeElement,"is-valid");
    this.render.addClass(this.school_id.nativeElement,"is-invalid");
    this.school_id.nativeElement.focus()

   }
  }
  
  get school_other() {
    return this.formUser.get('school_other')  ;
  }
  
  getemail() {
   
    if( this.formUser.get('email').valid){
      this.render.removeClass(this.email.nativeElement,"is-invalid");
      this.render.addClass(this.email.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.email.nativeElement,"is-valid");
    this.render.addClass(this.email.nativeElement,"is-invalid");
    this.email.nativeElement.focus()

   } 
  }
  
  get can_swim() {
    return this.formUser.get('can_swim')  ;
  }
  
  getaffliction() {
    if( this.formUser.get('affliction').valid){
      this.render.removeClass(this.affliction.nativeElement,"is-invalid");
      this.render.addClass(this.affliction.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.affliction.nativeElement,"is-valid");
    this.render.addClass(this.affliction.nativeElement,"is-invalid");
    this.affliction.nativeElement.focus()

   }
  }
  
  getblood_type() {
    if( this.formUser.get('blood_type').valid){
      this.render.removeClass(this.blood_type.nativeElement,"is-invalid");
      this.render.addClass(this.blood_type.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.birthday.nativeElement,"is-valid");
    this.render.addClass(this.blood_type.nativeElement,"is-invalid");
    this.blood_type.nativeElement.focus()

   }
  }
  
  getheart_problems() {
    if( this.formUser.get('heart_problems').valid){
      this.render.removeClass(this.heart_problems.nativeElement,"is-invalid");
      this.render.addClass(this.heart_problems.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.heart_problems.nativeElement,"is-valid");
    this.render.addClass(this.heart_problems.nativeElement,"is-invalid");
    this.heart_problems.nativeElement.focus()

   }
  }
  
  getpsicology_treatments() {
    if( this.formUser.get('psicology_treatments').valid){
      this.render.removeClass(this.psicology_treatments.nativeElement,"is-invalid");
      this.render.addClass(this.psicology_treatments.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.psicology_treatments.nativeElement,"is-valid");
    this.render.addClass(this.psicology_treatments.nativeElement,"is-invalid");
    this.psicology_treatments.nativeElement.focus()

   }
  }
  
  getprevent_activities() {
    if( this.formUser.get('prevent_activities').valid){
      this.render.removeClass(this.prevent_activities.nativeElement,"is-invalid");
      this.render.addClass(this.prevent_activities.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.prevent_activities.nativeElement,"is-valid");
    this.render.addClass(this.prevent_activities.nativeElement,"is-invalid");
    this.prevent_activities.nativeElement.focus()

   }
  }
  
  getdrug_allergies() {
    if( this.formUser.get('drug_allergies').valid){
      this.render.removeClass(this.drug_allergies.nativeElement,"is-invalid");
      this.render.addClass(this.drug_allergies.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.drug_allergies.nativeElement,"is-valid");
    this.render.addClass(this.drug_allergies.nativeElement,"is-invalid");
    this.drug_allergies.nativeElement.focus()

   }
  
  }
  
  getother_allergies() {
    if( this.formUser.get('other_allergies').valid){
      this.render.removeClass(this.other_allergies.nativeElement,"is-invalid");
      this.render.addClass(this.other_allergies.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.other_allergies.nativeElement,"is-valid");
    this.render.addClass(this.other_allergies.nativeElement,"is-invalid");
    this.other_allergies.nativeElement.focus()

   }
  }
  
  getnocturnal_disorders() {
    if( this.formUser.get('nocturnal_disorders').valid){
      this.render.removeClass(this.nocturnal_disorders.nativeElement,"is-invalid");
      this.render.addClass(this.nocturnal_disorders.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.nocturnal_disorders.nativeElement,"is-valid");
    this.render.addClass(this.nocturnal_disorders.nativeElement,"is-invalid");
    this.nocturnal_disorders.nativeElement.focus()

   }
  }
  
  getphobias() {
    if( this.formUser.get('phobias').valid){
      this.render.removeClass(this.phobias.nativeElement,"is-invalid");
      this.render.addClass(this.phobias.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.phobias.nativeElement,"is-valid");
    this.render.addClass(this.phobias.nativeElement,"is-invalid");
    this.phobias.nativeElement.focus()

   }
  }
  
  getdrugs() {
    if( this.formUser.get('drugs').valid){
      this.render.removeClass(this.drugs.nativeElement,"is-invalid");
      this.render.addClass(this.drugs.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.drugs.nativeElement,"is-valid");
    this.render.addClass(this.drugs.nativeElement,"is-invalid");
    this.drugs.nativeElement.focus()

   }
    
  }
  
  get doctor_precall() {
    return this.formUser.get('doctor_precall')  ;
  }
  
  getprohibited_foods() {
    if( this.formUser.get('insurance_number').valid){
      this.render.removeClass(this.prohibited_foods.nativeElement,"is-invalid");
      this.render.addClass(this.prohibited_foods.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.prohibited_foods.nativeElement,"is-valid");
    this.render.addClass(this.prohibited_foods.nativeElement,"is-invalid");
    this.prohibited_foods.nativeElement.focus()

   }
   
  }
  
  getcomments_admin() {
    return this.formUser.get('comments_admin')  ;
  }
  
  getinsurance() {
    return this.formUser.get('insurance')  ;
  }
  
  getinsurance_company() {
    return this.formUser.get('insurance_company')  ;
  }
  
  getinsurance_number() {
    if( this.formUser.get('insurance_number').valid){
      this.render.removeClass(this.insurance_number.nativeElement,"is-invalid");
      this.render.addClass(this.insurance_number.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.insurance_number.nativeElement,"is-valid");
    this.render.addClass(this.insurance_number.nativeElement,"is-invalid");
    this.insurance_number.nativeElement.focus()

   }
  }
  
  getsecurity_social_number() {
    if( this.formUser.get('security_social_number').valid){
      this.render.removeClass(this.security_social_number.nativeElement,"is-invalid");
      this.render.addClass(this.security_social_number.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.security_social_number.nativeElement,"is-valid");
    this.render.addClass(this.security_social_number.nativeElement,"is-invalid");
    this.security_social_number.nativeElement.focus()

   }
  }
  
  getcontact_name() {
    if( this.formUser.get('contact_name').valid){
      this.render.removeClass(this.contact_name.nativeElement,"is-invalid");
      this.render.addClass(this.contact_name.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_name.nativeElement,"is-valid");
    this.render.addClass(this.contact_name.nativeElement,"is-invalid");
    this.contact_name.nativeElement.focus()

   }
  }
  
  getcontact_relation() {
    if( this.formUser.get('contact_relation').valid){
      this.render.removeClass(this.contact_relation.nativeElement,"is-invalid");
      this.render.addClass(this.contact_relation.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_relation.nativeElement,"is-valid");
    this.render.addClass(this.contact_relation.nativeElement,"is-invalid");
    this.contact_relation.nativeElement.focus()

   }
  }
  
  getcontact_homephone() {
    if( this.formUser.get('contact_homephone').valid){
      this.render.removeClass(this.contact_homephone.nativeElement,"is-invalid");
      this.render.addClass(this.contact_homephone.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_homephone.nativeElement,"is-valid");
    this.render.addClass(this.contact_homephone.nativeElement,"is-invalid");
    this.contact_homephone.nativeElement.focus()

   }
  }
  
  getcontact_cellphone() {
    if( this.formUser.get('contact_cellphone').valid){
      this.render.removeClass(this.contact_cellphone.nativeElement,"is-invalid");
      this.render.addClass(this.contact_cellphone.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_cellphone.nativeElement,"is-valid");
    this.render.addClass(this.contact_cellphone.nativeElement,"is-invalid");
    this.contact_cellphone.nativeElement.focus()

   }
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
    if(this.formUser.valid){
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
           this.router.navigate(['parents/registered-children']);
          }
          
      });
      this.spinner=false;

    }else{
      this.spinner=false;

      this.getcontact_homephone();
      this.getcontact_cellphone();
      this.getcontact_relation();
      this.getcontact_name();
      this.getprohibited_foods();
      this.getother_allergies();
      this.getdrug_allergies();
      this.getdrugs();
      this.getsecurity_social_number();
      this.getinsurance_number();
      this.getpsicology_treatments();
      this.getphobias();
      this.getnocturnal_disorders();
      this.getaffliction();
      this.getprevent_activities();
      this.getheart_problems();
      this.getgrade();
      this.getschool_id();
      this.getbirthday();
      this.getgender_id();
      this.getemail();
      this.getlastname_mother();
      this.getlastname_father();
      this.getname();
      this.getheight();
      this.getweight();
      this.getphoto();
     

    }

    
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
