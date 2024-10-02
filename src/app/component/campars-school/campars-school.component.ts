import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/services/catalogos.service';
import { CreateCampsService } from 'src/services/create-camps.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CamperService } from 'src/services/camper.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-campars-school',
  templateUrl: './campars-school.component.html',
  styleUrls: ['./campars-school.component.scss']
})
export class CamparsSchoolComponent implements OnInit {
  listcatalogos: any[];
  cargando: boolean;
  table:boolean=false;
  blood_types: any;
  food_restrictions: any;
  genders: any;
  grades: any;
  licensed_medicines: any;
  pathological_background: any;
  school: any;
  vaccines: any;

  constructor(private createCamp: CreateCampsService, private formGrup: FormBuilder, private render :Renderer2,private catalogos:CatalogosService,private camperSer: CamperService,private info : AuthenticationService) { }

  ngOnInit(): void {
    
    this.getCatalogos()
  }
  getCatalogos() {
    this.listcatalogos=[];
    this.catalogos.getCamper().subscribe((res: any) => {
      this.listcatalogos = res.data;
      const data :any= this.info.infToken;

    

      this.camperSer.getCatalogos().subscribe((res:any)=>{
        //console.log(info.infToken);     
        this.blood_types = res.blood_types;
        this.food_restrictions = res.food_restrictions;
        this.genders = res.genders;
        this.grades = res.grades;
        this.licensed_medicines = res.licensed_medicines;
        this.pathological_background = res.pathological_background;
        this.school = res.school;
        this.vaccines = res.vaccines;
        this.table = true;
     
      })
      console.log(res.data);
      
         
     // this.table=true;
    });
   
  }
  gradeName(id){
    const data = this.grades.find((item:any)=>{

      return  item.id == id
    })
    return data.value

  }

  calculateAgeString(birthDateString: string): string {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    // Ajuste de años y meses si la fecha actual no ha alcanzado el cumpleaños
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
        years--;
        months = (months + 12) % 12; // Asegurar que los meses sean positivos
    }

    return `${years} años, ${months} meses`;
}
   
}
