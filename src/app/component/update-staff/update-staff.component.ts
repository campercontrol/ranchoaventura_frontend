import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CamperService } from 'src/services/camper.service';
import { StaffService } from 'src/services/staff.service';
@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.scss']
})
export class UpdateStaffComponent implements OnInit {
  visibleSelection = 0;

  blood_types: any = [];
  food_restrictions: any = [];
  genders: any = [];
  grades: any = [];
  licensed_medicines: any = [];
  pathological_background: any = [];
  @ViewChild('centerDataModal') content:ElementRef;
  pathological_background_fm: any = [];
  school: any = [];
  vaccines: any = [];
  foto: any;
  erroA:any=false;
  spinner: boolean = false;
  photoSelect: string | ArrayBuffer;
  spinerPhot = false;
  public formUser: FormGroup;
  public formGen: FormGroup;
  vacunas: any = [];
  confiCon:boolean = false;
  confiEmai:boolean = false;
   regex:  RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?<,>.\/-]).{8,}$/;
   correoVal: RegExp =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  contrasena:string=""
  confirmarContrasena:string = "";
  estadoContrasena : boolean = false;
  estadoEmail : boolean = false;
  confirmEmailAlert= false;
  confirmEmailAlertInstruc= false;
  confirmPaswordAlert = false;
  alertcorreo = false;
  alertConfirCorre = false;

  correo:string = "";
  confirmarCorreo = "";
  estadoCorreo:boolean= false;
  breadCrumbItems: Array<{}>;
  @ViewChild("name") name: ElementRef;
  @ViewChild("lastname_father") lastname_father: ElementRef; 
  @ViewChild("lastname_mother") lastname_mother: ElementRef; 
  @ViewChild("photo") photo: ElementRef;
  @ViewChild("birthday") birthday: ElementRef;
  @ViewChild("curp") curp: ElementRef;
  @ViewChild("bio") bio: ElementRef;
  @ViewChild("home_phone") home_phone: ElementRef;
  @ViewChild("cellphone") cellphone: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("emailConfir") emailConfir: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;
  @ViewChild("facebook") facebook: ElementRef; 
  @ViewChild("blood_type") blood_type: ElementRef; 
  @ViewChild("affliction") affliction: ElementRef;   
  @ViewChild("drug_allergies") drug_allergies: ElementRef;   
  @ViewChild("other_allergies") other_allergies: ElementRef;  
  @ViewChild("nocturnal_disorders") nocturnal_disorders: ElementRef;
  @ViewChild("phobias") phobias: ElementRef;
  @ViewChild("phobias") drugs: ElementRef; 
  @ViewChild("prohibited_foods") prohibited_foods: ElementRef; 
  @ViewChild("contact_name") contact_name: ElementRef; 
  @ViewChild("contact_relation") contact_relation: ElementRef; 
  @ViewChild("contact_cellphone") contact_cellphone: ElementRef;  
  @ViewChild("contact_homephone") contact_homephone: ElementRef; 

  filetemp:any ={};
  cvSatus= false;

  photoSatus = false;



  constructor(private catalogos: CamperService, private formGrup: FormBuilder, private router: Router,private staff: StaffService,private modalService: NgbModal,private render :Renderer2) { }

  ngOnInit(): void {
    this.formUser = this.formGrup.group({
    //  password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
    //  confirmPassword: ['', [Validators.required]],
   //   email: ['', [Validators.required, Validators.email]],
   //   confirmEmail: ['', [Validators.required,Validators.email]],
      name: ["", [Validators.required]],
      lastname_father: ["", [Validators.required]],
      lastname_mother: ["",],
      photo: ["",[Validators.required]],
      birthday: ["",[Validators.required]], //fecha de nacimiento
      curp: ["",[Validators.required]],
      bio: ["", [Validators.required]], // biografia
      facebook: ["", [Validators.required]],
      home_phone: ["", [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      cellphone: ["", [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(8)]],
      cv: ["", [Validators.required]],
      gender_id:[0],

      login_id:[0],
      coordinator:[false],
      terms: ["", [Validators.required, Validators.requiredTrue]],
    })
  }

  getphoto() {
    if(this.formUser.get('photo').valid){
      this.photoSatus = true;
    }else{
     // this.photo.nativeElement.focus();
      console.log('ere');
      const element:any = document.getElementById("photo");
      element.scrollIntoViewIfNeeded();

      this.photoSatus= false;
    }
     
  }
  getCv() {
    if(this.formUser.get('cv').valid){
     this.cvSatus = true;
    }else{
     // this.photo.nativeElement.focus();
      console.log('ere');
      const element:any = document.getElementById("cv");
      element.scrollIntoViewIfNeeded();

    //  this.photoSatus= false;
    }
     
  }
  subiendo(event: any) {
    const archivo = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.photoSelect = reader.result;
      reader.readAsDataURL(archivo);

      const formulario = new FormData();
      formulario.append('file',archivo)
      this.catalogos.setPhoto(formulario).subscribe((res: any) => {
        console.log(res.path);
        this.photoSatus = true;
        this.formUser.patchValue({
          photo: res.path
        })
      },
        error => {
          console.log(error);
          this.photoSatus = false;

        })
    }
  }

  prueba1(){
    this.spinner=true;
  
   // console.log(this.formUser.value);
    let a = {
      "user": {
        email:this.formUser.get('email').value,
        passw: this.formUser.get('password').value,
        role_id: 2,
        is_coordinator: false,
        is_admin: false,
        is_employee: false,
        is_superuser:false
      },
      "prospect":this.formUser.value
      
    }
    if(this.formUser.valid){
      this.staff.prospectos(a).subscribe((res:any)=>{
        console.log(res);
        
        this.spinner=false;
        this.centerModal();
        this.formUser.reset();
        this.contrasena="";
        this.correo="";
        this.confirmarCorreo="";
        this.confirmarContrasena=""
        this.estadoCorreo=false;
        this.estadoContrasena=false;
        this.router.navigate(['/login']);

      },error=>{
        this.erroA=true;
        this.spinner=false;

        setTimeout(() => {
          this.erroA=false;
          
        }, 10000);
      })

    }else{
      this.spinner=false;
      this.validateFace();
      this.validatecellphone();
      this.validatehome_phone();
      this.getCv();
      this.validatebio();
      this.getphoto();
      this.validatebirthday();
      this.validatecurp();
      this.validatelastname_mother();
      this.validatelastname_father();
      this.validateName();
     
   

    }
    
  
    
   
  }

  centerModal(centerDataModal: any = this.content) {
    console.log(this.centerModal);
    
    this.modalService.open(centerDataModal, { centered: true });
  }

 

 
  validateName(): void {
    this.validateFormField(this.name,'name');
  }
  
  validatelastname_father(): void {
    this.validateFormField(this.lastname_father,'lastname_father');
  }
  validatelastname_mother(): void {
    this.validateFormField(this.lastname_mother,'lastname_mother');
  }
  
  validatephoto(): void {
    this.validateFormField(this.photo,'photo');
  }
  
  validatebirthday(): void {
    this.validateFormField(this.birthday,'birthday');
  }
  
  validatecurp(): void {
    this.validateFormField(this.curp,'curp');
  }
  
  validatebio(): void {
    this.validateFormField(this.bio,'bio');
  }
  
  validatehome_phone(): void {
    this.validateFormField(this.home_phone,'home_phone');
  }
  
  validatecellphone(): void {
    this.validateFormField(this.cellphone,'cellphone');
  }
  validateFace(): void {
    this.validateFormField(this.facebook,'facebook');
  }
  getdrug_allergies() {
    if( this.formUser.get('drug_allergies').valid){
      this.render.removeClass(this.drug_allergies.nativeElement,"is-invalid");
      this.render.addClass(this.drug_allergies.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.drug_allergies.nativeElement,"is-valid");
    this.render.addClass(this.drug_allergies.nativeElement,"is-invalid");
    this.drug_allergies.nativeElement.focus()

   }
  
  }
  getother_allergies() {
    if( this.formUser.get('other_allergies').valid){
      this.render.removeClass(this.other_allergies.nativeElement,"is-invalid");
      this.render.addClass(this.other_allergies.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.other_allergies.nativeElement,"is-valid");
    this.render.addClass(this.other_allergies.nativeElement,"is-invalid");
    this.other_allergies.nativeElement.focus()

   }
  }
  
  getnocturnal_disorders() {
    if( this.formUser.get('nocturnal_disorders').valid){
      this.render.removeClass(this.nocturnal_disorders.nativeElement,"is-invalid");
      this.render.addClass(this.nocturnal_disorders.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.nocturnal_disorders.nativeElement,"is-valid");
    this.render.addClass(this.nocturnal_disorders.nativeElement,"is-invalid");
    this.nocturnal_disorders.nativeElement.focus()

   }
  }
  getphobias() {
    if( this.formUser.get('phobias').valid){
      this.render.removeClass(this.phobias.nativeElement,"is-invalid");
      this.render.addClass(this.phobias.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.phobias.nativeElement,"is-valid");
    this.render.addClass(this.phobias.nativeElement,"is-invalid");
    this.phobias.nativeElement.focus()

   }
  }
  
 
  validateFormField(elementRef: any,name): void {
    if (this.formUser.get(name).valid) {
      this.render.removeClass(elementRef.nativeElement, "is-invalid");
      this.render.addClass(elementRef.nativeElement, "is-valid");
    } else {
      this.render.removeClass(elementRef.nativeElement, "is-valid");
      this.render.addClass(elementRef.nativeElement, "is-invalid");
      elementRef.nativeElement.focus();
    }
  }
  getblood_type() {
    if( this.formUser.get('blood_type').valid){
      this.render.removeClass(this.blood_type.nativeElement,"is-invalid");
      this.render.addClass(this.blood_type.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.blood_type.nativeElement,"is-valid");
    this.render.addClass(this.blood_type.nativeElement,"is-invalid");
    this.blood_type.nativeElement.focus()

   }
  }
  getaffliction() {
    if( this.formUser.get('affliction').valid){
      this.render.removeClass(this.affliction.nativeElement,"is-invalid");
      this.render.addClass(this.affliction.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.affliction.nativeElement,"is-valid");
    this.render.addClass(this.affliction.nativeElement,"is-invalid");
    this.affliction.nativeElement.focus()

   }
  }
  getdrugs() {
    if( this.formUser.get('drugs').valid){
      this.render.removeClass(this.drugs.nativeElement,"is-invalid");
      this.render.addClass(this.drugs.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.drugs.nativeElement,"is-valid");
    this.render.addClass(this.drugs.nativeElement,"is-invalid");
    this.drugs.nativeElement.focus()

   }
  }
  getprohibited_foods() {
    if( this.formUser.get('prohibited_foods').valid){
      this.render.removeClass(this.prohibited_foods.nativeElement,"is-invalid");
      this.render.addClass(this.prohibited_foods.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.prohibited_foods.nativeElement,"is-valid");
    this.render.addClass(this.prohibited_foods.nativeElement,"is-invalid");
    this.prohibited_foods.nativeElement.focus()

   }
   
  }
  getcontact_cellphone() {
    if( this.formUser.get('contact_cellphone').valid){
      this.render.removeClass(this.contact_cellphone.nativeElement,"is-invalid");
      this.render.addClass(this.contact_cellphone.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_cellphone.nativeElement,"is-valid");
    this.render.addClass(this.contact_cellphone.nativeElement,"is-invalid");
    this.contact_cellphone.nativeElement.focus()

   }
  }
  getcontact_name(){
    if( this.formUser.get('contact_name').valid){
      this.render.removeClass(this.contact_name.nativeElement,"is-invalid");
        this.render.addClass(this.contact_name.nativeElement,"is-valid");
     }else{
      this.render.removeClass(this.contact_name.nativeElement,"is-valid");
      this.render.addClass(this.contact_name.nativeElement,"is-invalid");
      this.contact_name.nativeElement.focus()

     }
  }

  subiendoPdf(event: any) {
    this.spinerPhot = false;

    const [file] = event.target.files;
    this.filetemp = {
      fileRow:file,
      fileName: file.name
    }
    const formulario = new FormData();
      formulario.append('file',file)
      this.catalogos.setpdf(formulario).subscribe((res: any) => {
        console.log(res);
        this.cvSatus = true;
        this.formUser.patchValue({
          cv: res
        })
      },
        error => {
          this.cvSatus = false;
          console.log(error)
        })

    
  }
  vaccinesValu(i:any){
    this.vaccines[i].is_active =! this.vaccines[i].is_active;
  }
  food_restrictionsValu(i:any){
    this.food_restrictions[i].is_active =! this.food_restrictions[i].is_active;
  }

  getcontact_relation() {
    if( this.formUser.get('contact_relation').valid){
      this.render.removeClass(this.contact_relation.nativeElement,"is-invalid");
      this.render.addClass(this.contact_relation.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_relation.nativeElement,"is-valid");
    this.render.addClass(this.contact_relation.nativeElement,"is-invalid");
    this.contact_relation.nativeElement.focus()

   }
  }
  getcontact_homephone() {
    if( this.formUser.get('contact_homephone').valid){
      this.render.removeClass(this.contact_homephone.nativeElement,"is-invalid");
      this.render.addClass(this.contact_homephone.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_homephone.nativeElement,"is-valid");
    this.render.addClass(this.contact_homephone.nativeElement,"is-invalid");
    this.contact_homephone.nativeElement.focus()

   }
  }


}
