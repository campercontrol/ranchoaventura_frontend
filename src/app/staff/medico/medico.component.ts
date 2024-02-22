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
  bloodytype:any = []


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
        this.infoCamper.vaccinesT=""
        this.infoCamper.vaccines.forEach(element => {
          this.infoCamper.vaccinesT= this.infoCamper.vaccinesT + element.name+ ','+" " ;
        });
        this.infoCamper.licensed_medicinesT=""
        this.infoCamper.licensed_medicines.forEach(element => {
          this.infoCamper.licensed_medicinesT= this.infoCamper.licensed_medicinesT + element.name+ ','+" " ;
        });
        this.infoCamper.food_restrictionsT=""
        this.infoCamper.food_restrictions.forEach(element => {
          this.infoCamper.food_restrictions= this.infoCamper.food_restrictionsT + element.name+ ','+" " ;
        });

        this.infoCamper.pathological_backgroundT=""
        this.infoCamper.pathological_background.forEach(element => {
          this.infoCamper.food_restrictions= this.infoCamper.pathological_backgroundT + element.name+ ','+" " ;
        });

        this.infoCamper.pathological_background_fmT=""
        this.infoCamper.pathological_background_fm.forEach(element => {
          this.infoCamper.food_restrictions= this.infoCamper.pathological_background_fmT + element.name+ ','+" " ;
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
  InfoBlood(id){
    console.log(id);
    
    let b = this.bloodytype.filter((element:any) => {
      return element.id == id
    });
    
    return b[0].value
  }
}
