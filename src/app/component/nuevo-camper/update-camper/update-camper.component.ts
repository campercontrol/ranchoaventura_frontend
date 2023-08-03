import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CamperService } from 'src/services/camper.service';

@Component({
  selector: 'app-update-camper',
  templateUrl: './update-camper.component.html',
  styleUrls: ['./update-camper.component.scss']
})
export class UpdateCamperComponent implements OnInit {

  visibleBarOptions: Options = {
    floor: 0,
    ceil: 180,
    showSelectionBar: true
  };
  visibleSelection=0;

  blood_types:any = [];
  food_restrictions:any = [];
  genders:any = [];
  grades:any = [];
  licensed_medicines:any = [];
  pathological_background:any = [];
  pathological_background_fm:any = [];
  school1:any = [];
  vaccines:any = [];
  foto:any;
  spinner:boolean= false;

  public formUser : FormGroup;
  public formGen : FormGroup;
  vacunas:any = [];
  sexo:string[]=['Hombre','Mujer',"No binario"," Prefiero no decir"];
  id=0;
  photoSelect: string | ArrayBuffer;
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
  photoSatus = false;
  spinerPhot= true;
  



  constructor(private catalogos: CamperService , private formGrup: FormBuilder, private router:Router,private routesA:ActivatedRoute,private render:Renderer2,private info: AuthenticationService) {
    this.routesA.params.subscribe((params)=>{
      this.id = params['id']
    })
    this.catalogos.getCamper(this.id).subscribe((res:any)=>{
      console.log(res.school);
      
      this.blood_types = res.blood_types;
      this.food_restrictions = res.food_restrictions;
      this.genders = res.genders;
      this.grades = res.grades;
      this.licensed_medicines = res.licensed_medicines;
      this.pathological_background = res.pathological_background;
      this.pathological_background_fm = res.pathological_background_fm;
      this.school1 = res.school[0];
      this.vaccines = res.vaccines;       
    })

  }

  ngOnInit(): void {

    this.formUser = this.formGrup.group({
      name:["",[Validators.required]],
      lastname_father:["",[Validators.required]],
      lastname_mother:["",[Validators.required]],
      photo:["",],
      gender_id:[0,[Validators.required]],
      birthday:["",[Validators.required]],
      height:[0,[Validators.required]],
      weight:[0,[Validators.required]],
      grade:[0,[Validators.required]],
      school_id:[0,[Validators.required]],
      school_other:["",],
      email: ["",[Validators.required,Validators.email]],
      can_swim: [false],
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
      contact_homephone: [0,[Validators.required,Validators.minLength(8)]],
      contact_cellphone: [0,[Validators.required,Validators.minLength(8)]],
      record_id: [0,],
      parent_id: [1,[Validators.required]],
      terms: ["",[Validators.required,Validators.requiredTrue]],
    });



    this.getcamper();

    
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
    if( this.formUser.get('gender_id').valid){
      console.log( this.formUser.get('gender_id').valid);
      
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
  cancelar(){
    this.router.navigate(["dashboard"])
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
  
  getSchool_other() {
    if( this.formUser.get('school_other').valid){
      this.render.removeClass(this.school_other.nativeElement,"is-invalid");
      this.render.addClass(this.school_other.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.school_other.nativeElement,"is-valid");
    this.render.addClass(this.school_other.nativeElement,"is-invalid");
    this.school_other.nativeElement.focus()

   }  }
  
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
    this.render.removeClass(this.blood_type.nativeElement,"is-valid");
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
    if( this.formUser.get('prohibited_foods').valid){
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
  
    if( this.formUser.get('insurance_company').valid){
      this.render.removeClass(this.insurance_company.nativeElement,"is-invalid");
      this.render.addClass(this.insurance_company.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.insurance_company.nativeElement,"is-valid");
    this.render.addClass(this.insurance_company.nativeElement,"is-invalid");
    this.insurance_company.nativeElement.focus()

   }
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


  getcamper(){
    this.catalogos.getCamper(this.id).subscribe(
      (res:any)=>{
        console.log('respuestas',res);
         this.photoSelect = 'http://142.93.12.234:8000/'+res['camper'].photo,

          this.formUser.patchValue({
           
            

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
            parent_id: this.info.infToken.profile_id,
        


          })
      }
    )
  }

  




  
  prueba1(){
    this.spinner=true;
    this.getVaccinesValues();
    let a = {
      "camper":this.formUser.value,
      "vaccines": this.vaccines,
      "licensed_medicines": this.licensed_medicines,
      "food_restrictions": this.food_restrictions,
      "pathological_background":this.pathological_background,
      "pathological_background_fm": this.pathological_background_fm

    }
    console.log(a);
    if(this.formUser.valid){
      this.catalogos.updateCamper(this.id,a).subscribe((res:any)=>{
        console.log(res);
        if(res.succes = 200){
          this.spinner=false;
          this.router.navigate(['dashboard']);
        }
        
    });

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
  subiendo(event: any) {
    this.spinerPhot = false;

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
