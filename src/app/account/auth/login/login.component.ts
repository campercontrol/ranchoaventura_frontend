import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  passwordType= "password"

  // set the currenr year
  year: number = new Date().getFullYear();
  alert: boolean= false;
  closeResult = '';
  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,private modalService: NgbModal,
    private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['aalbertoulises98@gmail.com', [Validators.required, Validators.email]],
      password: ['11654252aA@', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

  
        this.authFackservice.login(this.f.email.value, this.f.password.value).then(
            data => {
              this.router.navigate(['/parents/registered-children']);
            },
            error => {
              console.log(error);
              
              this.alert= true;
            });
      
    
  }
  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  cambioTipo(){
    if(this.passwordType =='password'){
      this.passwordType = 'text';
      
    }else{
      this.passwordType = 'password';

    }
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}


 

  link(){
    this.modalService.dismissAll();
    this.router.navigate(['parents/new-user'])
  }
}
