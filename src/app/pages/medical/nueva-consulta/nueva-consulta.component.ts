import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CamperService } from 'src/services/camper.service';
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
  photoSelect: string | ArrayBuffer;
  public isImageUploading = false;

  statusImageFals = false

  showSpinner:boolean= false;
  idConsult:any ;
  medicalTracing= false;
  idSeguimiento :any = null
  constructor(private routesA:ActivatedRoute,private medical:MedicalService,private formBuild:FormBuilder,private router:Router,private catalogos:CamperService,
    private cdr: ChangeDetectorRef
  ) {
    this.routesA.params.subscribe((params) => {
      this.camperid = params['camperid'];
      this.campId = params['campId'];
      this.idConsult = params['idConsult'];
      console.log(this.idConsult);
      
      if(this.idConsult== undefined){
        this.medicalTracing= false;
        this.idSeguimiento= null;

      }else{
        this.medicalTracing= true;
        this.idSeguimiento = this.idConsult
      }
      this.formConsult= formBuild.group({
        "medical_tracing": this.medicalTracing,
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
        "photo": [null],
        "send_in_email": true,
        "already_sent": false,
        "camp_id": this.campId,
        "camper_id": this.camperid,
        "initial_visit_id": this.idSeguimiento,
      })
    })
  

  }

  ngOnInit(): void {
  }

  subiendo(event: Event) {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (!archivo) return;
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width  = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        const mime = archivo.type === 'image/png' ? 'image/png' : 'image/jpeg';
        // previsualización inmediata
        this.photoSelect = canvas.toDataURL(mime);
  
        // empezamos la carga al servidor
        this.isImageUploading = true;
  
        canvas.toBlob(
          blob => {
            if (!blob) return;
            const formData = new FormData();
            formData.append('file', new File([blob], archivo.name, { type: mime }));
  
            this.catalogos.setPhoto(formData).subscribe(
              (res: any) => {
                this.formConsult.patchValue({ photo: res.path });
                this.statusImageFals = true;
                this.isImageUploading = false;
                this.cdr.detectChanges()
              },
              err => {
                console.error(err);
                this.statusImageFals = false;
                this.isImageUploading = false;
                this.cdr.detectChanges()

              }
            );
          },
          mime
        );
      };
    };
    reader.readAsDataURL(archivo);
  }
  

  crearConsulta() {
    this.showSpinner= true;
    let data = this.formConsult.get('comment').value;
    let phtot = this.formConsult.get('photo').value;
    let total = data + ' ' +'${{'+phtot + '}}'
    this.formConsult.patchValue({ comment: total});



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


