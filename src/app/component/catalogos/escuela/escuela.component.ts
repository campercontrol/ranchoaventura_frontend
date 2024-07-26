import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styleUrls: ['./escuela.component.scss']
})
export class EscuelaComponent implements OnInit {
  @ViewChild('address')address:ElementRef;
  @ViewChild('name')name:ElementRef;
  @ViewChild('url')url:ElementRef;
  @ViewChild('contact')contact:ElementRef;
  @ViewChild('phone')phone:ElementRef;
  @ViewChild('cellphone')cellphone:ElementRef;
  @ViewChild('email')email:ElementRef;
  @ViewChild('contact_second_name')contact_second_name:ElementRef;
  @ViewChild('contact_second_phone')contact_second_phone:ElementRef;
  @ViewChild('contact_second_cellphone')contact_second_cellphone:ElementRef;
  @ViewChild('contact_second_email')contact_second_email:ElementRef;
  @ViewChild('contact_third_name')contact_third_name:ElementRef;
  @ViewChild('contact_third_phone')contact_third_phone:ElementRef;
  @ViewChild('contact_third_cellphone')contact_third_cellphone:ElementRef;
  @ViewChild('contact_third_email')contact_third_email:ElementRef;

  @ViewChild('addressU')addressU:ElementRef;
  @ViewChild('nameU')nameU:ElementRef;
  @ViewChild('urlU')urlU:ElementRef;
  @ViewChild('contactU')contactU:ElementRef;
  @ViewChild('phoneU')phoneU:ElementRef;
  @ViewChild('cellphoneU')cellphoneU:ElementRef;
  @ViewChild('emailU')emailU:ElementRef;
  @ViewChild('contact_second_nameU')contact_second_nameU:ElementRef;
  @ViewChild('contact_second_phoneU')contact_second_phoneU:ElementRef;
  @ViewChild('contact_second_cellphoneU')contact_second_cellphoneU:ElementRef;
  @ViewChild('contact_second_emailU')contact_second_emailU:ElementRef;
  @ViewChild('contact_third_nameU')contact_third_nameU:ElementRef;
  @ViewChild('contact_third_phoneU')contact_third_phoneU:ElementRef;
  @ViewChild('contact_third_cellphoneU')contact_third_cellphoneU:ElementRef;
  @ViewChild('contact_third_emailU')contact_third_emailU:ElementRef;




  listcatalogos: any = [];
  selectCatalogos: any;
  items: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  idDalete =0;
  updateId= 0;
  text: any;
  TextElimint="";
  formFood: FormGroup;
  date: Date = new Date();
  statuAgrgado = false;
  cat: any = {
    '0': 'ninguno',
    '1': 'Staff',
    '2': 'Acampador',
    '3': 'Staff y Acampador'
  }
  capa = {
    name: ''
  }
  breadCrumbItems: Array<{}>;
  selectedCities: any[] = [];
  constructor(private catalogos: CatalogosService, private _FormBuild: FormBuilder,private render:Renderer2) {
    this.getCatalogos()
  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
  name:  ['', [Validators.required,Validators.minLength(2)]],
  password:  ['', [Validators.required,Validators.minLength(2)]],
  email:  ['', [Validators.required,Validators.email]],

  address:[''],
  url: [''],
  contact: [''],
  phone: [''],
  cellphone: [''],
  contact_second_name: ['' ],
  contact_second_phone: ['' ],
  contact_second_cellphone:['' ],
  contact_second_email:['' ],
  contact_third_name: ['' ],
  contact_third_phone:['' ],
  contact_third_cellphone: ['' ],
  contact_third_email: ['' ],
  verify: [true],
  active: [true],
    })
  }


  showDialog() {
    this.display = true;
    this.resetInput();
  }
  showDialog2() {
    this.display2 = true;
  }
  closeModal() {
    this.display = false;

  }

  closeModal3() {
    this.display3 = false;

  }
  closeModal2() {
    this.display2 = false;
    this.resteValu();

  }

  getCatalogos() {
    this.catalogos.getSchool().subscribe((res: any) => {
      this.listcatalogos = res.data;
      
      console.log(this.listcatalogos);
    });
   
    
  }

  guardar() {
    if(this.formFood.valid){
      this.catalogos.postSchool(this.formFood.value).subscribe((res: any) => {
        console.log(res);
        
        this.getCatalogos();
        this.statuAgrgado = true;
        this.resteValu();
        this.resetInput();
        setTimeout(() => {
          this.statuAgrgado = false;
          this.closeModal();
        }, 1000);
  
      }, error => {
        alert('No se pudo Agregar')
      })
    }else{
      this.getContact_third_email();
      this.getContact_third_cellphone();
      this.getContact_third_phone();
      this.getContact_third_name();

      this.getContact_second_email();
      this.getContact_second_cellphone();
      this.getContact_second_phone();
      this.getContact_second_name();

      this.getEmail();
      this.getCellphone();
      this.getPhone();
      this.getContact();
      this.getUrl();
      this.getAddress();
      this.getName();






    }
    

  }

  resteValu() {
    this.formFood.reset();
    this.formFood.patchValue({
      "verify":false,
      "active": false
    })
  }
  guardarOrder(){
    let a = []
    this.listcatalogos.forEach((element,index) => {
      a.push({id:element.id,order:index})     
    });
    this.catalogos.order(4,a).subscribe((res: any) => {
      console.log(res);
      
      this.getCatalogos();
      })  
  }

  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.formFood.patchValue({
      name: item.name,
      address:item.address,
  url: item.url,
  contact: item.contact,
  phone: item.phone,
  cellphone: item.cellphone,
  email: item.email,
  contact_second_name:item.contact_second_name,
  contact_second_phone:item.contact_second_phone,
  contact_second_cellphone: item.contact_second_cellphone,
  contact_second_email:item.contact_second_email,
  contact_third_name: item.contact_third_name,
  contact_third_phone:item.contact_third_phone,
  contact_third_cellphone: item.contact_third_cellphone,
  contact_third_email: item.contact_third_email,
  verify: item.verify,
  active: item.active

    })
  this.cargarValidadores();
    
  }

  keepUpdate(){
    if(this.formFood.valid){
      this.catalogos.updateSchool(this.formFood.value,this.updateId).subscribe((res: any) => {
        console.log(res);
        
         this.getCatalogos();
         this.statuAgrgado = true;
         this.resteValu();
         this.resetInput();
         setTimeout(() => {
           this.statuAgrgado = false;
           this.closeModal2();
         }, 1000);
   
       }, error => {
         console.log(error);
         
         alert('No se pudo Agregar')
       })
    }else{
      this.getContact_third_email();
      this.getContact_third_cellphone();
      this.getContact_third_phone();
      this.getContact_third_name();

      this.getContact_second_email();
      this.getContact_second_cellphone();
      this.getContact_second_phone();
      this.getContact_second_name();

      this.getEmail();
      this.getCellphone();
      this.getPhone();
      this.getContact();
      this.getUrl();
      this.getAddress();
      this.getName();
    }
    
  }

  cargarValidadores(){
    this.getContact_third_email();
    this.getContact_third_cellphone();
    this.getContact_third_phone();
    this.getContact_third_name();

    this.getContact_second_email();
    this.getContact_second_cellphone();
    this.getContact_second_phone();
    this.getContact_second_name();

    this.getEmail();
    this.getCellphone();
    this.getPhone();
    this.getContact();
    this.getUrl();
    this.getAddress();
    this.getName();
  }


  deletModal(name,id){
    this.idDalete= id;
   // console.log(id);
    
    this.TextElimint='Deseas Eliminar '+ name + '  del catalogo';
    this.display3 = true; 
   
  }

  delet(){
    console.log(this.idDalete,'aaa');
    
    this.catalogos.deleteSchool(this.idDalete).subscribe((res: any) => {
      if(res.status.status == true){

      this.statuAgrgado = true;
      this.resteValu();
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);
    }else{
      alert('No se pudo Eliminar esta en uso')

    }
    }, error => {
      alert('No se pudo Eliminar')
    })
  }

  validateFormField(elementRef: any,name): void {
    if (this.formFood.get(name).valid) {
      this.render.removeClass(elementRef.nativeElement, "is-invalid");
      this.render.addClass(elementRef.nativeElement, "is-valid");
    } else {
      this.render.removeClass(elementRef.nativeElement, "is-valid");
      this.render.addClass(elementRef.nativeElement, "is-invalid");
      elementRef.nativeElement.focus();
    }
  }

  resetInfo(elementRef: any,name){
    this.render.removeClass(elementRef.nativeElement, "is-invalid");
    this.render.removeClass(elementRef.nativeElement, "is-valid");
  }
  resetInput(){
    this.getContact_third_emailR();
    this.getContact_third_cellphoneR();
    this.getContact_third_phoneR();
    this.getContact_third_nameR();

    this.getContact_second_emailR();
    this.getContact_second_cellphoneR();
    this.getContact_second_phoneR();
    this.getContact_second_nameR();

    this.getEmailR();
    this.getCellphoneR();
    this.getPhoneR();
    this.getContactR();
    this.getUrlR();
    this.getAddressR();
    this.getNameR();
  }
  
  getName(){
    this.validateFormField(this.name,'name')
  }
  getUrl(){
    this.validateFormField(this.url,'url')
  }
  getAddress(){
    this.validateFormField(this.address,'address')
  }
  getContact(){
    this.validateFormField(this.contact,'contact')
  }
  getPhone(){
    this.validateFormField(this.phone,'phone')
  }
  getCellphone(){
    this.validateFormField(this.cellphone,'cellphone')
  }
  getEmail(){
    this.validateFormField(this.email,'email')
  }
  getContact_second_name(){
    this.validateFormField(this.contact_second_name,'contact_second_name')
  }
  getContact_second_phone(){
    this.validateFormField(this.contact_second_phone,'contact_second_phone')
  }
  getContact_second_cellphone(){
    this.validateFormField(this.contact_second_cellphone,'contact_second_cellphone')
  }
  getContact_second_email(){
    this.validateFormField(this.contact_second_email,'contact_second_email')
  }
  getContact_third_name(){
    this.validateFormField(this.contact_third_name,'contact_third_name')
  }
  getContact_third_phone(){
    this.validateFormField(this.contact_third_phone,'contact_third_phone')
  }
  getContact_third_cellphone(){
    this.validateFormField(this.contact_third_cellphone,'contact_third_cellphone')
  }
  getContact_third_email(){
    this.validateFormField(this.contact_third_email,'contact_third_email')
  }


  getNameR(){
    this.resetInfo(this.name,'name')
  }
  getUrlR(){
    this.resetInfo(this.url,'url')
  }
  getAddressR(){
    this.resetInfo(this.address,'address')
  }
  getContactR(){
    this.resetInfo(this.contact,'contact')
  }
  getPhoneR(){
    this.resetInfo(this.phone,'phone')
  }
  getCellphoneR(){
    this.resetInfo(this.cellphone,'cellphone')
  }
  getEmailR(){
    this.resetInfo(this.email,'email')
  }
  getContact_second_nameR(){
    this.resetInfo(this.contact_second_name,'contact_second_name')
  }
  getContact_second_phoneR(){
    this.resetInfo(this.contact_second_phone,'contact_second_phone')
  }
  getContact_second_cellphoneR(){
    this.resetInfo(this.contact_second_cellphone,'contact_second_cellphone')
  }
  getContact_second_emailR(){
    this.resetInfo(this.contact_second_email,'contact_second_email')
  }
  getContact_third_nameR(){
    this.resetInfo(this.contact_third_name,'contact_third_name')
  }
  getContact_third_phoneR(){
    this.resetInfo(this.contact_third_phone,'contact_third_phone')
  }
  getContact_third_cellphoneR(){
    this.resetInfo(this.contact_third_cellphone,'contact_third_cellphone')
  }
  getContact_third_emailR(){
    this.resetInfo(this.contact_third_email,'contact_third_email')
  }

}
