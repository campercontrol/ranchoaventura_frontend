import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../core/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  resetPass: FormGroup;

  submitted = false;
  error = '';
  returnUrl: string;
  passwordType= "password";
  errologin = false;
  ressetPasword= true;
  alertPass = false;

  // set the currenr year
  year: number = new Date().getFullYear();
  alert: boolean= false;
  closeResult = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,private modalService: NgbModal,
   ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['hernandezcruzalbertoulises@gmail.com', [Validators.required, Validators.email]],
      password: ['11654252Aa@', [Validators.required]],
    });

    this.resetPass = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }
  get f() { return this.loginForm.controls; }

  login(event:Event) {
    this.submitted = true;
      this.authenticationService.login(this.f.email.value, this.f.password.value).then((res:any)=>{
        this.errologin = false;
        // console.log(res.type);
         
       
        
      }).catch((error:any)=>{
        //console.log(res);
        throw new Error("oh, no!");

      });
        
    //  event.preventDefault();
      
    
  }

  resetPasword(){
    this.authenticationService.recuperarContra(this.resetPass.value).subscribe((res:any)=>{
      if(res.mensaje == "Se ha enviado un correo con instrucciones para la recuperacion de su contraseña"){
        this.alertPass = true;

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
