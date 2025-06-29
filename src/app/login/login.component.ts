import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../core/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/services/login.service';
import jwt_decode from "jwt-decode";

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
        console.log(error);
        
      })
        
    //  event.preventDefault();
      
    
  }


  handleDialogClose() {
    // Guardar que ya se mostró el diálogo
    localStorage.setItem('alreadySeenDialog', 'true');
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
