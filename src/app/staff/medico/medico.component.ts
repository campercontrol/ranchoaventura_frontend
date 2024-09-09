import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalService } from 'src/services/medical.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {
  public isCollapsed = true;
  campId:any =0;
  camperid:any =0;
  infoParent:any ={}
  infoCamper:any ={}
  cargando:boolean = true;
  bloodytype:any = [];
  medicalConsult=[];
  showConsult= true;

  constructor(private routesA:ActivatedRoute,private medical:MedicalService,private router:Router) {
    this.routesA.params.subscribe((params) => {
      this.camperid = params['camperid'];
      this.campId = params['campId'];
    })
      
      this.medical.getMedicalCampCamper(this.campId,this.camperid).subscribe((res:any)=>{
        console.log(res);
        this.bloodytype =res.camper_info.blood_types
        
        this.infoParent = res.parent_info
        this.infoCamper = res.camper_info
        this.medicalConsult = res.camper_visits

      this.medicalConsult.forEach((item:any)=>{

        item.show = false
      })
        this.infoCamper.vaccinesT=""
        this.infoCamper.vaccines.filter(element => {
          return element.is_active == true;
        });
     
        this.infoCamper.licensed_medicines.forEach(element => {
          return element.is_active == true;

        });
       
        this.infoCamper.food_restrictions.forEach(element => {
          return element.is_active == true;

        });
        this.infoCamper.licensed_medicines.forEach(element => {
          return element.is_active == true;

        });


      
        this.infoCamper.pathological_background.forEach(element => {
          return element.is_active == true;

        });

        
        this.infoCamper.pathological_background_fm.forEach(element => {
          return element.is_active == true;

        });
        this.cargando = false;

        


       
        
      })
   }
  ngOnInit(): void {
  }
  toggleMenu () : void {

    


  }

  redireccion(){
    this.router.navigate(['/dashboard/medical/add_consultation/'+this.campId+'/'+this.camperid]);
  }

  redireccionId(id){
    this.router.navigate(['/dashboard/medical/add_consultation/'+this.campId+'/'+this.camperid+'/'+id]);
  }
  InfoBlood(id){
    console.log(id);
    
    let b = this.bloodytype.filter((element:any) => {
      return element.id == id
    });
    
    return b[0].value
  }

  getAuthorizationName(value: number): string {
    const caseV =  Number(value)
    switch (caseV) {
      case 1:
        return 'Preautorización en sistema de registro';
      case 2:
        return 'Se contacta a tutores';
      case 3:
        return 'Por parte de la Escuela / Maestras';
      case 4:
        return 'Por parte del campamento';
      case 5:
        return 'No se administraron medicamentos';
      default:
        return 'Desconocido';
    }
  }
  
}
