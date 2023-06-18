import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons } from "primeng/api";
import { PrimeNGConfig } from 'primeng/api';
import { CamperService } from 'src/services/camper.service';
import { ParentService } from 'src/services/parent.service';



@Component({
  selector: 'app-perfil-camper',
  templateUrl: './perfil-camper.component.html',
  styleUrls: ['./perfil-camper.component.scss']
})
export class PerfilCamperComponent implements OnInit {
  photo = "";
  events2: any[];
  events1: any[];
  nombreCome:string=""
  providers: [];
  isCollapsed = true;
  id = 0;
  infoCamp: any = {};
  catalogoEsculea: any;
  catalogosGenero: any;
  catalogosGrados: any;
  catalogoSangre: any;
  vacunas: any;
  vacunasACtivos: any;
  catalogosComida: any;
  parent: any = {};
  nombreTutor: any = "";
  nombreTutorSecundario: any = "";
  emailTuto = "";
  comenarios: any = [];
  comment:any ="";
  historialCaps:any = [];

  constructor(private primengConfig: PrimeNGConfig, private routesA: ActivatedRoute, private hijos: CamperService,private parents : ParentService, private rou:Router) {
    this.routesA.params.subscribe((params) => {
      this.id = params['id'];
    })
    this.getInfo()
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
        costo: "20000",
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

  comentario() {
    let a = {
      "comment": this.comment,
      "is_public": true,
      "show_to": 1,
      "user_id": 1,
      "camp_id": 2,
      "camper_id": this.id,     
    }
    this.parents.setComentarios(a).subscribe((res:any)=>{
      console.log(res.data);
      
      if(res.data){
        this.getInfo()
        this.comment = ""

      }
    })

  }


  calculateAge(birthday: any) {
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

  getInfo(){
    this.hijos.getPerfil(this.id).subscribe((res: any) => {
      console.log(res);
      let b = []
      b=b.concat(res.camper_subscribe_camps);
     b= b.concat(res.camper_cancelled_camps);
     b= b.concat(res.camper_passed_camps);


      this.historialCaps = b;
      this.historialCaps.sort((x,y)=>{
        x.camp_start - y.camp_start
      })
      
      
      this.comenarios = res.camper_comments_parent
      console.log(this.comenarios);

      this.photo = res.camper_band[0].photo
      this.catalogoEsculea = res.camper_info.school[0];
      this.catalogosGenero = res.camper_info.genders;
      this.catalogoSangre = res.camper_info.blood_types;
      this.vacunas = res.camper_info.vaccines;
      this.catalogosComida = res.camper_info.food_restrictions;
      this.catalogosComida = this.catalogosComida.filter(item => item.is_active == true);
      console.log(this.vacunas);
      this.parent = res.parent;
      this.nombreTutor = this.parent.tutor_name + " " + this.parent.tutor_lastname_father + "" + this.parent.tutor_lastname_mother;
      this.nombreCome = this.parent.tutor_name;
      this.nombreTutorSecundario = this.parent.contact_name + " " + this.parent.contact_lastname_father + "" + this.parent.contact_lastname_mother
      this.emailTuto = res.user_email
      console.log(this.parent);


      this.catalogosGrados = res.camper_info.grades;
      this.infoCamp = res.camper_info.camper
      this.infoCamp.birthdayA = this.calculateAge(this.infoCamp.birthday);
      console.log(this.catalogosGenero);


      this.vacunasACtivos = this.vacunas.filter(item => item.is_active == true);

      this.catalogoEsculea.map((item: any) => {
        if (item.id == this.infoCamp.school_id) {
          this.infoCamp.school_id = item.name
        }
      })
      this.catalogosGenero.map((item: any) => {
        if (item.id == this.infoCamp.gender_id) {
          this.infoCamp.gender_id = item.value
        }
      })
      this.catalogosGrados.map((item: any) => {
        if (item.id == this.infoCamp.grade) {
          this.infoCamp.grade = item.value
        }
      })
      this.catalogoSangre.map((item: any) => {
        if (item.id == this.infoCamp.blood_type) {
          this.infoCamp.blood_type = item.value
        }
      })
      this.infoCamp.can_swim = this.infoCamp.can_swim == 1 ? 'Si' : 'No';
      this.infoCamp.insurance = this.infoCamp.insurance == true ? 'Si' : 'No';




    })
  }

  link(id){
    this.rou.navigate(['parents/camp-info/1/'+id]);

  }
  linkPerfil(id = 1){
    this.rou.navigate(['/parents/inscription/'+id]);

  }

}
