import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { CamperService } from 'src/services/camper.service';
import {NgForm} from '@angular/forms';



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





  sexo:string[]=['Hombre','Mujer',"No binario"," Prefiero no decir"]

  constructor(private catalogos: CamperService ) {
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
  }

  
  prueba1(){
    console.log(this.prueba);
    
  }
}
