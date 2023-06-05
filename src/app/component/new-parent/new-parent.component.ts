import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/core/services/config.service';
import { EventService } from 'src/app/core/services/event.service';
import { ParentService } from 'src/services/parent.service';

@Component({
  selector: 'app-new-parent',
  templateUrl: './new-parent.component.html',
  styleUrls: ['./new-parent.component.scss']
})
export class NewParentComponent implements OnInit {
  public formParent : FormGroup;
  estadoContrasena : boolean = false;
  estadoEmail : boolean = false;
  spinner:boolean = false;
  @ViewChild('centerDataModal') content:ElementRef;
  confiCon:boolean = false;
  confiEmai:boolean = false;
   regex:  RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?<,>.\/-]).{8,}$/;
   correoVal: RegExp =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  contrasena:string=""
  confirmarContrasena:string = "";

  correo:string = "";
  confirmarCorreo = "";
  estadoCorreo:boolean= false;
  breadCrumbItems: Array<{}>;

  constructor(private formBuild:FormBuilder,private parent: ParentService,private router :Router,private modalService: NgbModal,private configService: ConfigService, private eventService: EventService) { }
  
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];

    this.formParent = this.formBuild.group({
      tutor_lastname_father:["",[Validators.required]],
      tutor_cellphone:      ["",[Validators.required,
                             Validators.pattern("^[0-9]*$"),
                             Validators.minLength(8), Validators.maxLength(10)]],
      tutor_home_phone:     ["",[Validators.required,
                              Validators.pattern("^[0-9]*$"),
                              Validators.minLength(8), Validators.maxLength(10)]],
      contact_name:         ["",[Validators.required]],
    
    contact_lastname_mother:["",[Validators.required]],
    contact_home_phone:     ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]], 
    contact_email:          ["",[Validators.required,
                                   Validators.email]],
    tutor_name :            ["",[Validators.required]],
    tutor_lastname_mother:  ["",[Validators.required]], 
    tutor_work_phone:       ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]],
    contact_lastname_father:  ["",[Validators.required]], 
    contact_cellphone:      ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]],
    contact_work_phone:     ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]],
    terms:                   ['',[Validators.required,Validators.requiredTrue]],
    user_id:                 [0],
     password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
    confirmPassword: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    confirmEmail: ['', [Validators.required,Validators.email]],
    
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

  validarContrasena(){
    this.estadoContrasena = this.regex.test(this.contrasena)  
    console.log(this.estadoContrasena)
  }

  equalsCon(){
    if( this.contrasena == this.confirmarContrasena){
      this.confiCon = true;
      console.log(this.confiCon)
    }else{
      this.confiCon = false;
    }
  }
  openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  validatorsEmail(){
    this.estadoEmail = this.correoVal.test(this.correo);
    console.log(this.estadoEmail)

  }

  gettutor_lastname_father(): boolean {
    return this.formParent.get('tutor_lastname_father').invalid ;
  }
  getpassword(): boolean {
    return this.formParent.get('password').invalid ;
  }
  getconfirmPassword(): boolean {
    return this.formParent.get('confirmPassword').invalid ;
  }
  getemail(): boolean {
    return this.formParent.get('email').invalid ;
  }
  getconfirmEmail(): boolean {
    return this.formParent.get('confirmEmail').invalid;
  }
  
  get tutor_cellphone(): FormControl {
    return this.formParent.get('tutor_cellphone') as FormControl;
  }
  
  get tutor_home_phone(): FormControl {
    return this.formParent.get('tutor_home_phone') as FormControl;
  }
  
  get contact_name(): FormControl {
    return this.formParent.get('contact_name') as FormControl;
  }
  
  get contact_lastname_mother(): FormControl {
    return this.formParent.get('contact_lastname_mother') as FormControl;
  }
  
  get contact_home_phone(): FormControl {
    return this.formParent.get('contact_home_phone') as FormControl;
  }
  
  get contact_email(): FormControl {
    return this.formParent.get('contact_email') as FormControl;
  }
  
  get tutor_name(): FormControl {
    return this.formParent.get('tutor_name') as FormControl;
  }
  
  get tutor_lastname_mother(): FormControl {
    return this.formParent.get('tutor_lastname_mother') as FormControl;
  }
  
  get tutor_work_phone(): FormControl {
    return this.formParent.get('tutor_work_phone') as FormControl;
  }
  
  get contact_lastname_father(): FormControl {
    return this.formParent.get('contact_lastname_father') as FormControl;
  }
  
  get contact_cellphone(): FormControl {
    return this.formParent.get('contact_cellphone') as FormControl;
  }
  
  get contact_work_phone(): FormControl {
    return this.formParent.get('contact_work_phone') as FormControl;
  }
  
  get terms(): FormControl {
    return this.formParent.get('terms') as FormControl;
  }
  
  get user_id(): FormControl {
    return this.formParent.get('user_id') as FormControl;
  }

  equalsEmail(){
    if( this.correo == this.confirmarCorreo){
      this.estadoCorreo = true;
      console.log(this.estadoCorreo)

    }else{
      this.estadoCorreo = false;
    }  }

  prueba(){
    this.spinner= true;
    let a = { 
      user:{
        email:this.formParent.get('email').value,
        passw: this.formParent.get('password').value,
        role_id: 1,
        "is_coordinator": true,
        "is_admin": true,
        "is_employee": true,
        "is_superuser": true
    
      },

      parent:this.formParent.value,

  }
  
   this.parent.setParent(a).subscribe(
    (res:any)=>{
      console.log(res);
      this.spinner = false;
      this.centerModal()
      setTimeout(() => {
        this.router.navigate(['parents/new-camper']);
      }, 1000);
    },error=>{
      console.log(error);
      this.spinner = false;
      alert('No se pudo realizar su registro intentelo mas tarde ')
      
    }
   )
   
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }
  centerModal(centerDataModal: any = this.content) {
    console.log(this.centerModal);
    
    this.modalService.open(centerDataModal, { centered: true });
  }

}
