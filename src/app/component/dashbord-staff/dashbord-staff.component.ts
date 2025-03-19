import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CampsService } from 'src/services/camps.service';
import { StaffService } from 'src/services/staff.service';

@Component({
  selector: 'app-dashbord-staff',
  templateUrl: './dashbord-staff.component.html',
  styleUrls: ['./dashbord-staff.component.scss']
})
export class DashbordStaffComponent implements OnInit {
  selectedProducts: any[];

  product: any;

  spiner= false;
  submitted: boolean;
  selectedCustomers: any[];
  loading: boolean = false;
  customer:any =[];
  idCamps:any[]=[];
  id= 0;
  prospectosArray:any=[];
  pCamp:any = [];// inscripcion cap
  aCamp:any = [];// apuntado a camps
  ICamp:any = []; // confirmacion de camps
  complete_profile = false;
  is_active = false;
  is_employee = false;
  alerts:boolean;
  rol:any =0;
  user_coordinator=false
  user_admin=false 

  constructor(private camps: CampsService, private staff:StaffService, private info : AuthenticationService,private router: Router) {
    this.getCamps();
    this.rol=this.info.infToken.role_id;
    this.user_admin = info.infToken.user_admin ;
    this.user_coordinator= info.infToken.user_coordinator ;
   }

  ngOnInit(): void {
  }

  getCamps(){
    this.spiner=true
    this.camps.getDashbord(this.info.infToken.profile_id).subscribe((res:any)=>{
      console.log(res);
      
      console.log(res.data);
      if(res.data.complete_profile == undefined){

        this.alerts = false;
        this.aCamp =res.data.next_camps;
        this.pCamp = res.data.available_camps;
        this.ICamp =  res.data.staff_camps;   
        this.aCamp = res.data.next_camps.sort((a, b) => new Date(a.camp_start).getTime() - new Date(b.camp_start).getTime());
this.pCamp = res.data.available_camps.sort((a, b) => new Date(a.camp_start).getTime() - new Date(b.camp_start).getTime());
this.ICamp = res.data.staff_camps.sort((a, b) => new Date(a.camp_start).getTime() - new Date(b.camp_start).getTime());
    
        this.spiner= false;
      }else{
        
        this.spiner= false;
        this.alerts = true;
        this.is_active = res.data.is_active;
        this.is_employee =  res.data.is_employee ;
        this.complete_profile =  res.data.complete_profile ;

      }
    
    })
  }

  cancelar(id){
      this.staff.cancelarParticipacio(id).subscribe((res)=>{
        this.getCamps();

      },erro=>{
        console.log(erro);
        
      })
  }
  inscribirCamp(a){
    let idCamp = a;
    let b ={
      camp_id: idCamp,
      staff_id:this.info.infToken.profile_id

    }
    this.camps.inscribirCappStaff(b).subscribe((res:any)=>{
          console.log(res);
          this.getCamps();
          
    })
  }
  
  myPerfil(){
    this.router.navigate(['dashboard/staff/update'])
  }
  campsinfo(id){
    this.router.navigate(['dashboard/camp/'+id])
  }

    getDateRangeString(startDate: string, endDate: string): string {
    const daysOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
  
    // Convertir las fechas de entrada a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Obtener día de la semana, día y mes de cada fecha
    const startDayOfWeek = daysOfWeek[start.getDay()];
    const startDay = start.getDate();
    const startMonth = months[start.getMonth()];
  
    const endDayOfWeek = daysOfWeek[end.getDay()];
    const endDay = end.getDate();
    const endMonth = months[end.getMonth()];
  
    // Construir el string final
    return `El campamento es del ${startDayOfWeek} ${startDay} de ${startMonth} al ${endDayOfWeek} ${endDay} de ${endMonth}.`;
  }
  

}
