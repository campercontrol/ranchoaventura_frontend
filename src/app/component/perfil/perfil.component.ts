import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ParentService } from '../../../services/parent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { LangService } from 'src/services/lang.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public formParent : FormGroup;

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
  @ViewChild("confirmEmail") confirmEmail: ElementRef;
  spinner = false
  idoma:string='eng'

  textos= {
    "esp":{
      titulo:"Titular de la cuenta (PADRE, MADRE o TUTOR)",
      texto1:"Ingresa la información del padre, madre o tutor titular de la cuenta.",
      texto2:"Nombre(s)*",
      texto3:"Apellido paterno*",
      texto4:"Apellido materno",
      texto5:"Teléfono móvil* ",
      texto6:"Teléfono de casa*",
      texto7:"Teléfono de oficina*",
      texto8:"Segundo titular de la cuenta (PADRE, MADRE o SEGUNDO TUTOR)",
      texto9:"No es el titular de la cuenta, pero es igual de importante ya que es a quien llamaremos en caso de no poder contactar al primer titular, tambien recibe los correos referentes a los campamentos.",
      texto10:"Email*",
      texto11:"Confirmar correo electrónico*",
      texto12:"Acepto los términos y condiciones",
      texto13:"términos y condiciones  ",
      texto14:"Se enviará un correo electrónico de confirmación a tu correo, te pedimos que revises tu bandeja de spam",
      textto15:"Correo no deseado",
      texto16:"para asegurar que lo recibiste bien. Si no lo recibes ,ponte en contacto con nosotros.",
      text017:"Guardar",
      text018:"Cancelar",
    
    },
    "eng":{
      titulo:"Account's principal name (Mother / Father / 2nd Guardian)",
      texto1:"Access data of the Father, mother or guardian",
      texto2:"Name(s)*",
      texto3:"Last name*",
      texto4:"Second Last Name",
      texto5:"Mobile Phone*",
      texto6:"Home phone*",
      texto7:"Office phone*",
      texto8:" Cotitular (Mother / Father / 2nd Guardian)",
      texto9:"Will not be the account principal, but is as important. We'll get in touch with this person in case we can't reach the account principal..",
      texto10:"Email*",
      texto11:"Reenter email*",
      texto12:"I accept the terms and conditions.",
      texto13:"Read the terms and conditions.",
      texto14:"A confirmation email will be sent to your email, please check your",
      texto15:"Spam",
      texto16:"to make sure you get it . If you do not receive it, please contact us.",
      text017:"Save",
      text018:"Cancel",
    }

  }





  constructor(private parent : ParentService, private formBuild:FormBuilder,private info: AuthenticationService,private render :Renderer2,private router: Router,private lang:LangService) { }

  ngOnInit(): void {
  this.lang.getLang().subscribe((res:any)=>{
    this.idoma=res
    
  })
    this.formParent = this.formBuild.group({
      tutor_lastname_father:["",[Validators.required,Validators.minLength(2)]],
      tutor_cellphone:      ["",[Validators.required,
                             Validators.pattern('^[+]?\\d*$')]],
      tutor_home_phone:     ["",[Validators.required,
                              Validators.pattern('^[+]?\\d*$')]],
      contact_name:         ["",[Validators.required,Validators.minLength(2)]],
    
    contact_lastname_mother:[""],
    contact_home_phone:     ["",[Validators.required,
                            Validators.pattern('^[+]?\\d*$')]], 
    contact_email:          ["",[Validators.required,
                                   Validators.email]],
    confirmEmail: ['', [Validators.required,Validators.email]],

    tutor_name :            ["",[Validators.required,Validators.minLength(2)]],
    tutor_lastname_mother:  [""], 
    tutor_work_phone:       ["",[Validators.pattern('^[+]?\\d*$'),]],
    contact_lastname_father:  ["",[Validators.required,Validators.minLength(2)]], 
    contact_cellphone:      ["",[Validators.required,
                            Validators.pattern('^[+]?\\d*$')]],
    contact_work_phone:     ["",[
                            Validators.pattern('^[+]?\\d*$')]],
    terms:                   ['',[Validators.required,Validators.requiredTrue]]

   
  },{
    validators: this.matchingFieldsValidator('contact_email', 'confirmEmail')
  })

      this.getParent();
  }

  getParent(){
    this.parent.getParet(this.info.infToken.profile_id ).subscribe(
      (res:any)=>{
        console.log('respuestas',res);
        
          this.formParent.patchValue({
            tutor_lastname_father: res['data'].tutor_lastname_father,
            tutor_cellphone: res['data'].tutor_cellphone,
            tutor_home_phone:res['data'].tutor_home_phone,
            contact_name: res['data'].contact_name,
            contact_lastname_mother: res['data'].contact_lastname_mother,
            contact_home_phone: res['data'].contact_home_phone,
            contact_email: res['data'].contact_email,
            tutor_name: res['data'].tutor_name,
            tutor_lastname_mother: res['data'].tutor_lastname_mother,
            tutor_work_phone: res['data'].tutor_work_phone,
            contact_lastname_father: res['data'].contact_lastname_father,
            contact_cellphone: res['data'].contact_cellphone,
            contact_work_phone: res['data'].contact_work_phone,
            confirmEmail:res['data'].contact_email,

            terms: true

          })
      }
    )
  }

  send(){
    this.spinner = true;
    if(this.formParent.valid){
      this.parent.partnPatch(this.info.infToken.profile_id, this.formParent.value).subscribe((arg:any) =>{
        console.log(arg);
        
        this.spinner = true;
        this.router.navigate(['dashboard/parents'])
      });
    }else{
      this.spinner = false;
      this.getconfirmEmail();
      this.getcontact_email();
      this.getcontact_home_phone();
      this.getcontact_work_phone();
      this.getcontact_cellphone();
      this.getcontact_lastname_mother();
      this.getcontact_lastname_father();
      this.getcontact_name();
      this.gettutor_work_phone()
      this.gettutor_home_phone();
      this.getTutor_cellphone();
      this.gettutor_lastname_mother();
      this.getTutor_lastname_father();
      this.gettutor_name();
      this.terms();

      
    }
    
    
  }

  matchingFieldsValidator( emailField: string, confirmEmailField: string) {
    return (formGroup: FormGroup) => {   
      const email = formGroup.controls[emailField];
      const confirmEmail = formGroup.controls[confirmEmailField];  
      if (email.value !== confirmEmail.value) {
        confirmEmail.setErrors({ emailMismatch: true });
      } else {
        confirmEmail.setErrors(null);
      }
    };
  }


  terms(){
    if(!this.formParent.get('terms').valid){
      alert('Aún no aceptas los términos y condiciones');

     }
  }
 


  getTutor_lastname_father(){
    if (this.formParent.get('tutor_lastname_father').valid) {
      this.render.removeClass(this.tutor_lastname_father.nativeElement, "is-invalid");
      this.render.addClass(this.tutor_lastname_father.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.tutor_lastname_father.nativeElement, "is-valid");
      this.render.addClass(this.tutor_lastname_father.nativeElement, "is-invalid");
      this.tutor_lastname_father.nativeElement.focus();
    }
   
  }

  getTutor_cellphone(){
    if (this.formParent.get('tutor_cellphone').valid) {
      this.render.removeClass(this.tutor_cellphone.nativeElement, "is-invalid");
      this.render.addClass(this.tutor_cellphone.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.tutor_cellphone.nativeElement, "is-valid");
      this.render.addClass(this.tutor_cellphone.nativeElement, "is-invalid");
      this.tutor_cellphone.nativeElement.focus();
    }
   // this.validateFormField(this.tutor_cellphone,'tutor_cellphone');
  }

  gettutor_home_phone(){
    if (this.formParent.get('tutor_home_phone').valid) {
      this.render.removeClass(this.tutor_home_phone.nativeElement, "is-invalid");
      this.render.addClass(this.tutor_home_phone.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.tutor_home_phone.nativeElement, "is-valid");
      this.render.addClass(this.tutor_home_phone.nativeElement, "is-invalid");
      this.tutor_home_phone.nativeElement.focus();
    }
    //this.validateFormField(this.tutor_home_phone,'tutor_home_phone');
  }

  getcontact_name(){
    if (this.formParent.get('contact_name').valid) {
      this.render.removeClass(this.contact_name.nativeElement, "is-invalid");
      this.render.addClass(this.contact_name.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.contact_name.nativeElement, "is-valid");
      this.render.addClass(this.contact_name.nativeElement, "is-invalid");
      this.contact_name.nativeElement.focus();
    }
    //this.validateFormField(this.contact_name,'contact_name');
  }

  getcontact_lastname_mother(){
    if (this.formParent.get('contact_lastname_mother').valid) {
      this.render.removeClass(this.contact_lastname_mother.nativeElement, "is-invalid");
      this.render.addClass(this.contact_lastname_mother.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.contact_lastname_mother.nativeElement, "is-valid");
      this.render.addClass(this.contact_lastname_mother.nativeElement, "is-invalid");
      this.contact_lastname_mother.nativeElement.focus();
    }
   // this.validateFormField(this.contact_lastname_mother,'contact_lastname_mother');
  }
  getcontact_home_phone(){
    if (this.formParent.get('contact_home_phone').valid) {
      this.render.removeClass(this.contact_home_phone.nativeElement, "is-invalid");
      this.render.addClass(this.contact_home_phone.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.contact_home_phone.nativeElement, "is-valid");
      this.render.addClass(this.contact_home_phone.nativeElement, "is-invalid");
      this.contact_home_phone.nativeElement.focus();
    }
    //this.validateFormField(this.contact_home_phone,'contact_home_phone')
  }
  getcontact_email(){
    if (this.formParent.get('contact_email').valid) {
      this.render.removeClass(this.contact_email.nativeElement, "is-invalid");
      this.render.addClass(this.contact_email.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.contact_email.nativeElement, "is-valid");
      this.render.addClass(this.contact_email.nativeElement, "is-invalid");
      this.contact_email.nativeElement.focus();
    }
   // this.validateFormField(this.contact_email,'contact_email');
  }
  getconfirmEmail(){
    if (this.formParent.get('confirmEmail').valid) {
      this.render.removeClass(this.confirmEmail.nativeElement, "is-invalid");
      this.render.addClass(this.confirmEmail.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.confirmEmail.nativeElement, "is-valid");
      this.render.addClass(this.confirmEmail.nativeElement, "is-invalid");
      this.confirmEmail.nativeElement.focus();
    }
   // this.validateFormField(this.confirmEmail,'confirmEmail');
  }

  gettutor_name(){
    if (this.formParent.get('tutor_name').valid) {
      this.render.removeClass(this.tutor_name.nativeElement, "is-invalid");
      this.render.addClass(this.tutor_name.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.tutor_name.nativeElement, "is-valid");
      this.render.addClass(this.tutor_name.nativeElement, "is-invalid");
      this.tutor_name.nativeElement.focus();
    }
    
   // this.validateFormField(this.tutor_name,'tutor_name')
  }
  gettutor_lastname_mother(){
    if (this.formParent.get('tutor_lastname_mother').valid) {
      this.render.removeClass(this.tutor_lastname_mother.nativeElement, "is-invalid");
      this.render.addClass(this.tutor_lastname_mother.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.tutor_lastname_mother.nativeElement, "is-valid");
      this.render.addClass(this.tutor_lastname_mother.nativeElement, "is-invalid");
      this.tutor_lastname_mother.nativeElement.focus();
    }
    
   // this.validateFormField(this.tutor_lastname_mother,'tutor_lastname_mother')
  }
  gettutor_work_phone(){
    if (this.formParent.get('tutor_work_phone').valid) {
      this.render.removeClass(this.tutor_work_phone.nativeElement, "is-invalid");
      this.render.addClass(this.tutor_work_phone.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.tutor_work_phone.nativeElement, "is-valid");
      this.render.addClass(this.tutor_work_phone.nativeElement, "is-invalid");
      this.tutor_work_phone.nativeElement.focus();
    }
    //this.validateFormField(this.tutor_work_phone,'tutor_work_phone');
  }
  getcontact_lastname_father(){
    if (this.formParent.get('contact_lastname_father').valid) {
      this.render.removeClass(this.contact_lastname_father.nativeElement, "is-invalid");
      this.render.addClass(this.contact_lastname_father.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.contact_lastname_father.nativeElement, "is-valid");
      this.render.addClass(this.contact_lastname_father.nativeElement, "is-invalid");
      this.contact_lastname_father.nativeElement.focus();
    }
   // this.validateFormField(this.contact_lastname_father,'contact_lastname_father');
  }
  getcontact_cellphone(){
    if (this.formParent.get('contact_cellphone').valid) {
      this.render.removeClass(this.contact_cellphone.nativeElement, "is-invalid");
      this.render.addClass(this.contact_cellphone.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.contact_cellphone.nativeElement, "is-valid");
      this.render.addClass(this.contact_cellphone.nativeElement, "is-invalid");
      this.contact_cellphone.nativeElement.focus();
    }
    //this.validateFormField(this.contact_cellphone,'contact_cellphone');
  }
  getcontact_work_phone(){
    if (this.formParent.get('contact_work_phone').valid) {
      this.render.removeClass(this.contact_work_phone.nativeElement, "is-invalid");
      this.render.addClass(this.contact_work_phone.nativeElement, "is-valid");
    } else {
      this.render.removeClass(this.contact_work_phone.nativeElement, "is-valid");
      this.render.addClass(this.contact_work_phone.nativeElement, "is-invalid");
      this.contact_cellphone.nativeElement.focus();
    }
  //  this.validateFormField(this.contact_work_phone,'contact_work_phone');
  }

  

}
