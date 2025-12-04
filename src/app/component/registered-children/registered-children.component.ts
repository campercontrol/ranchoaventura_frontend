import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Usergrid } from '../../pages/contacts/usergrid/usergrid.model';

import { userGridData } from './data';
import { CamperService } from 'src/services/camper.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import traducciones  from 'src/assets/json/lengua.json';
import { LangService } from 'src/services/lang.service';


@Component({
  selector: 'app-registered-children',
  templateUrl: './registered-children.component.html',
  styleUrls: ['./registered-children.component.scss']
})
export class RegisteredChildrenComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  modalVista :boolean= true;
  userGridData:any=[];
  selected;
  userForm: FormGroup;
  submitted = false;
  hijosRes:any=[];
  items: FormArray;
  public texto = {
    esp: {
      nuevoAcampador:    'Nuevo acampador',
      saldoPendiente:    'Tienes un saldo pendiente de :',
      balancesPorMoneda: 'Balances por Moneda:',
      cardBotton:        'Inscribir',
      editarInformacion: 'Editar información',
      perfil:            'Perfil',
      inscribir:         'Inscribir',
      noTienesCampers:   '¡No tienes campers registrados!',
      porFavorRegistra:  'Por favor, registra un camper para comenzar.',
      registrarCamper:   'Registrar Camper'
    },
    eng: {
      nuevoAcampador:    'New camper',
      saldoPendiente:    'You have a pending balance of:',
      balancesPorMoneda: 'Balances by Currency:',
      cardBotton:        'Enroll',
      editarInformacion: 'Edit information',
      perfil:            'Profile',
      inscribir:         'Enroll',
      noTienesCampers:   "You don't have any registered campers!",
      porFavorRegistra:  'Please register a camper to get started.',
      registrarCamper:   'Register Camper'
    }
  };
  
  
  cargando= false;
  // Select2 Dropdown
  selectValue: string[];
  idioma = 'esp'
  textos = {};
totalGeneralBalance: { [key: string]: number } = {}; // Totales por moneda para todos los campers
total: number = 0;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,private hijos:CamperService, private router:Router,private info: AuthenticationService,private lang :LangService) { 
    this.hijos.getHijos(this.info.infToken.profile_id).subscribe((res: any) => {
      console.log(res);
      this.hijosRes = res.campers.map((hijo: any) => {
        hijo.camper_balance_update = 0;
        hijo.currencyBalances = {}; // Balance por moneda para cada camper
    
        // Concatenar camps y due_past_camps
        const allCamps = [...(hijo.camps || []), ...(hijo.due_past_camps || [])];
    
        allCamps.forEach((camp: any) => {
          if (camp.show_payment_parent) {
            const currencyKey = camp.currency_acronyms;
            const balance = camp.camper_payment_balance;
    
            hijo.camper_balance_update += balance;
    
            // Sumar al balance por moneda
            if (!hijo.currencyBalances[currencyKey]) {
              hijo.currencyBalances[currencyKey] = 0;
            }
            hijo.currencyBalances[currencyKey] += balance;
          }
        });
    
        return hijo;
      });
    
      // Calcular balances totales generales por moneda
      this.totalGeneralBalance = this.hijosRes.reduce((acc: { [key: string]: number }, hijo: any) => {
        Object.entries(hijo.currencyBalances || {}).forEach(([currency, balance]) => {
          if (!acc[currency]) {
            acc[currency] = 0;
          }
          acc[currency] += Number(balance);  // Convertimos 'balance' a número
        });
        return acc;
      }, {});
    
      this.total = Object.values(this.totalGeneralBalance).reduce((acc: number, balance: number) => acc + balance, 0);
      this.cargando = true;
      this.checkImagesOrientation();

    });
    
    
     
    
  }

  ngOnInit() {
    this.lang.getLang().subscribe((res:any)=>{
      this.idioma=res
      console.log(this.idioma);
      this.textos = this.texto[this.idioma];

      
     })

    this.selectValue = ['Photoshop', 'illustrator', 'Html', 'Css', 'Php', 'Java', 'Python'];

    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users Grid', active: true }];
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });
    /**
     * fetches data
     */
    this._fetchData();
  }

  get form() {
    return this.userForm.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
 

  /**
   * User grid data fetches
   */
  private _fetchData() {
    this.userGridData = userGridData;
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'xl', centered: true });
  }

  /**
   * Save user
   */
  saveUser() {
    if (this.userForm.valid) {
      const name = this.userForm.get('name').value;
      const email = this.userForm.get('email').value;
      const designation = this.userForm.get('designation').value;
       this.userGridData.push({
         id: this.userGridData.length + 1,
         name,
         email,
         designation,
         projects: this.selected
       })
       this.modalService.dismissAll()
    }
    this.submitted = true
  }
  rotarSiHorizontal(imageUrl: string, imgElement: HTMLImageElement) {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // Detectar si la imagen es horizontal (ancho > alto)
      if (img.width > img.height) {
        // Si es horizontal, aplicamos rotación de 90 grados con CSS
        imgElement.style.transform = 'rotate(90deg)';
        imgElement.style.transition = 'transform 0.3s ease'; // Transición suave para rotar
      } else {
        // Si es vertical, no aplicamos ningún estilo de rotación
        imgElement.style.transform = 'none';
      }
    };

    img.onerror = () => {
      console.error('No se pudo cargar la imagen');
    };
  }
  status(){
     this.modalVista= !this.modalVista
  }
  redirect(camp,camper){
    this.router.navigate(['dashboard/parents/camp-info/'+camper+'/'+camp])

  }
  redirectPerfil(camp){
    this.router.navigate(['dashboard/parents/camper/'+camp])

  }
  checkImagesOrientation() {
    this.hijosRes.camperList.forEach(camper => {
      const img = new Image();
      img.src = 'https://api.ranchoaventuramexico.com/' + camper.photo;

      img.onload = () => {
        // Detectar si la imagen es horizontal (ancho > alto)
        camper.isImageHorizontal = img.width > img.height;
      };

      img.onerror = () => {
        console.error('No se pudo cargar la imagen');
      };
    });
  }
  

}
