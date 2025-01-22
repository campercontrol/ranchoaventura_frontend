import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons } from "primeng/api";
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CamperService } from 'src/services/camper.service';
import { ParentService } from 'src/services/parent.service';
import { differenceInCalendarMonths, format } from 'date-fns';
import { StaffService } from 'src/services/staff.service';
import { LangService } from 'src/services/lang.service';




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
  totals:any;
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
  typecoment:number = 1;
  userPermis:any;
  infoCamper:Welcome;
  translations = 
    {
      "eng": {
          "HEADER.PAST_CAMPS": "Past Camps",
          "HEADER.UPCOMING_CAMPS": "Upcoming Camps",
          "HEADER.INSCRIBE_TO_CAMPS": "Inscribe to Camps",
          "ALERT.PENDING_PAYMENTS": "Pending Payments",
          "ALERT.TOTAL_BALANCE": "Total Balance",
          "PROFILE.CAMPER_PROFILE": "Camper Profile",
          "PROFILE.EDIT": "Edit",
          "PROFILE.CAMPER": "Camper",
          "PROFILE.NAME": "Name",
          "PROFILE.DATE_OF_BIRTH": "Date of Birth",
          "PROFILE.AGE": "Age",
          "PROFILE.GENDER": "Gender",
          "PROFILE.EMAIL": "Email",
          "PROFILE.EDUCATION": "Education",
          "PROFILE.SCHOOL": "School",
          "PROFILE.GRADE": "Grade",
          "PROFILE.SKILLS": "Skills",
          "PROFILE.CAN_SWIM": "Can Swim",
          "PROFILE.PREVENT_ACTIVITIES": "Prevent Activities",
          "PROFILE.MEDICAL_INFO": "Medical Information",
          "PROFILE.REQUIRES_MEDICAL_INSTRUCTIONS": "Requires Medical Instructions",
          "PROFILE.WEIGHT": "Weight",
          "PROFILE.HEIGHT": "Height",
          "PROFILE.BLOOD_TYPE": "Blood Type",
          "PROFILE.VACCINES": "Vaccines",
          "PROFILE.AFFLICTION": "Affliction",
          "PROFILE.HEART_PROBLEMS": "Heart Problems",
          "PROFILE.DRUG_ALLERGIES": "Drug Allergies",
          "PROFILE.OTHER_ALLERGIES": "Other Allergies",
          "PROFILE.NOCTURNAL_DISORDERS": "Nocturnal Disorders",
          "PROFILE.MEDICATION": "Medication",
          "PROFILE.INSURANCE": "Insurance",
          "PROFILE.HAS_INSURANCE": "Has Insurance",
          "PROFILE.SOCIAL_SECURITY_NUMBER": "Social Security Number",
          "PROFILE.POLICY_NUMBER": "Policy Number",
          "PROFILE.NUTRITION": "Nutrition",
          "PROFILE.PROHIBITED_FOODS": "Prohibited Foods",
          "PROFILE.FOOD": "Food",
          "PROFILE.PRIMARY_TUTOR": "Primary Tutor",
          "PROFILE.TUTOR_NAME": "Name",
          "PROFILE.TUTOR_PHONE": "Phone",
          "PROFILE.TUTOR_EMAIL": "Email",
          "PROFILE.TUTOR_RELATED": "Relation",
          "PROFILE.SECONDARY_TUTOR": "Secondary Tutor",
          "PROFILE.SECONDARY_TUTOR_NAME": "Name",
          "PROFILE.SECONDARY_TUTOR_PHONE": "Phone",
          "PROFILE.SECONDARY_TUTOR_EMAIL": "Email",
          "PROFILE.SECONDARY_TUTOR_RELATED": "Relation",
          "PROFILE.EMERGENCY_CONTACTS": "Emergency Contacts",
          "PROFILE.CONTACT_NAME": "Name",
          "PROFILE.CONTACT_PHONE": "Phone",
          "PROFILE.CONTACT_EMAIL": "Email",
          "PROFILE.CONTACT_RELATION": "Relation"
      },
      "esp": {
          "HEADER.PAST_CAMPS": "Campamentos Anteriores",
          "HEADER.UPCOMING_CAMPS": "Campamentos Próximos",
          "HEADER.INSCRIBE_TO_CAMPS": "Inscribirse a Campamentos",
          "ALERT.PENDING_PAYMENTS": "Pagos Pendientes",
          "ALERT.TOTAL_BALANCE": "Saldo Total",
          "PROFILE.CAMPER_PROFILE": "Perfil del Campista",
          "PROFILE.EDIT": "Editar",
          "PROFILE.CAMPER": "Campista",
          "PROFILE.NAME": "Nombre",
          "PROFILE.DATE_OF_BIRTH": "Fecha de Nacimiento",
          "PROFILE.AGE": "Edad",
          "PROFILE.GENDER": "Género",
          "PROFILE.EMAIL": "Correo Electrónico",
          "PROFILE.EDUCATION": "Educación",
          "PROFILE.SCHOOL": "Escuela",
          "PROFILE.GRADE": "Grado",
          "PROFILE.SKILLS": "Habilidades",
          "PROFILE.CAN_SWIM": "Puede Nadar",
          "PROFILE.PREVENT_ACTIVITIES": "Actividades a Evitar",
          "PROFILE.MEDICAL_INFO": "Información Médica",
          "PROFILE.REQUIRES_MEDICAL_INSTRUCTIONS": "Requiere Instrucciones Médicas",
          "PROFILE.WEIGHT": "Peso",
          "PROFILE.HEIGHT": "Altura",
          "PROFILE.BLOOD_TYPE": "Tipo de Sangre",
          "PROFILE.VACCINES": "Vacunas",
          "PROFILE.AFFLICTION": "Afección",
          "PROFILE.HEART_PROBLEMS": "Problemas Cardíacos",
          "PROFILE.DRUG_ALLERGIES": "Alergias a Medicamentos",
          "PROFILE.OTHER_ALLERGIES": "Otras Alergias",
          "PROFILE.NOCTURNAL_DISORDERS": "Trastornos Nocturnos",
          "PROFILE.MEDICATION": "Medicación",
          "PROFILE.INSURANCE": "Seguro",
          "PROFILE.HAS_INSURANCE": "Tiene Seguro",
          "PROFILE.SOCIAL_SECURITY_NUMBER": "Número de Seguridad Social",
          "PROFILE.POLICY_NUMBER": "Número de Póliza",
          "PROFILE.NUTRITION": "Nutrición",
          "PROFILE.PROHIBITED_FOODS": "Alimentos Prohibidos",
          "PROFILE.FOOD": "Comida",
          "PROFILE.PRIMARY_TUTOR": "Tutor Primario",
          "PROFILE.TUTOR_NAME": "Nombre",
          "PROFILE.TUTOR_PHONE": "Teléfono",
          "PROFILE.TUTOR_EMAIL": "Correo Electrónico",
          "PROFILE.TUTOR_RELATED": "Relación",
          "PROFILE.SECONDARY_TUTOR": "Tutor Secundario",
          "PROFILE.SECONDARY_TUTOR_NAME": "Nombre",
          "PROFILE.SECONDARY_TUTOR_PHONE": "Teléfono",
          "PROFILE.SECONDARY_TUTOR_EMAIL": "Correo Electrónico",
          "PROFILE.SECONDARY_TUTOR_RELATED": "Relación",
          "PROFILE.EMERGENCY_CONTACTS": "Contactos de Emergencia",
          "PROFILE.CONTACT_NAME": "Nombre",
          "PROFILE.CONTACT_PHONE": "Teléfono",
          "PROFILE.CONTACT_EMAIL": "Correo Electrónico",
          "PROFILE.CONTACT_RELATION": "Relación"
      }
  
  
  };
  idioma:string;
  currencyKeys: string[];



  constructor(private primengConfig: PrimeNGConfig, private routesA: ActivatedRoute, private hijos: CamperService,private parents : ParentService, private rou:Router,public info: AuthenticationService,private staff: StaffService,private lang:LangService) {
    this.routesA.params.subscribe((params) => {
      this.id = params['id'];
    })
    this.getInfo()
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    console.log(this.info.infToken,'datos del token');
    
    this.userPermis = this.info
    this.lang.getLang().subscribe((res:any)=>{
      this.idioma=res
      console.log(this.idioma);
      
    })
  }

  getTranslation(key: string): string {
    return this.translations[this.idioma || 'esp'][key] || key;
  }
  comentario() {
    let a :any={}
      if(this.info.infToken.role_id == 1){
        a = {
     

          "comment": this.comment,
          "is_public": true,
          "show_to": 1,
          "user_id":  this.info.infToken.user_id,
          "camp_id": 21100,
          "camper_id": this.id,
        }
      }else{
        a = {
          "comment": this.comment,
          "is_public": true,
          "show_to": this.typecoment,
          "user_id": this.info.infToken.user_id,
          "camp_id": 21100,
          "camper_id": Number(this.id),    
          "role_id": this.info.infToken.role_id  
 
        }
      }

  
    
    if(this.comment!=""){
      this.parents.setComentarios(a).subscribe((res:any)=>{
        console.log(res.data);
        
       
          this.getInfo()
          this.comment = ""
  
    
      })

    }
 

  }

  calculateBalanceByCurrency(data: any[]): Record<string, { total: number; acronym: string }> {
    return data.reduce((acc, item) => {
      if (item.show_payment_parent) {  // Solo sumar si show_payment_parent es true
        const symbol = item.currency_symbol;
        if (!acc[symbol]) {
          acc[symbol] = { total: 0, acronym: item.currency_acronyms };
        }
        acc[symbol].total += item.camper_payment_balance;
      }
      return acc;
    }, {} as Record<string, { total: number; acronym: string }>);
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
      let b = [];
      this.error=false;
      this.infoCamper = res;
      console.log(this.infoCamper,'holassss');

      let camps =[ ...res.camper_subscribe_camps]
    




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

     this.totals = this.calculateBalanceByCurrency(b);
     this.currencyKeys = Object.keys(this.totals);  


     this.camperband = res.camper_band[0];
      this.historialCaps = b;
      this.historialCaps.sort((x,y)=>{
        x.camp_start - y.camp_start
      })

      console.log(this.historialCaps,'ddd');
      
      
      
      this.comenarios = res.camper_comments
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
      this.nombreTutor = this.parent.tutor_name + " " + this.parent.tutor_lastname_father + " " + this.parent.tutor_lastname_mother;
      this.nombreCome = this.parent.tutor_name;
      this.nombreTutorSecundario = this.parent.contact_name + " " + this.parent.contact_lastname_father + " " + this.parent.contact_lastname_mother
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
      this.infoCamp.can_swim = this.infoCamp.can_swim == 86  ? 'Si' : 'No';
      this.infoCamp.insurance = this.infoCamp.insurance == true ? 'Si' : 'No';

      this.infoCamp.doctor_precall=this.infoCamp.doctor_precall== true ? "Sí, se requiere una llamada previa al campamento por parte del medico" :  "No se requiere una llamada previa"

        console.log(this.comenarios,'comentarioss');
        

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

export interface Welcome {
  camper_band:            CamperBand[];
  camper_info:            CamperInfo;
  camper_total_amount:    number;
  parent:                 Parent;
  user_email:             string;
  camper_comments:        any[];
  camper_subscribe_camps: any[];
  camper_cancelled_camps: any[];
  camper_passed_camps:    any[];
}

export interface CamperBand {
  full_name:    string;
  school:       string;
  photo:        string;
  birthday:     Date;
  future_camps: number;
  past_camps:   number;
}

export interface CamperInfo {
  camper:                     Camper;
  vaccines:                   FoodRestriction[];
  licensed_medicines:         FoodRestriction[];
  food_restrictions:          FoodRestriction[];
  pathological_background:    FoodRestriction[];
  pathological_background_fm: FoodRestriction[];
  genders:                    BloodType[];
  blood_types:                BloodType[];
  school:                     Array<School[]>;
  grades:                     BloodType[];
}

export interface BloodType {
  id:    number;
  value: string;
}

export interface Camper {
  lastname_father:        string;
  school_id:              number;
  heart_problems:         string;
  security_social_number: string;
  contact_relation:       string;
  photo:                  string;
  school_other:           string;
  psicology_treatments:   string;
  doctor_precall:         boolean;
  contact_name:           string;
  lastname_mother:        string;
  email:                  string;
  prevent_activities:     string;
  prohibited_foods:       string;
  contact_homephone:      string;
  gender_id:              number;
  can_swim:               number;
  drug_allergies:         string;
  comments_admin:         string;
  contact_cellphone:      string;
  updated_at:             Date;
  birthday:               Date;
  affliction:             string;
  other_allergies:        string;
  insurance:              boolean;
  parent_id:              number;
  created_at:             Date;
  id:                     number;
  height:                 number;
  blood_type:             number;
  nocturnal_disorders:    string;
  insurance_company:      string;
  record_id:              number;
  name:                   string;
  weight:                 number;
  temporal_blood_type:    null;
  phobias:                string;
  insurance_number:       string;
  grade:                  number;
  drugs:                  string;
}

export interface FoodRestriction {
  id:        number;
  name:      string;
  is_active: boolean;
}

export interface School {
  id:   number;
  name: string;
}

export interface Parent {
  tutor_lastname_mother:   string;
  contact_home_phone:      string;
  created_at:              Date;
  uid:                     string;
  tutor_cellphone:         string;
  contact_work_phone:      string;
  id:                      number;
  tutor_home_phone:        string;
  contact_email:           string;
  user_id:                 number;
  tutor_work_phone:        string;
  toku_id:                 null;
  contact_name:            string;
  tutor_name:              string;
  contact_lastname_father: string;
  tutor_lastname_father:   string;
  contact_lastname_mother: string;
  contact_cellphone:       string;
  updated_at:              Date;
}
