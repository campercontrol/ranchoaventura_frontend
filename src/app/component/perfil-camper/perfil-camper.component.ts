import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons } from "primeng/api";
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CamperService } from 'src/services/camper.service';
import { ParentService } from 'src/services/parent.service';
import { differenceInCalendarMonths, format } from 'date-fns';
import { StaffService } from 'src/services/staff.service';




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
  deuda = 0;
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
  camperband:any = [];
  error:boolean = false;
  typecoment:number = 1


  constructor(private primengConfig: PrimeNGConfig, private routesA: ActivatedRoute, private hijos: CamperService,private parents : ParentService, private rou:Router,private info: AuthenticationService,private staff: StaffService) {
    this.routesA.params.subscribe((params) => {
      this.id = params['id'];
    })
    this.getInfo()
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    console.log(this.info.infToken,'datos del token');
    

   
  }

  comentario() {
    let a :any={}
      if(this.info.infToken.role_id== 1){
        a = {
          "comment": this.comment,
          "is_public": true,
          "show_to": 1,
          "user_id": this.info.infToken.user_id,
          "camp_id": 2,
          "camper_id": Number(this.id),   
          "role_id": this.info.infToken.role_id  
        }
      }else{
        a = {
          "comment": this.comment,
          "is_public": true,
          "show_to": 1,
          "user_id": this.info.infToken.user_id,
          "camp_id": null,
          "camper_id": Number(this.id),    
          "role_id": this.info.infToken.role_id  
 
        }
      }

  
    
    if(this.comment!=""){
      this.parents.setComentarios(a).subscribe((res:any)=>{
        console.log(res.data);
        
        if(res.data){
          this.getInfo()
          this.comment = ""
  
        }
      })

    }
 

  }

  

  calculateAge(birthday: any): string {
    console.log(birthday,'eddddd');
    
    const hoy = new Date();
    const cumpleanos = new Date(birthday);

    const years = differenceInCalendarMonths(hoy, cumpleanos) / 12;
    const months = differenceInCalendarMonths(hoy, cumpleanos) % 12;

    if (years < 1) {
      return `${months} meses`;
    } else {
      return `${Math.floor(years)} años y ${months} meses`;
    }
  }
  
  
  
  
  // doctor_precall varibles
  getInfo(){
    this.hijos.getPerfil(this.id).subscribe((res: any) => {
      console.log(res,'hola');
      let b = [];
      this.error=false
      let camps = res.camper_subscribe_camps
      camps.forEach(element => {
        element.type= 'subscribe';
      });
      let campsCan = res.camper_cancelled_camps
      campsCan.forEach(element => {
        element.type= 'cancelled';
      });
      let campsPassed = res.camper_passed_camps
      campsPassed.forEach(element => {
        element.type= 'passed';
      });
      
      b=b.concat(camps);
     b= b.concat(campsCan);
     b= b.concat(campsPassed);



     this.camperband = res.camper_band[0];
      this.historialCaps = b;
      this.historialCaps.sort((x,y)=>{
        x.camp_start - y.camp_start
      })

      console.log(this.historialCaps,'ddd');
      
      
      
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
      this.infoCamp = res.camper_info.camper;
      this.deuda =  res.camper_total_amount;
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

      this.infoCamp.doctor_precall=this.infoCamp.doctor_precall== true ? "Sí, se requiere una llamada previa al campamento por parte del medico" :  "No, se requiere una llamada previa"



    },error=>{
      this.error= true
    })
  }
  update(){
    this.rou.navigate(['dashboard/parents/update-camper/'+this.id])

  }

  link(id){
    this.rou.navigate(['dashboard/parents/camp-info/'+this.id+'/'+id]);

  }
  linkPerfil(){
    this.rou.navigate(['dashboard/parents/inscription/'+this.id]);

  }

}
