import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CamperService } from 'src/services/camper.service';
import { StaffService } from 'src/services/staff.service';
import jwt_decode from "jwt-decode";


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
  erroA:any=false;
  spinner: boolean = false;
  photoSelect: string | ArrayBuffer;
  spinerPhot = false;
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
  confirmEmailAlert= false;
  confirmEmailAlertInstruc= false;
  confirmPaswordAlert = false;
  alertcorreo = false;
  alertConfirCorre = false;

  correo:string = "";
  confirmarCorreo = "";
  estadoCorreo:boolean= false;
  breadCrumbItems: Array<{}>;
  @ViewChild("name") name: ElementRef;
  @ViewChild("lastname_father") lastname_father: ElementRef; 
  @ViewChild("lastname_mother") lastname_mother: ElementRef; 
  @ViewChild("photo") photo: ElementRef;
  @ViewChild("birthday") birthday: ElementRef;
  @ViewChild("curp") curp: ElementRef;
  @ViewChild("bio") bio: ElementRef;
  @ViewChild("home_phone") home_phone: ElementRef;
  @ViewChild("cellphone") cellphone: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("emailConfir") emailConfir: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;
  @ViewChild("facebook") facebook: ElementRef;
  filetemp:any ={};
  cvSatus= false;

  photoSatus = false;



  constructor(private catalogos: CamperService, private formGrup: FormBuilder, private router: Router,private staff: StaffService,private modalService: NgbModal,private render :Renderer2,private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.formUser = this.formGrup.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required,Validators.email]],
      name: ["", [Validators.required]],
      lastname_father: ["", [Validators.required]],
      lastname_mother: ["",],
      photo: ["",[Validators.required]],
      birthday: ["",[Validators.required]], //fecha de nacimiento
      curp: ["",[Validators.required]],
      bio: ["", [Validators.required]], // biografia
      facebook: ["", [Validators.required]],
      home_phone: ["", [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      cellphone: ["", [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(8)]],
      cv: ["", [Validators.required]],
      gender_id:[0],

      login_id:[0],
      coordinator:[false],
      terms: ["", [Validators.required, Validators.requiredTrue]],
    },{
      validators: this.matchingFieldsValidator('password', 'confirmPassword', 'email', 'confirmEmail')
    })
    
  }
  matchingFieldsValidator(passwordField: string, confirmPasswordField: string, emailField: string, confirmEmailField: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordField];
      const confirmPassword = formGroup.controls[confirmPasswordField];
      const email = formGroup.controls[emailField];
      const confirmEmail = formGroup.controls[confirmEmailField];
  
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
  
      if (email.value !== confirmEmail.value) {
        confirmEmail.setErrors({ emailMismatch: true });
      } else {
        confirmEmail.setErrors(null);
      }
    };
  }
  getphoto() {
    if(this.formUser.get('photo').valid){
      this.photoSatus = true;
    }else{
     // this.photo.nativeElement.focus();
      console.log('ere');
      const element:any = document.getElementById("photo");
      element.scrollIntoViewIfNeeded();

      this.photoSatus= false;
    }
     
  }
  getCv() {
    if(this.formUser.get('cv').valid){
     this.cvSatus = true;
    }else{
     // this.photo.nativeElement.focus();
      console.log('ere');
      const element:any = document.getElementById("cv");
      element.scrollIntoViewIfNeeded();

    //  this.photoSatus= false;
    }
     
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
        this.photoSatus = true;
        this.formUser.patchValue({
          photo: res.path
        })
      },
        error => {
          console.log(error);
          this.photoSatus = false;

        })
    }
  }

  prueba1(){
    this.spinner=true;
  
   // console.log(this.formUser.value);
    let a = {
      "user": {
        email:this.formUser.get('email').value,
        passw: this.formUser.get('password').value,
        role_id: 2,
        is_coordinator: false,
        is_admin: false,
        is_employee: false,
        is_superuser:false
      },
      "prospect":this.formUser.value
      
    }
    if(this.formUser.valid){
      this.staff.prospectos(a).subscribe((res:any)=>{
       
        this.auth.login(this.formUser.get('email').value,this.formUser.get('password').value).subscribe((user:any)=>{
          console.log(user);
          console.log(user);
          this.auth.loggedIn = true;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.auth.infToken = jwt_decode(user.access_token);
          console.log(this.auth.infToken.role_id);
          
          if(this.auth.infToken.role_id>1){
            this.router.navigate(['dashboard/staff']);
            console.log(this.auth.infToken);
 
          }else{
            this.router.navigate(['dashboard/parents']);
            console.log(this.auth.infToken);
          }          
        })
       

      },error=>{
        this.erroA=true;
        this.spinner=false;

        setTimeout(() => {
          this.erroA=false;
          
        }, 10000);
      })

    }else{
      this.spinner=false;
      this.validateFace();
      this.validatecellphone();
      this.validatehome_phone();
      this.getCv();
      this.validatebio();
      this.getphoto();
      this.validatebirthday();
      this.validatecurp();
      this.validatelastname_mother();
      this.validatelastname_father();
      this.validateName();
      this.getconfirmPassword();
      this.getpassword();
      this.getconfirmEmail();
      this.getemail();

    }
    
  
    
   
  }

  centerModal(centerDataModal: any = this.content) {
    console.log(this.centerModal);
    
    this.modalService.open(centerDataModal, { centered: true });
  }

  getpassword() {
    if( this.formUser.get('password').valid){
      this.render.removeClass(this.password.nativeElement,"is-invalid");
        this.render.addClass(this.password.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.password.nativeElement,"is-valid");
      this.render.addClass(this.password.nativeElement,"is-invalid");
      this.password.nativeElement.focus()

     }
    this.getpasworddnotfocus();
  }

  getpasworddnotfocus(){
    if( this.formUser.get('confirmPassword').valid){
      this.render.removeClass(this.confirmPassword.nativeElement,"is-invalid");
        this.render.addClass(this.confirmPassword.nativeElement,"is-valid");
        this.confirmPaswordAlert = false;        
     }else{
      this.render.removeClass(this.confirmPassword.nativeElement,"is-valid");
      this.render.addClass(this.confirmPassword.nativeElement,"is-invalid");
      this.confirmPaswordAlert = true;

     }
  }
  getconfirmPassword() {
    if( this.formUser.get('confirmPassword').valid){
      this.render.removeClass(this.confirmPassword.nativeElement,"is-invalid");
        this.render.addClass(this.confirmPassword.nativeElement,"is-valid");
        this.confirmPaswordAlert = false;        
     }else{
      this.render.removeClass(this.confirmPassword.nativeElement,"is-valid");
      this.render.addClass(this.confirmPassword.nativeElement,"is-invalid");
      this.confirmPaswordAlert = true;
      this.confirmPassword.nativeElement.focus()

     }
  }
  getemail() {
    //console.log(this.formParent.get('email').valid);
    this.alertcorreo = true;
   if(this.formUser.get('email').valid){
    this.render.removeClass(this.email.nativeElement,"is-invalid");
      this.render.addClass(this.email.nativeElement,"is-valid");
      console.log('respyesta');
      
   }else{
    this.render.removeClass(this.email.nativeElement,"is-valid");
    this.render.addClass(this.email.nativeElement,"is-invalid");
    this.email.nativeElement.focus()

   }
   this.getconfirmEmailChanceEmail();
  }

  getconfirmEmailChanceEmail(){
    if( this.formUser.get('confirmEmail').valid){
      this.render.removeClass(this.emailConfir.nativeElement,"is-invalid");
        this.render.addClass(this.emailConfir.nativeElement,"is-valid");
        this.confirmEmailAlert = false;        
     }else{
      this.render.removeClass(this.emailConfir.nativeElement,"is-valid");
      this.render.addClass(this.emailConfir.nativeElement,"is-invalid");
      this.confirmEmailAlert = true;

     }

  }
  getconfirmEmail() {
    if( this.formUser.get('confirmEmail').valid){
      this.render.removeClass(this.emailConfir.nativeElement,"is-invalid");
        this.render.addClass(this.emailConfir.nativeElement,"is-valid");
        this.confirmEmailAlert = false;        
     }else{
      this.render.removeClass(this.emailConfir.nativeElement,"is-valid");
      this.render.addClass(this.emailConfir.nativeElement,"is-invalid");
      this.confirmEmailAlert = true;
      this.emailConfir.nativeElement.focus()

     }
    }
  validateName(): void {
    this.validateFormField(this.name,'name');
  }
  
  validatelastname_father(): void {
    this.validateFormField(this.lastname_father,'lastname_father');
  }
  validatelastname_mother(): void {
    this.validateFormField(this.lastname_mother,'lastname_mother');
  }
  
  validatephoto(): void {
    this.validateFormField(this.photo,'photo');
  }
  
  validatebirthday(): void {
    this.validateFormField(this.birthday,'birthday');
  }
  
  validatecurp(): void {
    this.validateFormField(this.curp,'curp');
  }
  
  validatebio(): void {
    this.validateFormField(this.bio,'bio');
  }
  
  validatehome_phone(): void {
    this.validateFormField(this.home_phone,'home_phone');
  }
  
  validatecellphone(): void {
    this.validateFormField(this.cellphone,'cellphone');
  }
  validateFace(): void {
    this.validateFormField(this.facebook,'facebook');
  }
  
 
  validateFormField(elementRef: any,name): void {
    if (this.formUser.get(name).valid) {
      this.render.removeClass(elementRef.nativeElement, "is-invalid");
      this.render.addClass(elementRef.nativeElement, "is-valid");
    } else {
      this.render.removeClass(elementRef.nativeElement, "is-valid");
      this.render.addClass(elementRef.nativeElement, "is-invalid");
      elementRef.nativeElement.focus();
    }
  }

  subiendoPdf(event: any) {
    this.spinerPhot = false;

    const [file] = event.target.files;
    this.filetemp = {
      fileRow:file,
      fileName: file.name
    }
    const formulario = new FormData();
      formulario.append('file',file)
      this.catalogos.setpdf(formulario).subscribe((res: any) => {
        console.log(res);
        this.cvSatus = true;
        this.formUser.patchValue({
          cv: res
        })
      },
        error => {
          this.cvSatus = false;
          console.log(error)
        })

    
  }

}
