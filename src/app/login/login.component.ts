import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../core/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/services/login.service';
import jwt_decode from "jwt-decode";
import { title } from 'process';
import { LangService } from 'src/services/lang.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  resetPass: FormGroup;

  submitted = false;
  visible = true;
  error = '';
  returnUrl: string;
  cookieValue;
  flagvalue:any;
  valueset;
  countryName;
  listLang = [
    {id:1, text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'eng' },
    {id:2, text: 'Español', flag: 'assets/images/flags/mex.jpg', lang: 'esp' },
  ];
  passwordType= "password";
  errologin = false;
  texto = {
    login: {
      esp: {
        welcome: '¡Bienvenido!',
        emailLabel: 'Email:',
        emailPlaceholder: 'Ingresa tu email',
        passwordLabel: 'Password:',
        passwordPlaceholder: 'Ingresa tu contraseña',
        loginButton: 'Log In',
        noAccount: '¿No tienes cuenta? ¡Regístrate aquí!',
        createAccount: 'Crear Cuenta Nueva',
        forgotPassword: '¿Olvidaste tu contraseña?',
        recoverPassword: 'Recuperar Contraseña'
      },
      eng: {
        welcome: 'WELCOME!',
        emailLabel: 'Email:',
        emailPlaceholder: 'Enter Email',
        passwordLabel: 'Password:',
        passwordPlaceholder: 'Enter Password',
        loginButton: 'Log In',
        noAccount: 'You do not have an account? Register here!',
        createAccount: 'Create new account',
        forgotPassword: 'Forgot your password?',
        recoverPassword: 'Recover Password'
      }
    },
    resetPassword: {
      esp: {
        title: 'Recuperación de Contraseña',
        instructions: 'Si deseas restablecer la contraseña, ingresa la dirección de correo electrónico que utilizaste en tu registro.',
        emailLabel: 'Dirección de correo electrónico:',
        emailPlaceholder: 'Ingresa tu email',
        sendButton: 'Enviar correo (favor de checar bandeja SPAM)',
        noAccount: '¿No tienes cuenta?',
        createAccount: 'Crear Cuenta Nueva',
        backToLogin: 'Iniciar Sesión'
      },
      eng: {
        title: 'Password Recovery',
        instructions: 'If you want to reset your password, enter the email address you used during registration.',
        emailLabel: 'Email Address:',
        emailPlaceholder: 'Enter Email',
        sendButton: 'Send recovery email. (please check your SPAM)',
        noAccount: 'You do not have an account?',
        createAccount: 'Create new account',
        backToLogin: 'Log In'
      }
    },
    createAccountModal: {
      esp: {
        body1: `Si en años anteriores ya has enviado a un hijo o hija a RANCHO AVENTURA, no debes crear una cuenta nueva, pues ya tenemos todos tus datos. Da click en Recupera tu contraseña para poder activar de nuevo tu cuenta o bien ponte en contacto con nosotros para poder ayudarte a acceder a tu cuenta registrada.`,
        contact: `Comunícate con nosotros al (55) 1741.4673 o al (55) 1741.4673  y con mucho gusto te ayudaremos.`,
        body2: `Si eres completamente nuevo, ¡Gracias por la confianza!`,
        newButton: `Soy nuevo en RANCHO AVENTURA y quiero crear una nueva cuenta`,
        cancelButton: `Cancelar`
      },
      eng: {
        body1: `If you have already sent a camper to RANCHO AVENTURA in previous years, you do not need to create a new account, as we already have all your information. Click on "Recover your password" to reactivate your account or contact us for assistance in accessing your registered account.`,
        contact: `Reach out to us at (55) 1741.4673  or (55) 1741.4673 , and we will gladly help you.`,
        body2: `If you are completely new, thank you for your trust!`,
        newButton: `I'm new to RANCHO AVENTURA and want to create a new account`,
        cancelButton: `Cancel`
      }
    },
    noticeDialog: {
      esp: {
        attention: `¡Atención!`,
        line1: `A partir del 01 de Julio de 2025 en RANCHO AVENTURA estamos estrenando nueva versión del sistema de inscripción.`,
        line2: `Por tu seguridad, todas las contraseñas fueron borradas en la migración de la base de datos, por lo que antes de ingresar a tu cuenta deberás recuperar tu contraseña dando click en “Recuperar Contraseña”.`,
        line3: `Te enviaremos un correo con una liga para que la asignes de nuevo. NO OLVIDES REVISAR tu bandeja de SPAM.`,
        line4: `Este proceso solo debe realizarse una vez. Si ya lo hiciste, no es necesario repetirlo.`
      },
      eng: {
        attention: `Attention!`,
        line1: `As of July 1, 2025 at RANCHO AVENTURA we are launching a new version of the registration system.`,
        line2: `For your security, all passwords were deleted during the database migration, so before logging in you will need to reset your password by clicking “Recover Password.”`,
        line3: `We will send you an email with a link to set it again. PLEASE REMEMBER TO CHECK your SPAM folder.`,
        line4: `This process only needs to be done once. If you have already done it, you do not need to repeat it.`
      }
    }
  };
  
  ressetPasword= true;
  alertPass = false;
  traducciones = {
  
  login: {
    title:"¡Bienvenido!",
    Email: "Emailr",
    Password: "Password",

  }
  
  
  
  
  
  }
  spinner= true;
  idoma: any; // Add the idoma property
  textosLogin: any;
  textosReset: any;

  // set the currenr year
  year: number = new Date().getFullYear();
  alert: boolean= false;
  closeResult = '';
  textosModal: { body1: string; contact: string; body2: string; newButton: string; cancelButton: string; } | { body1: string; contact: string; body2: string; newButton: string; cancelButton: string; };
  textosNotice: { attention: string; line1: string; line2: string; line3: string; line4: string; } | { attention: string; line1: string; line2: string; line3: string; line4: string; };
buttonSend: any = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,private modalService: NgbModal,
    private  lang: LangService ) { 
    const currentUser = localStorage.getItem('currentUser'); // Verifica si existe en localStorage
    this.lang.getLang().subscribe((res:any)=>{
      this.idoma=res
      this.idoma = res;
      this.actualizaTextos(res);
    });
    if (currentUser) {
      // Si existe, decodifica el token
      const user = JSON.parse(currentUser); // Convierte el string a un objeto
      this.authenticationService.infToken = jwt_decode(user.access_token);
      console.log(this.authenticationService.infToken, 'token transformado');
    
      // Redirección basada en el role_id
      if (this.authenticationService.infToken.role_id == 2) {
        this.router.navigate(['dashboard/staff']);
        console.log(this.authenticationService.infToken);
      } else if (
        this.authenticationService.infToken.role_id == 3 || 
        this.authenticationService.infToken.role_id == 4
      ) {
        this.router.navigate(['dashboard/school/upcoming_camps']);
        console.log(this.authenticationService.infToken);
      } else if (this.authenticationService.infToken.role_id == 1) {
        this.router.navigate(['dashboard/parents']);
        console.log(this.authenticationService.infToken);
      } else {
        this.router.navigate(['dashboard/medical/camps']);
        console.log(this.authenticationService.infToken);
      }
    } else {
      // Si no existe currentUser, puedes dejar al usuario en login o no hacer nada
      console.log('No hay un usuario registrado');
      this.router.navigate(['login']);
    }


   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.resetPass = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.visible = localStorage.getItem('alreadySeenDialog') !== 'true';



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
        this.errologin=true;

        console.log(error);
        
      })
        
    //  event.preventDefault();
      
    
  }
  private actualizaTextos(idioma: 'esp'|'eng') {
    this.textosLogin = this.texto.login[idioma];
    this.textosReset = this.texto.resetPassword[idioma];
    this.textosModal = this.texto.createAccountModal[ idioma];
this.textosNotice = this.texto.noticeDialog[idioma];
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
   // this._cookiesService.set('lang', lang);
    this.lang.setLang(lang)
  }

  handleDialogClose() {
    // Guardar que ya se mostró el diálogo
    localStorage.setItem('alreadySeenDialog', 'true');
  }
  resetPasword(){
    this.buttonSend = true;
    this.authenticationService.recuperarContra(this.resetPass.value).subscribe((res:any)=>{
      if(res.detail.status == 1){
        this.alertPass = true;

      }else{
       alert( 'El correo ingresado no existe, por favor verifique e intente nuevamente');
      }

      this.buttonSend = false;

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
