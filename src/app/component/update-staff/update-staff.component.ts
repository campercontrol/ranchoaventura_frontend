import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
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
  @ViewChild("drugs") drugs: ElementRef; 
  @ViewChild("prohibited_foods") prohibited_foods: ElementRef; 
  @ViewChild("contact_name") contact_name: ElementRef; 
  @ViewChild("contact_relation") contact_relation: ElementRef; 
  @ViewChild("contact_cellphone") contact_cellphone: ElementRef;  
  @ViewChild("contact_homephone") contact_homephone: ElementRef; 
  @ViewChild("rfc") rfc: ElementRef; 


  filetemp:any ={};
  cvSatus= true;

  photoSatus = true;



  constructor(private catalogos: CamperService, private formGrup: FormBuilder, private router: Router,private staff: StaffService,private modalService: NgbModal,private render :Renderer2, private info : AuthenticationService) { }

  ngOnInit(): void {
    this.formUser = this.formGrup.group({
      other_allergies: ["", [Validators.required,Validators.minLength(2)]],
      staff_contact_cellphone:["", [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      nocturnal_disorders: ["", [Validators.required,Validators.minLength(2)]],
      "employee_email_send": false,  
      phobias: ["", [Validators.required,Validators.minLength(2)]],
      drugs:["", [Validators.required,Validators.minLength(2)]],
 //     "record_id": 1, // por detras se parsea
      affliction: ["", [Validators.required,Validators.minLength(2)]],
      prohibited_foods: ["", [Validators.required,Validators.minLength(2)]],
      staff_contact_name: ["", [Validators.required,Validators.minLength(2)]],
//      "season_id": 1,   // por detras se parseas  
      blood_type: [0, [Validators.required,Validators.min(1)]],   // sangre 
      staff_contact_relation: ["", [Validators.required,Validators.minLength(2)]],
      drug_allergies: ["", [Validators.required,Validators.minLength(2)]],
      staff_contact_homephone:["", [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(8)]], 
      name: ["", [Validators.required,Validators.minLength(2)]],
      rfc: ["", [Validators.required,Validators.minLength(2)]],
      lastname_father: ["", [Validators.required]],
      lastname_mother: [""],
      photo: ["",[Validators.required]],
      birthday: ["",[Validators.required]], //fecha de nacimiento
      curp: ["",[Validators.required]],
      bio: ["", [Validators.required]], // biografia
      facebook: ["", [Validators.required]],
      home_phone: ["", [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      cellphone: ["", [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(8)]],
      cv: [""],
      gender_id:[0],
      employee:[true],

      
     
      terms: ["", [Validators.required, Validators.requiredTrue]],
    })
    this.getPerfil();
   
  }

  getPerfil(){
    
    
    this.staff.infoPerfil(this.info.infToken.profile_id).subscribe((res:any)=>{
      console.log(res);
      this.vaccines = res.vaccines;
      this.food_restrictions = res.food_restrictions;
      this.blood_types = res.blood_types;
      let staff = res.staff
        this.photoSelect = 'http://142.93.12.234:8000/'+staff.photo;
        console.log(this.photoSelect);
        
        this.formUser.patchValue({
          other_allergies: staff.other_allergies,
          staff_contact_cellphone:staff.staff_contact_cellphone,
          nocturnal_disorders: staff.nocturnal_disorders,
     
          phobias:staff.phobias,
          drugs:staff.drugs,
       
          affliction:staff.affliction,
          prohibited_foods:staff.prohibited_foods,
          staff_contact_name: staff.staff_contact_name,
         // por detras se parseas  
          blood_type:staff.blood_type,// sangre 
          staff_contact_relation: staff.staff_contact_relation,
          drug_allergies: staff.drug_allergies,
          staff_contact_homephone:staff.staff_contact_homephone, 
          name: staff.name,
          rfc: staff.rfc,
          lastname_father:staff.lastname_father,
          lastname_mother: staff.lastname_mother,
          photo: staff.photo,
          birthday: staff.birthday,//fecha de nacimiento
          curp:staff.curp,
          bio: staff.bio,// biografia
          facebook: staff.facebook,
          home_phone:staff.home_phone,
          cellphone:staff.cellphone,
          cv:staff.cv,
          gender_id:staff.gender_id,
          employee:staff.employee,        
          

        })
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
      this.cvSatus = false;

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
      "staff":this.formUser.value,
      "vaccines":this.vaccines,
      "food_restrictions":this.food_restrictions
      
    }
    if(this.formUser.valid){
      this.staff.editStaff(a,this.info.infToken.profile_id).subscribe((res:any)=>{
        this.spinner = false;
        console.log(res);
        
        
        this.centerModal( )
       

      },error=>{
        this.erroA=true;
        this.spinner=false;

        setTimeout(() => {
          this.erroA=false;
          
        }, 10000);
      })

    }else{
      this.spinner=false;
      console.log(this.formUser.validator);
      
      this.getcontact_homephone();
      this.getcontact_cellphone();
      this.getcontact_relation();
      this.getcontact_name();
      this.getprohibited_foods();
      this.getdrugs();
      this.getphobias();
      this.getnocturnal_disorders();
      this.getother_allergies();
      this.getdrug_allergies();
      this.getaffliction();
      this.getblood_type();
      this.validateFace();
      this.validatecellphone();
      this.validatehome_phone();
      this.getCv();
      this.validatebio();
      this.getphoto();
      this.validatebirthday();
      this.validatelastRFC();
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

  validatelastRFC(): void {
    this.validateFormField(this.rfc,'rfc');
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
    if( this.formUser.get('staff_contact_cellphone').valid){
      this.render.removeClass(this.contact_cellphone.nativeElement,"is-invalid");
      this.render.addClass(this.contact_cellphone.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_cellphone.nativeElement,"is-valid");
    this.render.addClass(this.contact_cellphone.nativeElement,"is-invalid");
    this.contact_cellphone.nativeElement.focus()

   }
  }
  getcontact_name(){
    if( this.formUser.get('staff_contact_name').valid){
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
    if( this.formUser.get('staff_contact_relation').valid){
      this.render.removeClass(this.contact_relation.nativeElement,"is-invalid");
      this.render.addClass(this.contact_relation.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_relation.nativeElement,"is-valid");
    this.render.addClass(this.contact_relation.nativeElement,"is-invalid");
    this.contact_relation.nativeElement.focus()

   }
  }
  getcontact_homephone() {
    if( this.formUser.get('staff_contact_homephone').valid){
      this.render.removeClass(this.contact_homephone.nativeElement,"is-invalid");
      this.render.addClass(this.contact_homephone.nativeElement,"is-valid");
   }else{
    this.render.removeClass(this.contact_homephone.nativeElement,"is-valid");
    this.render.addClass(this.contact_homephone.nativeElement,"is-invalid");
    this.contact_homephone.nativeElement.focus()

   }
  }



}
