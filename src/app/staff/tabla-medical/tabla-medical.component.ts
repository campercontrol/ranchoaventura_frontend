import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
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
    @ViewChild("op") overlayPanel: any; 

  url=" https://api-dev.kincamp.com/"
    statuses: any[];

    loading: boolean = false;
    diagnostio:string="";
    displayMaximizable:boolean=false;

    activityValues: number[] = [0, 100];
    op: any;
    idCamp=0;
    showSpinner = false;
    campers:any =[];
    staffs:any =[];
    infoDataCamp


  constructor(private routesA:ActivatedRoute,private medical:MedicalService,private routers:Router) {
    this.routesA.params.subscribe((params) => {
      this.idCamp = params['id'];})
      console.log(this.idCamp);
      
      this.medical.getMedicalCamps(this.idCamp).subscribe((res:any)=>{
        console.log(res);
        this.campers = res.campers;
       
        this.campers.forEach((item: any) => {
          // Inicializar las categorías dentro de cada item
              item.medical_triages = this.groupData(item.medical_triages)
        });
        
        console.log(this.campers);
        
        this.staffs = res.staffs
        
      })
   }

   data(id,idSearch){
    this.showSpinner = true
    this.overlayPanel.toggle(event, this.overlayPanel.nativeElement); // Abre o cierra el panel

      this.medical.getMedicalCampCamper(this.idCamp,id).subscribe({
        next:(res:any)=>{
          console.log(res);
          
          this.infoDataCamp = res.camper_visits;

          this.infoDataCamp=this.infoDataCamp.filter((item:any)=>{
              return item.id == idSearch;

          })
          this.infoDataCamp = this.infoDataCamp[0]
          console.log(this.infoDataCamp);
          this.showSpinner = false;

        }

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

  groupData(data: any[]): any[] {
    const result: any[] = [];
    const map = new Map<number, any[]>();

    // Iterar sobre los datos para crear o actualizar los grupos en el mapa
    data.forEach(item => {
      if (item.initial_visit_id === null) {
        // Si initial_visit_id es null, crear un grupo separado para este elemento
        map.set(item.id, [item]);
      } else {
        // Si initial_visit_id no es null, agregar este elemento al grupo correspondiente
        const parentGroup = map.get(item.initial_visit_id) || [];
        parentGroup.push(item);
        map.set(item.initial_visit_id, parentGroup);
      }
    });

    // Convertir el mapa a un arreglo de arreglos
    map.forEach((group) => {
      result.push(group);
    });

    return result;
  }


  stripComment(text: string = ''): string {
    return text.replace(/\$\{\{.*?\}\}/g, '');
  }
  
  
  getImageUrl(comment: string = ''): string | null {
    const m = comment.match(/\$\{\{\s*(.*?)\s*\}\}/);
       return ` https://api-dev.kincamp.com/${comment}`;
     
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
