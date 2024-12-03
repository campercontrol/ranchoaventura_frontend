import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/services/lang.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  cookieValue;
  flagvalue:any;
  countryName;
  valueset;
  rol_id;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService,private  lang: LangService,    private info: AuthenticationService,
              
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService) {
                lang.getLang().subscribe((res)=>{
                  console.log('idioma',res[0]);
                  
                })
                const currentUser = localStorage.getItem('currentUser');
                if (currentUser) {
                  this.info.infToken = jwt_decode(currentUser);
                  this.rol_id = this.info.infToken.role_id;
                  console.log(this.rol_id,'ssss');
                  
            
                  this.info.loggedIn = true;
                } else {
                  this.info.infToken = null;
                  this.info.loggedIn = false;
                }
            
               
  }


  


  listLang = [
    {id:1, text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'eng' },
    {id:2, text: 'Spanish', flag: 'assets/images/flags/mex.jpg', lang: 'esp' },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;
    this.lang.getLang().subscribe((res:any)=>{
      console.log(res,'respuesta de idioma');
      
      let a:any = this.listLang.filter((item:any)=>{
        return item.lang == res;
      })
      console.log(a,'ifnormacion');
      
      this.countryName = a[0].text;
      this.flagvalue = a[0].flag;
      this.cookieValue = a[0].lang;
     // this._cookiesService.set('lang', lang);
      
    })

  }

redirigir(){
  if(this.rol_id  == 2){
    this.router.navigate(['dashboard/staff']);
    //console.log(this.authenticationService.infToken);

  }else if(this.rol_id  == 3 || this.rol_id  == 4 ){
    this.router.navigate(['dashboard/school/upcoming_camps']);
   // console.log(this.authenticationService.infToken);
    
  }else if(this.rol_id  == 1 ){
    this.router.navigate(['dashboard/parents']);
//console.log(this.authenticationService.infToken);
  }else{
    this.router.navigate(['dashboard/medical/camps']);
//console.log(this.authenticationService.infToken);
  }
}

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
   // this._cookiesService.set('lang', lang);
    this.lang.setLang(lang)
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
 

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
