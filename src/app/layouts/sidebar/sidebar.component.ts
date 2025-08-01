import { Component, OnInit, AfterViewInit, OnChanges, ElementRef, ViewChild, Input } from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import { EventService } from '../../core/services/event.service';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import jwt_decode from "jwt-decode";
import { LangService } from 'src/services/lang.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef;
  @Input() isCondensed = false;
  @ViewChild('sideMenu') sideMenu: ElementRef;

  paretn = false;
  staff = false;
  school = false;
  catalogos = false;
  admi = false;
  rol_id = 0;
  user_admin = false;
  user_coordinator = false;
  menu: any;
  traducciones = {
    
      "esp": {
        "menu": {
          "registeredCampers": "Mis Campers registrados",
          "myProfile":          "Mi perfil",
          "newCamper":          "Nuevo acampador",
          "faq":                "Preguntas frecuentes",
          "contact":            "Contacto",
          "rules":              "Reglamento",
          "participationAgreement": "Acuerdo de participación",
          "privacyNotice":      "Aviso de privacidad",
          "logout":             "Cerrar sesión"
        }
        /* …otras secciones… */
      },
      "eng": {
        "menu": {
          "registeredCampers": "My Registered Campers",
          "myProfile":          "My Profile",
          "newCamper":          "New Camper",
          "faq":                "Frequently Asked Questions",
          "contact":            "Contact",
          "rules":              "Rules and Regulations",
          "participationAgreement": "Participation Agreement",
          "privacyNotice":      "Privacy Notice",
          "logout":             "Log Out"
        }
      
    }
  }
  
  menuItems = [];
  idioma: string;

  constructor(
    private eventService: EventService,
    private router: Router,
    public translate: TranslateService,
    private http: HttpClient,
    private info: AuthenticationService
    ,private lang:LangService
  ) {
    // Recuperar el token del localStorage y decodificarlo
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.info.infToken = jwt_decode(currentUser);
      this.rol_id = this.info.infToken.role_id;
      console.log(this.rol_id,'ssss');
      
      this.configureRoleBasedVisibility();

      this.info.loggedIn = true;
    } else {
      this.info.infToken = null;
      this.info.loggedIn = false;
    }

    // Configurar la visibilidad de las secciones basadas en el rol del usuario

    // Subscribirse a eventos de navegación para activar el menú dropdown
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });
  }

  ngOnInit() {
    this.lang.getLang().subscribe((res: 'esp'|'eng') => {
      this.idioma = res;
      // Aquí extraemos directamente el bloque 'menu' de nuestro JSON
      this.menu = this.traducciones[this.idioma].menu;
    });
    this.initialize();
    this._scrollElement();
  }

  ngAfterViewInit() {
    this.initializeMetisMenu();
  }

  ngOnChanges() {
    this.initializeMetisMenu();
  }

  initializeMetisMenu() {
    if (this.menu) {
      this.menu.dispose();
    }
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this._activateMenuDropdown();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.info.infToken = null;
    this.info.loggedIn = false;
    this.router.navigate(['login']);
  }

  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  toggleCatalogos() {
    this.catalogos = !this.catalogos;
    this.initializeMetisMenu();
  }

  toggleAdmi() {
    this.admi = !this.admi;
    this.initializeMetisMenu();
  }

  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500) {
          if (this.scrollRef.SimpleBar !== null) {
            this.scrollRef.SimpleBar.getScrollElement().scrollTop = currentPosition + 300;
          }
        }
      }
    }, 300);
  }

  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  _activateMenuDropdown() {
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');
    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]['pathname']);
    }
    const itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/');
      const item = window.location.pathname.substr(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }
    if (menuItemEl) {
      menuItemEl.classList.add('active');
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('mm-active');
        const parent2El = parentEl.parentElement.closest('ul');
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.add('mm-show');
          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== 'side-menu') {
            parent3El.classList.add('mm-active');
            const childAnchor = parent3El.querySelector('.has-arrow');
            const childDropdown = parent3El.querySelector('.has-dropdown');
            if (childAnchor) { childAnchor.classList.add('mm-active'); }
            if (childDropdown) { childDropdown.classList.add('mm-active'); }
            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== 'side-menu') {
              parent4El.classList.add('mm-show');
              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== 'side-menu') {
                parent5El.classList.add('mm-active');
                const childanchor = parent5El.querySelector('.is-parent');
                if (childanchor && parent5El.id !== 'side-menu') { childanchor.classList.add('mm-active'); }
              }
            }
          }
        }
      }
    }
  }

  initialize() {
    // Configurar la visibilidad de las secciones basadas en el rol del usuario
    this.configureRoleBasedVisibility();
  }

  configureRoleBasedVisibility() {
    console.log('token',this.info.infToken.rol_id);
    

    if (!this.info.infToken) {
      this.paretn = false;
      this.staff = false;
    } else if (this.rol_id == 1) {
      this.paretn = true;
      this.staff = false;
      this.school = false;

    } else if (this.rol_id == 2) {
      this.paretn = false;
      this.staff = true;
      this.user_admin = this.info.infToken.user_admin;
      this.user_coordinator = this.info.infToken.user_coordinator;
    } else if(this.rol_id == 3 || this.rol_id == 4 ){
      this.paretn = false;
      this.staff = false;
      this.school = true;
      

    }
  }
}
