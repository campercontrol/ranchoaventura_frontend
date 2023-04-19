import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { CamperService } from 'src/services/camper.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';



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
  prueba:any;

  public formuser : FormGroup;






  sexo:string[]=['Hombre','Mujer',"No binario"," Prefiero no decir"]

  constructor(private catalogos: CamperService , private formGrup: FormBuilder) {
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

      console.log(this.food_restrictions, this.genders,this.grades,this.school);     
    })

  }

  ngOnInit(): void {

    this.formuser = this.formGrup.group({
      name:["",[Validators.required]],
      lastname_father:["",[Validators.required]],
      lastname_mother:["",[Validators.required]],
      photo:["",[Validators.required]],
      gender_id:[0,[Validators.required]],
      birthday:["",[Validators.required]],
      height:[0,[Validators.required]],
      weight:[0,[Validators.required]],
      grade:[0,[Validators.required]],
      school_id:[0,[Validators.required]],
      school_other:["",],
      email: ["",[Validators.required]],
      can_swim: [0,[Validators.required]],
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
      doctor_precall: [Boolean,[Validators.required]],
      prohibited_foods: ["",[Validators.required]],
      comments_admin: ["",[Validators.required]],
      insurance: [Boolean,[Validators.required]],
      insurance_company: [Boolean,[Validators.required]],
      insurance_number: ["",[Validators.required]],
      security_social_number: ["",[Validators.required]],
      contact_name: ["",[Validators.required]],
      contact_relation: ["",[Validators.required]],
      contact_homephone: ["",[Validators.required]],
      contact_cellphone: ["",[Validators.required]],
      record_id: [0,[Validators.required]],
      parent_id: [0,[Validators.required]],


    })
  }

  
  prueba1(){
    console.log(this.prueba);
    
  }
}
