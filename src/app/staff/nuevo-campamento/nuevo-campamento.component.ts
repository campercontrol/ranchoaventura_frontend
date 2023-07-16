import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateCampsService } from 'src/services/create-camps.service';

@Component({
  selector: 'app-nuevo-campamento',
  templateUrl: './nuevo-campamento.component.html',
  styleUrls: ['./nuevo-campamento.component.scss']
})
export class NuevoCampamentoComponent implements OnInit {

  location:any = [];
  temporada:any = [];
  school:any = [];
  public formCamp!:FormGroup;
  currency:any = [];
  spinner:boolean = false;


  constructor(private createCamp: CreateCampsService, private formGrup: FormBuilder) {
 
    
   }
  breadCrumbItems: Array<{}>;
  selectedCities: string[] = [];


 public Editor = ClassicEditor;
  ngOnInit(): void {
       
    this.createCamp.getSede().subscribe((res:any)=>{
      this.location = res.data;
      //console.log(this.location);

     });
     this.createCamp.getTemporada().subscribe((res:any)=>{
      this.temporada = res.data;
      //console.log(this.location);

     });
     this.createCamp.getcurrency().subscribe((res:any)=>{
      this.currency = res.data;
      //console.log(this.location);

     });
     this.createCamp.gerSchool().subscribe((res:any)=>{
      this.school = res.data;
      //console.log(this.location);

     });
    this.formCamp = this.formGrup.group({
      name: ["",[Validators.required]], //listo
      start: ["",[Validators.required]], //listo
      end:  ["",[Validators.required]], //listo
      start_registration: ["",[Validators.required]], //listo
      end_registration:["",[Validators.required]], //listo
      registration: [false,[Validators.required]], //listo insurance
      url: [""], //listo
      special_message: ["",[Validators.required]],
      special_message_admin: ["",[Validators.required]],
      public_price:  [0,[Validators.required]], // listo 
      show_payment_parent:  [false,[Validators.required]], //listo
      show_rebate_parent:  [false,[Validators.required]],//listo
      show_paypal_button:  [false,[Validators.required]],// listo
      paypal_button:  ["string"],//listo
      show_payment_order:  [false,[Validators.required]],
      reminder_camp_days:  [15],//listo
      reminder_discount_days:  [15],//listo
      insurance:  [0,[Validators.required]], // listo
      venue:  ["",[Validators.required]], // listo 
      photo_url:  ["",[Validators.required]], // listo
      photo_password:  ["",[Validators.required]], // listo
      medical_report:  ["",[Validators.required]],//listo
      occupancy_camp:  [0,[Validators.required]],
      active:  [true,[Validators.required]], //listo
      general_camp:  [true,[Validators.required]], //listo
      currency_id: [0,[Validators.required,Validators.minLength(1)]],// listo
      location_id:  [0,[Validators.required,Validators.minLength(1)]], //listo
      school_id:  [0,[Validators.required,Validators.minLength(1)]], // listo
      season_id:  [0,[Validators.required,Validators.minLength(1)]], // listo
    })
  }

  createCampPost(){
    console.log(this.formCamp.value);
    
    this.createCamp.postCamp(this.formCamp.value).subscribe((res:any)=>{
      console.log(res);
      
    },error=>{
      console.log(error);
      
    })
  }

}
