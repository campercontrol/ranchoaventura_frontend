import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Usergrid } from '../../pages/contacts/usergrid/usergrid.model';

import { userGridData } from './data';
import { CamperService } from 'src/services/camper.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

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
  cargando= false;
  // Select2 Dropdown
  selectValue: string[];
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,private hijos:CamperService, private router:Router,private info: AuthenticationService) { 
    this.hijos.getHijos(this.info.infToken.user_id).subscribe(
      (res:any)=>{
        console.log(res);
        this.hijosRes = res.campers;
        this.cargando = true;
      }
    )
  }

  ngOnInit() {
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

  status(){
     this.modalVista= !this.modalVista
  }
  redirect(camp,camper){
    this.router.navigate(['dashboard/parents/camp-info/'+camper+'/'+camp])

  }
  redirectPerfil(camp){
    this.router.navigate(['dashboard/parents/camper/'+camp])

  }

}
