import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  displayEditModal = false;
  editForm!: FormGroup;
  private selectedConsultId!: number;

  constructor(private routesA:ActivatedRoute,private medical:MedicalService,private router:Router, private fb: FormBuilder) {
    this.routesA.params.subscribe((params) => {
      this.camperid = params['camperid'];
      this.campId = params['campId'];
    })
    this.editForm = this.fb.group({
      medical_tracing: [false],
      doctor: [''],
      attention_date: [''],
      attention_time: [''],
      diagnostic: [''],
      description: [''],
      triage: [0],
      medication_authorization: [''],
      event_description: [''],
      camp_restriction: [''],
      administered_medications: [''],
      medical_monitoring: [''],
      comment: [''],
      medical_comment: [''],
      send_in_email: [false],
      already_sent: [false],
      camp_id: this.campId,
      camper_id: this.camperid,
    });
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

  redireccionTabla(){
    this.router.navigate(['/dashboard/medical/camp-medical/'+this.campId]);
  }

  redireccionId(id){
    this.router.navigate(['/dashboard/medical/add_consultation/'+this.campId+'/'+this.camperid+'/'+id]);
  }

  // nueva-consulta.component.ts
stripComment(text: string = ''): string {
  return text.replace(/\$\{\{.*?\}\}/g, '');
}


 

openEditModal(item: any) {
  this.selectedConsultId = item.id;   
  let consulta = [  { id:90, label:'No urgencia' },
    { id:91, label:'Urgencia menor' },
    { id:92, label:'Urgencia' },
    { id:93, label:'Emergencia' },
    { id:94, label:'Reanimación' }]  
    let nombreBuscado = 'Urgencia menor'; // el label que quieras encontrar
let resultado = consulta.find(data => data.label === item.triage);

let idEncontrado  = resultado ? resultado.id : null;
item.triage = idEncontrado; // Asigna el ID encontrado al campo triage
    
    // ← Usa el ID de la consulta
  this.editForm.patchValue(item);                 // ← Rellena el formulario
  this.displayEditModal = true;
}

/** Envía la edición al servicio */
saveEdit() {
  const updatedData = this.editForm.value;
  this.medical
    .editConsulta(this.selectedConsultId, updatedData)
    .subscribe((res: any) => {
      // Actualiza en el array local
      const idx = this.medicalConsult.findIndex(c => c.id === this.selectedConsultId);
      if (idx > -1) {
        this.medicalConsult[idx] = res;
      }
      this.displayEditModal = false;
      window.location.reload();
    });
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
