import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../core/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/services/login.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-login-de-dprueba',
  
  template: ` <div class="container-fluid  prueba">
  <div class="row align-items-stretch">

      <div class="col bg d-none d-lg-block d-md-block">

      </div>
      <!-- end col -->
   
    
      <div class="col-xl-4 col-sm-12 col-md-7">
          <div class=" p-4" *ngIf="ressetPasword">
              <div class="w-100">

                  <div class=" h-100">
                      <div class="mb-3 mb-md-3">
                          <a routerLink="/" class="d-block auth-logo">
                              <img src="../../assets/images/logo.png" alt="" height="100px"
                                  class="auth-logo-dark" style="margin: 0 auto;">
                              <img src="../../assets/images/logo.png" alt="" height="100px"
                                  class="auth-logo-light">
                          </a>
                      </div>
                      <div class="">

                          <div>
                              <h2 class="text-primary">Bienvenido!</h2>

                          </div>



                          <div class="mt-2">
                              <div class="alert alert-danger" role="alert" *ngIf="errologin">
                                  Usuario o password incorrecto.
                              </div>
                              <form [formGroup]="loginForm">

                                  <div class="mb-3 mt-4">
                                      <label for="email">Email</label>
                                      <input type="email" class="form-control" id="email" formControlName="email"
                                          placeholder="Enter email" (keydown.enter)="login($event)" >

                                  </div>

                                 
                                  

                                  <div class="mb-3 mt-2">

                                      <label for="userpassword">Password</label>
                                      <div class="input-group auth-pass-inputgroup">
                                          <input [type]="passwordType" class="form-control" formControlName="password"
                                              placeholder="Enter password" aria-label="Password"
                                              aria-describedby="password-addon" (keydown.enter)="login($event)" >
                                          <button class="btn btn-light " type="button" id="password-addon"><i
                                                  class="pi pi-eye" (click)="cambioTipo()"></i></button>

                                      </div>
                                  </div>

                              </form>

                              <div class="mt-3 d-grid">
                                  <button class="btn btn-primary btn-block" type="button" (click)="login($event)" *ngIf="spinner">Log
                                      In</button>
                                      <div class="spinner-border text-primary" style="margin: 0 auto" role="status" *ngIf="!spinner">
                                          <span class="visually-hidden">Loading...</span>
                                        </div>
                              </div>
                              <div class="mt-5">
                                  <h4 style="text-align: center;">
                                      ¿No tienes cuenta? ¡ Regístrate aquí!
                                  </h4>
                                  <div class=" d-grid"> <button class="btn btn-warning" (click)="open(content)"> Crear
                                          Cuenta Nueva</button> </div>

                              </div>

                               <div class="mt-3">
                                  <h4 style="text-align: center;">
                                      ¿Olvidaste tu contraseña?
                                  </h4>
                                  <div class=" d-grid"> <button class="btn btn-success" (click)="ressetPasword = false"> Recuperar tu contraseña</button>
                                       </div>

                              </div>




                          </div>
                      </div>


                  </div>
              </div>
          </div>
         
              <div class=" p-4" *ngIf="!ressetPasword">
                  <div class="w-100">

                      <div class=" h-100">
                          <div class="">
                              <a routerLink="/" class="d-block auth-logo">
                                  <img src="../../assets/images/camp/logoCamper.png" alt="" height="100px"
                                      class="auth-logo-dark" style="margin: 0 auto;">
                                  <img src="../../assets/assets/images/camp/logoCamper.png" alt="" height="100px"
                                      class="auth-logo-light">
                              </a>
                          </div>
                          <div>
                              <h2 class="text-primary">Recuperación de Contraseña</h2>

                          </div>
                          <div class="mt-3">
                              <div class="mb-4" role="alert">
                                  Si deseas restablecer la contraseña, ingresa la dirección de correo electrónico que
                                  utilizaste en tu registro.
                              </div>

                              <div class="alert alert-primary mt-2" role="alert" *ngIf="alertPass">
                                  Se ha enviado un correo con la información para cambiar tu contraseña.
                                </div>
                              <form [formGroup]="resetPass"  class="mt-5 mb-5">

                                  <div>
                                      <label for="email">Dirección de correo electrónico : </label>
                                      <input type="email" class="form-control" id="email" formControlName="email"
                                          placeholder="Enter email">

                                  </div>

                                  <div class="mt-3 d-grid">
                                      <button class="btn btn-primary btn-block" type="button"
                                          (click)="resetPasword()">Enviar correo</button>
                                  </div>

                              </form>

                              
                              <div class="mt-5">
                                  <h5 style="text-align: center;">
                                      ¿No tienes cuenta?
                                  </h5>
                                  <div class=" d-grid"> <button class="btn btn-warning" (click)="open(content)"> Crear
                                          Cuenta Nueva</button>
                                       </div>
                                       <div class="mt-2">

                                          <div class=" d-grid"> <button class="btn btn-danger" (click)="ressetPasword=true">Iniciar
                                                  Sesión</button> </div>
      
                                      </div>

                              </div>

                             



                          </div>
                      </div>
                  </div>

              </div>
      </div>
      <!-- end col -->
  </div>
  <!-- end row -->
</div>
<!-- end container-fluid -->

<ng-template #content let-modal>
  <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title"> </h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
      Si en años anteriores ya has enviado a un hijo o hija a Camper Control, no debes crear una cuenta nueva, pues ya
      tenemos todos tus datos. Da click en Recupera tu contraseña para poder activar de nuevo tu cuenta o bien ponte
      en contacto con nosotros para poder ayudarte a acceder a tu cuenta registrada.

      Comunícate con nosotros al (777) 560 9123 o del interior al 01·800·700·2267 y con mucho gusto te ayudaremos.

      Si eres completamente nuevo, ¡Gracias por la confianza!
  </div>
  <div class="modal-footer">
      <div class="row">
          <button type="button" class="btn btn-primary" (click)="link()">Soy nuevo en Camper Control y quiero crear
              una nueva cuenta</button>
          <button type="button" class="btn btn-outline-dark mt-2"
              (click)="modal.close('Save click')">Cancelar</button>

      </div>

  </div>
</ng-template>
<p-dialog 
header="Aviso Importante" 
[(visible)]="visible" 
[modal]="true" 
[closable]="false" 
[dismissableMask]="true"
[style]="{width: '80vw'}">

<div class="p-2">
<p class="mt-4">
  <strong>Importante:</strong> Queremos informarte que el sistema estará temporalmente fuera de servicio por tareas de mantenimiento programado. Este periodo de inactividad comenzará el <strong>domingo por la noche</strong> y se extenderá hasta la <strong>mañana del lunes</strong>.
</p>
<p>
  Estas labores de mantenimiento son necesarias para mejorar el rendimiento, seguridad y estabilidad de la plataforma, con el objetivo de brindarte una mejor experiencia de uso. Durante este tiempo no será posible acceder al sistema, registrar cuentas ni recuperar contraseñas.
</p>
<p>
  Te recomendamos planificar tus accesos antes del cierre programado y agradecemos tu comprensión y paciencia mientras trabajamos para seguir mejorando nuestro servicio.
</p>

</div>

</p-dialog>`,
  styleUrls: ['./login-de-dprueba.component.css'],
 })
export class LoginDeDpruebaComponent { 
    loginForm: FormGroup;
    resetPass: FormGroup;
  
    submitted = false;
    visible = true;
    error = '';
    returnUrl: string;
    passwordType= "password";
    errologin = false;
    ressetPasword= true;
    alertPass = false;
    spinner= true;
  
    // set the currenr year
    year: number = new Date().getFullYear();
    alert: boolean= false;
    closeResult = '';
  
    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,private modalService: NgbModal,
     ) { 
      const currentUser = localStorage.getItem('currentUser'); // Verifica si existe en localStorage
   
  
  
     }
  
    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
  
      this.resetPass = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
  
  
  
  
    }
    get f() { return this.loginForm.controls; }
  
    login(event:Event) {
      this.submitted = true;
      this.spinner= false;
        this.authenticationService.login(this.f.email.value, this.f.password.value).subscribe((user:any)=>{
          this.errologin = false;
          // console.log(res.type);
          if(user.detail==undefined){
  
            console.log(user);
            console.log(user);
            this.authenticationService.loggedIn = true;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.authenticationService.infToken = jwt_decode(user.access_token);
            console.log(this.authenticationService.infToken,'token transformado');
            
            console.log(this.authenticationService.infToken.role_id);
            
            if(this.authenticationService.infToken.role_id  == 2){
              this.router.navigate(['dashboard/staff']);
              console.log(this.authenticationService.infToken);
   
            }else if(this.authenticationService.infToken.role_id  == 3 || this.authenticationService.infToken.role_id  == 4 ){
              this.router.navigate(['dashboard/school/upcoming_camps']);
              console.log(this.authenticationService.infToken);
              
            }else if(this.authenticationService.infToken.role_id  == 1 ){
              this.router.navigate(['dashboard/parents']);
              console.log(this.authenticationService.infToken);
            }else{
              this.router.navigate(['dashboard/medical/camps']);
              console.log(this.authenticationService.infToken);
            }
         
  
          }else{
            this.errologin=true;
            this.spinner=true;
            
          }
          
         
          
        },error=>{
          this.spinner = true;
          console.log(error);
          
        })
          
      //  event.preventDefault();
        
      
    }
  
    resetPasword(){
      this.authenticationService.recuperarContra(this.resetPass.value).subscribe((res:any)=>{
        if(res.detail.status == 1){
          this.alertPass = true;
  
        }else{
         alert( 'El correo ingresado no existe, por favor verifique e intente nuevamente');
        }
  
      })
    }
    open(content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
  
    cambioTipo(){
      if(this.passwordType =='password'){
        this.passwordType = 'text';
        
      }else{
        this.passwordType = 'password';
  
      }
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
  
  
   
  
    link(){
      this.modalService.dismissAll();
      this.router.navigate(['Singup'])
    }
  
    
  
  }
