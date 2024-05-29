import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalService } from 'src/services/medical.service';

@Component({
  selector: 'app-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.scss']
})
export class NuevaConsultaComponent implements OnInit {

  campId:any =0;
  camperid:any =0;
  infoParent:any ={}
  infoCamper:any ={}
  cargando:boolean = true;
  bloodytype:any = [];
  formConsult!:FormGroup;
  showSpinner:boolean= false;


  constructor(private routesA:ActivatedRoute,private medical:MedicalService,private formBuild:FormBuilder,private router:Router) {
    this.routesA.params.subscribe((params) => {
      this.camperid = params['camperid'];
      this.campId = params['campId'];
    })
    this.formConsult= formBuild.group({
      "medical_tracing": true,
      "doctor": ["",[Validators.required]], // listo
      "attention_date": ["",[Validators.required]], //listo
      "attention_time": ["",[Validators.required]], // listo
      "diagnostic": ["",[Validators.required]], // listo  
      "description": ["",[Validators.required]], // listo
      "triage": 1,
      "medication_authorization": [1,[Validators.required]],
      "event_description": ["",[Validators.required]],
      "camp_restriction": ["",[Validators.required]], // listo
      "administered_medications": ["",[Validators.required]],
      "medical_monitoring": ["",[Validators.required]],
      "comment": ["",[Validators.required]],// listo
      "medical_comment": ["",[Validators.required]], // listo
      "send_in_email": true,
      "already_sent": true,
      "camp_id": this.campId,
      "camper_id": this.camperid,
      "initial_visit_id": null,
    })

  }

  ngOnInit(): void {
  }
 

  crearConsulta() {
    this.showSpinner= true;

    if (this.formConsult.valid) {
      this.medical.nuevaConsulta(this.formConsult.value).subscribe((res:any)=>{
        console.log(res,'respuestas');
        this.showSpinner= false;
        this.router.navigate(['/dashboard/medical/care/'+this.campId+'/'+this.camperid]);

      })      
    } else {
      this.showSpinner= false;

      this.markFormGroupTouched(this.formConsult);

    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}


