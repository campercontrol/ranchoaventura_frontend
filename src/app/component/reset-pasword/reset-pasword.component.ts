import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-pasword',
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.scss']
})
export class ResetPaswordComponent implements OnInit {
  resetPass:FormGroup ;
  alertPass:boolean= false;
  token:any = "";
  email:string="";
  spinner = false;

  constructor(private formBuilder: FormBuilder, private data: AuthenticationService,private router:Router,private route: ActivatedRoute) { 
    console.log(this.data.infToken);
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });

    
  }

  ngOnInit(): void {
    this.resetPass = this.formBuilder.group({
      "email": this.email,
      password: ['', [Validators.required, Validators.minLength(6),         Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/),
      ]],

    });
  }

  resetPasword(){
    this.spinner = true;
    this.data.restPassword(this.token,this.resetPass.value).subscribe((res:any)=>{
      console.log(res);
      if(res.detail.status == 1){
        this.spinner = false;

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
