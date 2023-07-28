import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
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
  confirmEmailAlert= false;
  confirmEmailAlertInstruc= false;
  confirmPaswordAlert = false;
  alertcorreo = false;

  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;

  @ViewChild("emailConfir") emailConfir: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;
  @ViewChild("tutor_name") tutor_name: ElementRef; 
  @ViewChild("tutor_lastname_father") tutor_lastname_father: ElementRef; 
  @ViewChild("tutor_lastname_mother") tutor_lastname_mother: ElementRef; 
  @ViewChild("tutor_cellphone") tutor_cellphone: ElementRef; 
  @ViewChild("tutor_home_phone") tutor_home_phone: ElementRef; 
  @ViewChild("tutor_work_phone") tutor_work_phone: ElementRef; 
  @ViewChild("contact_name") contact_name: ElementRef; 
  @ViewChild("contact_lastname_father") contact_lastname_father: ElementRef; 
  @ViewChild("contact_lastname_mother") contact_lastname_mother: ElementRef; 
  @ViewChild("contact_cellphone") contact_cellphone: ElementRef; 
  @ViewChild("contact_work_phone") contact_work_phone: ElementRef; 
  @ViewChild("contact_home_phone") contact_home_phone: ElementRef; 
  @ViewChild("contact_email") contact_email: ElementRef; 






  correo:string = "";
  confirmarCorreo = "";
  estadoCorreo:boolean= false;
  breadCrumbItems: Array<{}>;
  alertConfirCorre

  constructor(private formBuild:FormBuilder,private parent: ParentService,private router :Router,private modalService: NgbModal,private configService: ConfigService, private eventService: EventService,private render :Renderer2,
    private info :AuthenticationService) { }
  
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];

    this.formParent = this.formBuild.group({
      tutor_lastname_father:["",[Validators.required,,Validators.minLength(1)]],
      tutor_cellphone:      ["",[Validators.required,
                             Validators.pattern("^[0-9]*$"),
                             Validators.minLength(8), Validators.maxLength(10)]],
      tutor_home_phone:     ["",[Validators.required,
                              Validators.pattern("^[0-9]*$"),
                              Validators.minLength(8), Validators.maxLength(10)]],
      contact_name:         ["",[Validators.required,Validators.minLength(1)]],
    
    contact_lastname_mother:[""],
    contact_home_phone:     ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]], 
    contact_email:          ["",[Validators.required,
                                   Validators.email]],
    tutor_name :            ["",[Validators.required,Validators.minLength(1)]],
    tutor_lastname_mother:  [""], 
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

  getpassword() {
    if( this.formParent.get('password').valid){
      this.render.removeClass(this.password.nativeElement,"is-invalid");
        this.render.addClass(this.password.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.password.nativeElement,"is-valid");
      this.render.addClass(this.password.nativeElement,"is-invalid");
      this.password.nativeElement.focus()

     }
  }
  getconfirmPassword() {
    if( this.formParent.get('confirmPassword').valid){
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
   if(this.formParent.get('email').valid){
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
    if( this.formParent.get('confirmEmail').valid){
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
    if( this.formParent.get('confirmEmail').valid){
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
  getTutor_name() {
    if( this.formParent.get('tutor_name').valid){
      this.render.removeClass(this.tutor_name.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_name.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_name.nativeElement,"is-valid");
      this.render.addClass(this.tutor_name.nativeElement,"is-invalid");
      this.tutor_name.nativeElement.focus()

     }
    
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
    if(this.formParent.valid){
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
       // this.centerModal();
       this.info.login(this.formParent.get('email').value,this.formParent.get('password').value)
       this.spinner = false;

      },error=>{
        console.log(error);
        this.spinner = false;
        alert('No se pudo realizar su registro,al parecer el correo ya esta registrado')
        
      }
     )
    }else{
      this.spinner= false;

      this.getcontact_email();
      this.getcontact_home_phone();
      this.getcontact_work_phone();
      this.getcontact_cellphone();
      this.getcontact_lastname_mother();
      this.getcontact_lastname_father();
      this.getcontact_name();
      this.gettutor_work_phone();
      this.gettutor_home_phone();
      this.gettutor_cellphone();
      this.gettutor_lastname_mother();
      this.getTutor_lastname_father();
      this. getTutor_name();
      this.getconfirmPassword();
      this.getpassword();
      this.getconfirmEmail();
      this.getemail();
    }
    
   
  }
  getTutor_lastname_father(){
    if( this.formParent.get('tutor_lastname_father').valid){
      this.render.removeClass(this.tutor_lastname_father.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_lastname_father.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_lastname_father.nativeElement,"is-valid");
      this.render.addClass(this.tutor_lastname_father.nativeElement,"is-invalid");
      this.tutor_lastname_father.nativeElement.focus()

     }
  }
  gettutor_lastname_mother(){
    if( this.formParent.get('tutor_lastname_mother').valid){
      this.render.removeClass(this.tutor_lastname_mother.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_lastname_mother.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_lastname_mother.nativeElement,"is-valid");
      this.render.addClass(this.tutor_lastname_mother.nativeElement,"is-invalid");
      this.tutor_lastname_mother.nativeElement.focus()

     }
  }
  gettutor_cellphone(){
    if( this.formParent.get('tutor_cellphone').valid){
      this.render.removeClass(this.tutor_cellphone.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_cellphone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_cellphone.nativeElement,"is-valid");
      this.render.addClass(this.tutor_cellphone.nativeElement,"is-invalid");
      this.tutor_cellphone.nativeElement.focus()

     }
  }
  gettutor_home_phone(){
    if( this.formParent.get('tutor_home_phone').valid){
      this.render.removeClass(this.tutor_home_phone.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_home_phone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_home_phone.nativeElement,"is-valid");
      this.render.addClass(this.tutor_home_phone.nativeElement,"is-invalid");
      this.tutor_home_phone.nativeElement.focus()

     }
  }
  gettutor_work_phone(){
    if( this.formParent.get('tutor_work_phone').valid){
      this.render.removeClass(this.tutor_work_phone.nativeElement,"is-invalid");
        this.render.addClass(this.tutor_work_phone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.tutor_work_phone.nativeElement,"is-valid");
      this.render.addClass(this.tutor_work_phone.nativeElement,"is-invalid");
      this.tutor_work_phone.nativeElement.focus()

     }
  }

  getcontact_name(){
    if( this.formParent.get('contact_name').valid){
      this.render.removeClass(this.contact_name.nativeElement,"is-invalid");
        this.render.addClass(this.contact_name.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_name.nativeElement,"is-valid");
      this.render.addClass(this.contact_name.nativeElement,"is-invalid");
      this.contact_name.nativeElement.focus()

     }
  }

  getcontact_lastname_father(){
    if( this.formParent.get('contact_lastname_father').valid){
      this.render.removeClass(this.contact_lastname_father.nativeElement,"is-invalid");
        this.render.addClass(this.contact_lastname_father.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_lastname_father.nativeElement,"is-valid");
      this.render.addClass(this.contact_lastname_father.nativeElement,"is-invalid");
      this.contact_lastname_father.nativeElement.focus()

     }

  }

  getcontact_lastname_mother(){
    if( this.formParent.get('contact_lastname_mother').valid){
      this.render.removeClass(this.contact_lastname_mother.nativeElement,"is-invalid");
        this.render.addClass(this.contact_lastname_mother.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_lastname_mother.nativeElement,"is-valid");
      this.render.addClass(this.contact_lastname_mother.nativeElement,"is-invalid");
      this.contact_lastname_mother.nativeElement.focus()

     }

  }
  getcontact_cellphone(){
    if( this.formParent.get('contact_cellphone').valid){
      this.render.removeClass(this.contact_cellphone.nativeElement,"is-invalid");
        this.render.addClass(this.contact_cellphone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_cellphone.nativeElement,"is-valid");
      this.render.addClass(this.contact_cellphone.nativeElement,"is-invalid");
      this.contact_cellphone.nativeElement.focus()

     }

  }
  getcontact_work_phone(){
    if( this.formParent.get('contact_work_phone').valid){
      this.render.removeClass(this.contact_work_phone.nativeElement,"is-invalid");
        this.render.addClass(this.contact_work_phone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_work_phone.nativeElement,"is-valid");
      this.render.addClass(this.contact_work_phone.nativeElement,"is-invalid");
      this.contact_work_phone.nativeElement.focus()

     }

  }
  getcontact_home_phone(){
    if( this.formParent.get('contact_home_phone').valid){
      this.render.removeClass(this.contact_home_phone.nativeElement,"is-invalid");
        this.render.addClass(this.contact_home_phone.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_home_phone.nativeElement,"is-valid");
      this.render.addClass(this.contact_home_phone.nativeElement,"is-invalid");
      this.contact_home_phone.nativeElement.focus()

     }
  }
  getcontact_email(){
    if( this.formParent.get('contact_email').valid){
      this.render.removeClass(this.contact_email.nativeElement,"is-invalid");
        this.render.addClass(this.contact_email.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_email.nativeElement,"is-valid");
      this.render.addClass(this.contact_email.nativeElement,"is-invalid");
      this.contact_email.nativeElement.focus()

     }
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
