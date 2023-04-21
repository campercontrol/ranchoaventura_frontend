import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { CamperService } from 'src/services/camper.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
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
      photo:[""],
      gender_id:[0,[Validators.required]],
      birthday:["",[Validators.required]],
      height:[0,[Validators.required]],
      weight:[0,[Validators.required]],
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

  
  subiendo(event:any){
    const archivo= event.target.files[0];

    if(event.target.files && event.target.files[0]){
    const reader = new FileReader();
    reader.onload = e => this.photoSelect =reader.result;
    reader.readAsDataURL(archivo);
    this.catalogos.setPhoto(archivo).subscribe((res:any)=>{
      console.log(res);

  },
  error=>{
    console.log(error)
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
          this.router.navigate(['parents/registered-children']);
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
