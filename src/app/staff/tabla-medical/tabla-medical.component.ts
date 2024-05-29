import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalService } from 'src/services/medical.service';

@Component({
  selector: 'app-tabla-medical',
  templateUrl: './tabla-medical.component.html',
  styleUrls: ['./tabla-medical.component.scss']
})
export class TablaMedicalComponent implements OnInit {
  selectedCustomers: any[];
    staff :any = [];

    representatives: any[];
    @ViewChild("op") element: ElementRef;


    statuses: any[];

    loading: boolean = false;
    diagnostio:string="";
    displayMaximizable:boolean=false;

    activityValues: number[] = [0, 100];
    op: any;
    idCamp=0;
    campers:any =[];
    staffs:any =[];


  constructor(private routesA:ActivatedRoute,private medical:MedicalService,private routers:Router) {
    this.routesA.params.subscribe((params) => {
      this.idCamp = params['id'];})
      console.log(this.idCamp);
      
      this.medical.getMedicalCamps(this.idCamp).subscribe((res:any)=>{
        console.log(res);
        this.campers = res.campers;
       
        this.campers.forEach((item: any) => {
          // Inicializar las categorías dentro de cada item
          item.urgencia_menor = [];
          item.no_urgencia = [];
          item.urgencia = [];
          item.emergencia = [];
          item.reanimacion = [];
        
          // Iterar sobre las consultas dentro de cada item
          item.medical_triages.forEach((consulta: any) => {
            // Clasificar cada consulta en la categoría correspondiente
            if (consulta.value === "Urgencia menor") {
              item.urgencia_menor.push(consulta);
            } else if (consulta.value === "No urgencia") {
              item.no_urgencia.push(consulta);
            } else if (consulta.value === "Urgencia") {
              item.urgencia.push(consulta);
            } else if (consulta.value === "Emergencia") {
              item.emergencia.push(consulta);
            } else if (consulta.value === "Reanimación") {
              item.reanimacion.push(consulta);
            }
          });
        });
        
        console.log(this.campers);
        
        this.staffs = res.staffs
        
      })
   }




  ngOnInit(): void {
  }
  valores(datos:any){
    console.log(datos)
    this.diagnostio=datos.name

  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  navegate(id){
    this.routers.navigate(['/dashboard/medical/care/'+this.idCamp+'/'+id]);

  }

 

 

}
