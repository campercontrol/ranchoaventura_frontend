import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamperService } from 'src/services/camper.service';
import { StaffService } from 'src/services/staff.service';

@Component({
  selector: 'app-prospecto',
  templateUrl: './prospecto.component.html',
  styleUrls: ['./prospecto.component.scss']
})
export class ProspectoComponent implements OnInit {
  visibleSelection = 0;

  blood_types: any = [];
  food_restrictions: any = [];
  genders: any = [];
  grades: any = [];
  licensed_medicines: any = [];
  pathological_background: any = [];
  @ViewChild('centerDataModal') content:ElementRef;
  pathological_background_fm: any = [];
  school: any = [];
  vaccines: any = [];
  foto: any;
  spinner: boolean = false;
  photoSelect: string | ArrayBuffer;

  public formUser: FormGroup;
  public formGen: FormGroup;
  vacunas: any = [];
  confiCon:boolean = false;
  confiEmai:boolean = false;
   regex:  RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?<,>.\/-]).{8,}$/;
   correoVal: RegExp =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  contrasena:string=""
  confirmarContrasena:string = "";
  estadoContrasena : boolean = false;
  estadoEmail : boolean = false;

  correo:string = "";
  confirmarCorreo = "";
  estadoCorreo:boolean= false;
  breadCrumbItems: Array<{}>;

  constructor(private catalogos: CamperService, private formGrup: FormBuilder, private router: Router,private staff: StaffService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.formUser = this.formGrup.group({
      name: ["", [Validators.required]],
      lastname_father: ["", [Validators.required]],
      lastname_mother: ["", [Validators.required]],
      photo: ["",[Validators.required]],
      birthday: ["",[Validators.required]], //fecha de nacimiento
      curp: ["",[Validators.required]],
      bio: ["", [Validators.required]], // biografia
      facebook: ["", [Validators.required]],
      home_phone: ["", [Validators.required, Validators.minLength(8)]],
      cellphone: ["", [Validators.required, Validators.minLength(8)]],
      login_id:[0],
      coordinator:[false],
      terms: ["", [Validators.required, Validators.requiredTrue]],
    })
  }
  subiendo(event: any) {
    const archivo = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.photoSelect = reader.result;
      reader.readAsDataURL(archivo);

      const formulario = new FormData();
      formulario.append('file',archivo)
      this.catalogos.setPhoto(formulario).subscribe((res: any) => {
        console.log(res.path);
        this.formUser.patchValue({
          photo: res.path
        })
      },
        error => {
          console.log(error)
        })
    }
  }

  prueba1(){
    this.spinner=true;
  
    console.log(this.formUser.value);
    let a = {
      "user": {
        "email": this.correo,
        "passw":this.contrasena,
        role_id: 2,
        is_coordinator: false,
        is_admin: false,
        is_employee: false,
        is_superuser:false
      },
      "prospect":this.formUser.value
      
    }
    
    this.staff.prospectos(a).subscribe((res:any)=>{
      if(res.succes = 200){
        this.spinner=false;
        this.centerModal();
        this.formUser.reset();
        this.contrasena="";
        this.correo="";

      }
    })
    
   
  }

  centerModal(centerDataModal: any = this.content) {
    console.log(this.centerModal);
    
    this.modalService.open(centerDataModal, { centered: true });
  }

  validatorsEmail(){
    this.estadoEmail = this.correoVal.test(this.correo);
    console.log(this.estadoEmail)

  }
  equalsEmail(){
    if( this.correo == this.confirmarCorreo){
      this.estadoCorreo = true;
      console.log(this.estadoCorreo)

    }else{
      this.estadoCorreo = false;
    }  
  }
  equalsCon(){
    if( this.contrasena == this.confirmarContrasena){
      this.confiCon = true;
      console.log(this.confiCon)
    }else{
      this.confiCon = false;
    }
  }
  validarContrasena(){
    this.estadoContrasena = this.regex.test(this.contrasena)  
    console.log(this.estadoContrasena)
  }

}
