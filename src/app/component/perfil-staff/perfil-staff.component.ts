import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CamperService } from 'src/services/camper.service';
import { CatalogosService } from 'src/services/catalogos.service';
import { ParentService } from 'src/services/parent.service';
import { StaffService } from 'src/services/staff.service';

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

  constructor(private primengConfig: PrimeNGConfig, private routesA: ActivatedRoute, private staff: StaffService,private parents : ParentService, private rou:Router,private catalogos: CatalogosService, private info:AuthenticationService) { }

  ngOnInit(): void {
    this.routesA.params.subscribe((params) => {
      this.id = params['id'];
    })
    this.getInfo()
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
  // doctor_precall varibles
  getInfo(){
    this.catalogos.getGener().subscribe((res:any)=>{
      this.catalogosGenero = res.data
    })
    this.catalogos.getVaccine().subscribe((res:any)=>{
      this.vacunas = res.data
    })
    this.staff.getPerfil(this.id).subscribe((res:any)=>{
      this.infoCamp = res.data;
      this.infoCamp.birthdayA = this.calculateAge(this.infoCamp.birthday);
      console.log(this.infoCamp);
      
    });
    this.catalogosGenero.map((item: any) => {
      if (item.id == this.infoCamp.gender_id) {
        this.infoCamp.gender_id = item.value
      }
    })
    this.catalogoSangre.map((item: any) => {
      if (item.id == this.infoCamp.blood_type) {
        this.infoCamp.blood_type = item.value
      }
    })
    this.vacunasACtivos = this.vacunas.filter(item => item.is_active == true);

    
    
  }

  link(id){
    this.rou.navigate(['parents/camp-info/1/'+id]);

  }
  linkPerfil(id = 1){
    this.rou.navigate(['/parents/inscription/'+id]);

  }
  comentario() {
    let a = {
      "comment": this.comment,
      "is_public": true,
      "show_to": 1,
      "user_id": this.info.infToken.profile_id,
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
}
