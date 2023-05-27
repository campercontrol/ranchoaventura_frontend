import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private catalogos: CamperService, private formGrup: FormBuilder, private router: Router,private staff: StaffService) { }

  ngOnInit(): void {
    this.formUser = this.formGrup.group({
      name: ["", [Validators.required]],
      lastname_father: ["", [Validators.required]],
      lastname_mother: ["", [Validators.required]],
      photo: [""],
      birthday: ["",[Validators.required]], //fecha de nacimiento
      curp: ["",[Validators.required]],
      bio: ["", [Validators.required]], // biografia
      facebook: ["", [Validators.required]],
      home_phone: ["", [Validators.required, Validators.minLength(8)]],
      cellphone: ["", [Validators.required, Validators.minLength(8)]],
      terms: ["", [Validators.required, Validators.requiredTrue]],
    })
  }
  subiendo(event: any) {
    const archivo = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.photoSelect = reader.result;
      reader.readAsDataURL(archivo);
      this.catalogos.setPhoto(archivo).subscribe((res: any) => {
        // console.log(res);

      },
        error => {
          console.log(error)
        })
    }
  }

  prueba1(){
    this.spinner=true;
  
    console.log(this.formUser.value);
    
    this.staff.prospectos(this.formUser.value).subscribe((res:any)=>{
      if(res.succes = 200){
        this.spinner=false;
      }
    })
    
    
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
