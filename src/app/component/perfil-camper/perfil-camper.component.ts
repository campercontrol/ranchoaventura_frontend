import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeIcons } from "primeng/api";
import { PrimeNGConfig } from 'primeng/api';
import { CamperService } from 'src/services/camper.service';



@Component({
  selector: 'app-perfil-camper',
  templateUrl: './perfil-camper.component.html',
  styleUrls: ['./perfil-camper.component.scss']
})
export class PerfilCamperComponent implements OnInit {
  
  events2: any[];
  events1: any[];
  providers: [];
  isCollapsed = true;
  id=0;
  infoCamp:any = {};
  catalogoEsculea;
  catalogosGenero;
  catalogosGrados;
  catalogoSangre;
  vacunas;
  vacunasACtivos;
  catalogosComida;

  constructor( private primengConfig: PrimeNGConfig,private routesA:ActivatedRoute ,private hijos: CamperService) { 
    this.routesA.params.subscribe((params)=>{
      this.id = params['id'];      
    })
    hijos.getPerfil(this.id).subscribe((res:any)=>{
      console.log(res);
      this.catalogoEsculea = res.camper_info.school[0];
      this.catalogosGenero = res.camper_info.genders;
      this.catalogoSangre = res.camper_info.blood_types;
      this.vacunas = res.camper_info.vaccines;
      this.catalogosComida = res.camper_info.food_restrictions;
      this.catalogosComida = this.catalogosComida.filter(item => item.is_active == false);
      console.log(this.vacunas);
      
      this.catalogosGrados = res.camper_info.grades;
      this.infoCamp=res.camper_info.camper
      this.infoCamp.birthdayA = this.calculateAge(this.infoCamp.birthday);
      console.log(this.catalogosGenero);
      

      this.vacunasACtivos = this.vacunas.filter(item => item.is_active == false);

    this.catalogoEsculea.map((item:any)=>{
        if( item.id == this.infoCamp.school_id ){
       this.infoCamp.school_id = item.name
     }
    })
    this.catalogosGenero.map((item:any)=>{
          if( item.id == this.infoCamp.gender_id ){
         this.infoCamp.gender_id = item.value
       }
    })
    this.catalogosGrados.map((item:any)=>{
      if( item.id == this.infoCamp.grade ){
     this.infoCamp.grade = item.value
      }
    })
    this.catalogoSangre.map((item:any)=>{
      if( item.id == this.infoCamp.blood_type ){
     this.infoCamp.blood_type = item.value
      }
    })
    this.infoCamp.can_swim =  this.infoCamp.can_swim == 1 ? 'Si':'No';
    this.infoCamp.insurance =  this.infoCamp.insurance == true ? 'Si':'No';



      
    })
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.events1 = [
      {
        status: "Campamento con comentario del admin",
        date: " 28/Nov/2023 - 30/Nov/2023",
      
      },
      {
        status: "Evento con preguntas extras ",
        date: "21/Nov/2023 - 22/Nov/2023 (2 días)",
        icon: PrimeIcons.COG,
        color: "#673AB7"
      },
      {
        status: "Campamento con cargos extras y puntos de control prueba de campamenot grande",
        date: " 10/Nov/2023 - 12/Nov/2023 (3 días)",
        costo:"20000",
        icon: PrimeIcons.ENVELOPE,
        color: "#FF9800"
      },
      {
        status: "Campamento de Verano",
        date: " 13/Jul/2023 - 24/Ago/2023 (1 mes, 1 semana)",
        icon: PrimeIcons.CHECK,
        color: "#607D8B"
      }
    ];

    this.events2 = ["2020", "2021", "2022", "2023"];
  }
  

  calculateAge(birthday:any) {
    console.log(birthday);
    
    var hoy = new Date();
    var cumpleanos = new Date(birthday);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

}
