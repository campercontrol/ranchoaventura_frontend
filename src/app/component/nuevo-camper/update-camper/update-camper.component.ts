import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'ng5-slider';
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


  constructor(private catalogos: CamperService , private formGrup: FormBuilder, private router:Router,private routesA:ActivatedRoute) {
    this.routesA.params.subscribe((params)=>{
      this.id = params['id']
    })
    this.catalogos.getCamper(this.id).subscribe((res:any)=>{

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
      photo:[""],
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
      contact_homephone: ["",[Validators.required,Validators.minLength(8)]],
      contact_cellphone: ["",[Validators.required,Validators.minLength(8)]],
      record_id: [0,],
      parent_id: [1,[Validators.required]],
      terms: ["",[Validators.required,Validators.requiredTrue]],
    });




    this.getcamper();

    
  }


  getcamper(){
    this.catalogos.getCamper(this.id).subscribe(
      (res:any)=>{
        console.log('respuestas',res);
        
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
            parent_id: 1,
        


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
    
    this.catalogos.updateCamper(9,a).subscribe((res:any)=>{
        console.log(res);
        if(res.succes = 200){
          this.spinner=false;
          this.router.navigate(['parents/registered-children']);
        }
        
    });
    
  }
  prueba2(event){
    const archivo = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.photoSelect = reader.result;
      reader.readAsDataURL(archivo);
    const formulario = new FormData()
    formulario.append('file',this.foto)
    this.catalogos.setPhoto(formulario).subscribe((res: any) => {
      console.log(res.path);
      this.formUser.patchValue({
        photo: res.path
      })
    },
      error => {
        console.log(error)
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
