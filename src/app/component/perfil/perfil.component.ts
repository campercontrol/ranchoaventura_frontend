import { Component, OnInit } from '@angular/core';
import { ParentService } from '../../../services/parent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public formParent : FormGroup;

  constructor(private parent : ParentService, private formBuild:FormBuilder,private info: AuthenticationService) { }

  ngOnInit(): void {

    this.formParent = this.formBuild.group({
      tutor_lastname_father:["",[Validators.required]],
      tutor_cellphone:      ["",[Validators.required,
                             Validators.pattern("^[0-9]*$"),
                             Validators.minLength(10), Validators.maxLength(10)]],
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
                            Validators.minLength(10), Validators.maxLength(10)]],
    contact_lastname_father:  ["",[Validators.required]], 
    contact_cellphone:      ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(10), Validators.maxLength(10)]],
    contact_work_phone:     ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(10), Validators.maxLength(10)]],
    terms:                   ['',[Validators.required,Validators.requiredTrue]]

   
  })

      this.getParent();
  }

  getParent(){
    this.parent.getParet(this.info.infToken.user_id ).subscribe(
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
            terms: true

          })
      }
    )
  }

  send(){
    console.log(this.formParent.value);
    this.parent.partnPatch(2, this.formParent.value).subscribe((arg:any) =>console.log(arg)
    );
    
    
  }

}
