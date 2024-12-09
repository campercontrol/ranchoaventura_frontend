import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CamperService } from 'src/services/camper.service';
import { CatalogosService } from 'src/services/catalogos.service';
import { ParentService } from 'src/services/parent.service';
import { StaffService } from 'src/services/staff.service';
import { differenceInCalendarMonths, format } from 'date-fns';


@Component({
  selector: 'app-perfil-staff',
  templateUrl: './perfil-staff.component.html',
  styleUrls: ['./perfil-staff.component.scss']
})
export class PerfilStaffComponent implements OnInit {
  photo = "";
  events2: any[];
  events1: any[];
  nombreCome:string=""
  providers: [];
  isCollapsed = true;
  id = 0;
  typecoment:number = 1
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
  bandHitoryasistir:any;
  bandHitoryasitio:any;
  statusStaff:any=0;
  editarPerfil = false;
  tokenInfo

  constructor(private primengConfig: PrimeNGConfig, private routesA: ActivatedRoute, private staff: StaffService,private parents : ParentService, private rou:Router,private catalogos: CatalogosService, private info:AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.routesA.params.subscribe((params) => {
      this.id = params['id'];
      this.statusStaff= Number(this.info.infToken.role_id) ;
      this.tokenInfo =this.info.infToken
 
      
      if(!this.id){
        console.log(this.statusStaff,'idd');
        this.editarPerfil = true;
        this.id = this.info.infToken.profile_id;
      }else{
        this.editarPerfil = false;

      }
    })
    
    this.getInfo()
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

    this.staff.infoPerfil(this.id).subscribe((res:any)=>{
      console.log(res);
      this.vacunas = res.vaccines
      this.infoCamp = res.staff;
      this.catalogoSangre = res.blood_types;
      this.catalogosComida = res.food_restrictions

      this.infoCamp.birthdayA = this.calculateAge(this.infoCamp.birthday);
      console.log(this.infoCamp);
      this.catalogoSangre.map((item: any) => {
        if (item.id == this.infoCamp.blood_type) {
          this.infoCamp.blood_type = item.value
        }
      })
      this.vacunasACtivos = this.vacunas.filter(item => item.is_active == true);
      this.catalogosComida = this.catalogosComida.filter(item => item.is_active == true);

  
      
    });

    this.staff.getPerfilStaff(this.id).subscribe((res:any)=>{
      console.log(res,'comentarioss');
      this.comenarios= res.staff_comments;
      this.bandHitoryasistir=res.staff_band.camp_attend
      this.bandHitoryasitio=res.staff_band.camp_attended

      let camps = res.staff_upcoming_camps;
      camps.forEach((element:any) => {
        element.type= 'subscribe';
      });
  
      let campsPassed = res.staff_past_camps
      campsPassed.forEach((element:any) => {
        element.type= 'passed';
      });
      let b:any=[];
      
      b=b.concat(camps);     
      b= b.concat(campsPassed);



      this.historialCaps = b;
      this.historialCaps.sort((x,y)=>{
        x.camp_start - y.camp_start
      })

      console.log(this.historialCaps, 'cambios en campamento');
      
      
    })
   
 
    
    
  }
  update(){
    this.router.navigate(['dashboard/staff/update/'+this.id])

  }
  link(id){
    this.rou.navigate(['dashboard/camp/'+id]);

  }
  linkPerfil(id = 1){
    this.rou.navigate(['/parents/inscription/'+id]);

  }
  comentario() {
    let a = {
      "comment": this.comment,
      "is_public": true,
      "show_to": this.typecoment,
      "user_id": this.info.infToken.user_id,
      "staff_id": this.id,    
    }
    this.staff.createComment(a).subscribe((res:any)=>{
      console.log(res.data);
      
      if(res.data){
        this.getInfo()
        this.comment = "";
        this.typecoment = 1

      }
    })

  }
}
