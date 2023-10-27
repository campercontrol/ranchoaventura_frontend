import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-pasword',
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.scss']
})
export class ResetPaswordComponent implements OnInit {
  resetPass:FormGroup ;
  alertPass:boolean= false;
  token:any = {};

  constructor(private formBuilder: FormBuilder, private data: AuthenticationService,private router:Router) { 
    console.log(this.data.infToken);
    this.token = JSON.parse(localStorage.getItem('currentUser'));
   
    

    
  }

  ngOnInit(): void {
    this.resetPass = this.formBuilder.group({
      "access_token": this.token.access_token,
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/)]],
      password_confirm: ['', [Validators.required]],
    });
  }

  resetPasword(){
    this.data.cambiarContrasena(this.data.infToken.user_email,this.resetPass.value).subscribe((res:any)=>{
      console.log(res);
      if(res.mensaje != null){
        this.alertPass=true;

      }
      

      

    })
  }

  routerInfo(){
    this.router.navigate([''])
  }

  matchingFieldsValidator(passwordField: string, confirmPasswordField: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordField];
      const confirmPassword = formGroup.controls[confirmPasswordField];
     
  
      // Verificar si la contraseña es válida
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
  
     
  
      // Verificar si la contraseña es válida y establecer errores en confirmPassword si no lo es
      if (password.invalid) {
        confirmPassword.setErrors({ invalidPassword: true });
      } else {
        // Si la contraseña es válida, borra los errores relacionados con la contraseña en confirmPassword
        if (confirmPassword.hasError('invalidPassword')) {
          const errors = { ...confirmPassword.errors };
          delete errors['invalidPassword'];
          confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
        }
      }
    };
  }

}
