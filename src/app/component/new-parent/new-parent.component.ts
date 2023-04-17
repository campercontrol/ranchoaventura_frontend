import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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



  constructor(private formBuild:FormBuilder,private parent: ParentService) { }

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
    contact_email2:          ["",[Validators.email]],
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
    terms:                   ['',[Validators.required,Validators.requiredTrue]],

    pasword:  ["",[Validators.required,Validators.minLength(6)]],
    pasword2:  ["",[Validators.required,Validators.minLength(6)]],
 
  },{
    
  })
  }

   pass(){
    if(this.formParent.get('pasword') === this.formParent.get('pasword2')){
        this.estadoContrasena = true;
    }else{
      this.estadoContrasena = true;
    }
  }

  prueba(){
   this.parent.setParent(this.formParent.value).subscribe(
    (res:any)=>{
      console.log(res);
      
    }
   )
  }

}
