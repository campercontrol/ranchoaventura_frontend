import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  showCamera = false;
  mediaStream?: MediaStream;
  snapshotReady = false;
  cameraError = '';

   
  statusImageFals = false;

  // Límite de carga
  private readonly MAX_BYTES = 5 * 1024 * 1024; // 5MB
  // Dimensión máxima para reescalar (mantiene aspecto)
  private readonly MAX_W = 1920;
  private readonly MAX_H = 1920;

 
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
        "additional_photo": [""],
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
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) return;

    // Validación básica tipo imagen
    if (!archivo.type.startsWith('image/')) {
      alert('Selecciona una imagen válida.');
      this.resetFileInput();
      return;
    }

    this.processAndUploadFile(archivo);
  }

  // Lógica central de reescalado/compresión + subida
  private async processAndUploadFile(archivo: File) {
    try {
      this.isImageUploading = true;
      this.cdr.detectChanges();

      // Convertir a Image
      const dataUrl = await this.readFileAsDataURL(archivo);
      const img = await this.loadImage(dataUrl);

      // Reescalar si excede
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const { w, h } = this.fitInBox(img.width, img.height, this.MAX_W, this.MAX_H);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      // Previsualización inmediata (JPG 0.9)
      this.photoSelect = canvas.toDataURL('image/jpeg', 0.9);
      this.cdr.detectChanges();

      // Comprimir iterando calidad hasta ≤5MB
      const blob = await this.compressToLimit(canvas, 'image/jpeg', this.MAX_BYTES);

      const finalFile = new File([blob], this.ensureJpgName(archivo.name), {
        type: 'image/jpeg',
      });

      await this.uploadFile(finalFile);
      this.statusImageFals = true;
    } catch (err) {
      console.error(err);
      this.statusImageFals = false;
      alert('No se pudo procesar/subir la imagen.');
    } finally {
      this.isImageUploading = false;
      this.cdr.detectChanges();
      this.resetFileInput();
    }
  }

  private async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file_path', 'uploads/medical_visit/photos/');
    formData.append('file', file);

    const res: any = await this.catalogos.setPhoto(formData).toPromise();
    // Actualiza el Form
    this.formConsult.patchValue({ additional_photo: res.path });
  }

  // ==========================
  // Cámara (getUserMedia)
  // ==========================
  async openCamera() {
    this.cameraError = '';
    this.snapshotReady = false;
    this.showCamera = true;
    this.cdr.detectChanges();

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      const video = this.videoRef?.nativeElement;
      if (video) {
        video.srcObject = this.mediaStream;
        await video.play();
      }
    } catch (e: any) {
      console.error(e);
      this.cameraError =
        'No fue posible acceder a la cámara. Revisa permisos del navegador.';
    }
  }

  closeCamera() {
    this.stopStream();
    this.showCamera = false;
    this.snapshotReady = false;
    this.cameraError = '';
  }

  private stopStream() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = undefined;
    }
  }

  takeSnapshot() {
    const video = this.videoRef?.nativeElement;
    const canvas = this.canvasRef?.nativeElement;
    if (!video || !canvas) return;

    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;

    // Reescalar instantáneo a límites
    const { w: fw, h: fh } = this.fitInBox(w, h, this.MAX_W, this.MAX_H);
    canvas.width = fw;
    canvas.height = fh;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0, fw, fh);

    // Vista previa
    this.photoSelect = canvas.toDataURL('image/jpeg', 0.9);
    this.snapshotReady = true;
    this.cdr.detectChanges();
  }

  async useSnapshot() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.isImageUploading = true;
    this.cdr.detectChanges();

    try {
      const blob = await this.compressToLimit(canvas, 'image/jpeg', this.MAX_BYTES);
      const file = new File([blob], `cam_${Date.now()}.jpg`, { type: 'image/jpeg' });
      await this.uploadFile(file);
      this.statusImageFals = true;
      this.closeCamera();
    } catch (e) {
      console.error(e);
      this.statusImageFals = false;
      alert('No se pudo procesar/subir la foto.');
    } finally {
      this.isImageUploading = false;
      this.cdr.detectChanges();
    }
  }

  // ==========================
  // Utilidades
  // ==========================
  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result as string);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }

  private loadImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = dataUrl;
    });
  }

  private fitInBox(w: number, h: number, maxW: number, maxH: number) {
    const ratio = Math.min(maxW / w, maxH / h, 1); // nunca ampliar
    return { w: Math.round(w * ratio), h: Math.round(h * ratio) };
  }

  private ensureJpgName(name: string): string {
    const base = name.replace(/\.[^.]+$/, '');
    return `${base}.jpg`;
  }

  private async compressToLimit(
    canvas: HTMLCanvasElement,
    mime: string,
    maxBytes: number
  ): Promise<Blob> {
    // Estrategia: intentar calidades decrecientes hasta ≤ maxBytes
    let quality = 0.9;
    let blob = await this.canvasToBlob(canvas, mime, quality);

    // Si aún supera, bajar calidad en pasos, y si es necesario reescalar ligeramente
    while (blob.size > maxBytes && quality > 0.5) {
      quality -= 0.1;
      blob = await this.canvasToBlob(canvas, mime, quality);
    }

    // Si sigue grande, hacer un downscale suave (90%) y volver a intentar
    let attempt = 0;
    while (blob.size > maxBytes && attempt < 3) {
      attempt++;
      const tmp = document.createElement('canvas');
      const ctx = tmp.getContext('2d')!;
      tmp.width = Math.round(canvas.width * 0.9);
      tmp.height = Math.round(canvas.height * 0.9);
      ctx.drawImage(canvas, 0, 0, tmp.width, tmp.height);
      canvas = tmp;
      quality = Math.max(quality, 0.7); // no sube, solo evita bajar demasiado
      blob = await this.canvasToBlob(canvas, mime, quality);
    }

    return blob;
  }

  private canvasToBlob(
    canvas: HTMLCanvasElement,
    mime: string,
    quality?: number
  ): Promise<Blob> {
    return new Promise((res) => {
      canvas.toBlob((b) => res(b as Blob), mime, quality);
    });
  }

  private resetFileInput() {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  ngOnDestroy(): void {
    this.stopStream();
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


