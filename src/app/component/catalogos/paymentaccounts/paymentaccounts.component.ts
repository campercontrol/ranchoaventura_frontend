import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaCapacitacionesComponent } from 'src/app/staff/lista-capacitaciones/lista-capacitaciones.component';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-paymentaccounts',
  templateUrl: './paymentaccounts.component.html',
  styleUrls: ['./paymentaccounts.component.scss']
})
export class PaymentaccountsComponent implements OnInit {



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
  selectedCities: string[] = [];
  constructor(private catalogos: CatalogosService, private _FormBuild: FormBuilder) {
    this.getCatalogos()
  }

  ngOnInit(): void {
    this.formFood = this._FormBuild.group({
      name: ['', Validators.required],
      bank: ['', Validators.required],
      account_number: ['', Validators.required],
      clabe_number : ['', Validators.required],
      created_at: [this.date, Validators.required]
    })
  }


  showDialog() {
    this.display = true;
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
    this.catalogos.getpaymentaccounts().subscribe((res: any) => {
      this.listcatalogos = res.data;
      this.listcatalogos.map((item: any) => {
        item.assigned_id = this.cat[item.assigned_id.toString()];
      })
      console.log(this.listcatalogos);
    });
   
    
  }

  guardar() {
    this.catalogos.postpaymentaccounts(this.formFood.value).subscribe((res: any) => {
      this.getCatalogos();
      this.statuAgrgado = true;
      this.resteValu();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal();
      }, 1000);

    }, error => {
      alert('No se pudo Agregar')
    })

  }

  resteValu() {
    this.formFood.reset();
    this.formFood.patchValue({
      created_at: this.date
    })
  }

  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.formFood.patchValue({
      name: item.name,
      bank: item.bank,
      account_number: item.account_number,
      clabe_number: item.clabe_number,
      created_at: this.date

    })
  
    
  }

  keepUpdate(){
    this.catalogos.updatpaymentaccounts(this.formFood.value,this.updateId).subscribe((res: any) => {
     console.log(res);
     
      this.getCatalogos();
      this.statuAgrgado = true;
      this.resteValu();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal2();
      }, 1000);

    }, error => {
      console.log(error);
      
      alert('No se pudo Agregar')
    })
  }


  deletModal(name,id){
    this.idDalete= id;
   // console.log(id);
    
    this.TextElimint='Deseas Eliminar '+ name + '  del catalogo';
    this.display3 = true; 
   
  }

  delet(){
    console.log(this.idDalete,'ss');
    
    this.catalogos.delepaymentaccounts(this.idDalete).subscribe((res: any) => {
      if(res.detail.status != 1){

      this.statuAgrgado = true;
      this.resteValu();
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);
    }else{
      alert('No se pudo Eliminar debido que esta en uso')

    }
    }, error => {
      alert('No se pudo Eliminar')
    })
  }
  

}
