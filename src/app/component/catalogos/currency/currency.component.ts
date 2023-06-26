import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaCapacitacionesComponent } from 'src/app/staff/lista-capacitaciones/lista-capacitaciones.component';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

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
      symbol: ['', Validators.required],
      acronyms: ['', Validators.required],
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
    this.catalogos.getcurrency().subscribe((res: any) => {
      this.listcatalogos = res.data;
    });
  }

  guardar() {
    this.catalogos.postcurrency(this.formFood.value).subscribe((res: any) => {
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
      name: '',
      symbol: '', 
      acronyms: '', 
      created_at: this.date

    })
  }

  update(item){
    console.log(item);
    
    this.showDialog2();
    this.updateId = item.id;
    this.formFood.patchValue({
      name: item.name,
      symbol: item.symbol,
      acronyms: item.acronyms,
      created_at: this.date

    })
  
    
  }

  keepUpdate(){
    this.catalogos.updatcurrency(this.formFood.value,this.updateId).subscribe((res: any) => {
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
    this.TextElimint='Deseas Eliminar '+ name + '  del catalogo';
    this.display3 = true; 
   
  }

  delet(){
    this.catalogos.delecurrency(this.idDalete).subscribe((res: any) => {
      this.statuAgrgado = true;
      this.resteValu();
      this.getCatalogos();
      setTimeout(() => {
        this.statuAgrgado = false;
        this.closeModal3();
      }, 1000);

    }, error => {
      alert('No se pudo Eliminar')
    })
  }
  
}
