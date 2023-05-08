import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  correo:string = "";
  confirmarCorreo = "";
  estadoCorreo:boolean= false;
  breadCrumbItems: Array<{}>;

  constructor(private formBuild:FormBuilder,private parent: ParentService,private router :Router,private modalService: NgbModal,private configService: ConfigService, private eventService: EventService) { }
  
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];

    this.formParent = this.formBuild.group({
      tutor_lastname_father:["",[Validators.required]],
      tutor_cellphone:      ["",[Validators.required,
                             Validators.pattern("^[0-9]*$"),
                             Validators.minLength(8), Validators.maxLength(10)]],
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
                            Validators.minLength(8), Validators.maxLength(10)]],
    contact_lastname_father:  ["",[Validators.required]], 
    contact_cellphone:      ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]],
    contact_work_phone:     ["",[Validators.required,
                            Validators.pattern("^[0-9]*$"),
                            Validators.minLength(8), Validators.maxLength(10)]],
    terms:                   ['',[Validators.required,Validators.requiredTrue]],
    user_id:                 [0]
    
  },{
    
  })
  }


   pass(){
  
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

  equalsEmail(){
    if( this.correo == this.confirmarCorreo){
      this.estadoCorreo = true;
      console.log(this.estadoCorreo)

    }else{
      this.estadoCorreo = false;
    }  }

  prueba(){
    this.spinner= true;
    let a = { 
      user:{
        email:this.confirmarCorreo,
        passw: this.confirmarContrasena,
        role_id: 1,
        is_superuser: false
      },

      parent:this.formParent.value,

  }
  
   this.parent.setParent(a).subscribe(
    (res:any)=>{
      console.log(res);
      this.spinner = false;
      this.centerModal()
      setTimeout(() => {
        this.router.navigate(['parents/new-camper']);
      }, 1000);
    }
   )
   
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
