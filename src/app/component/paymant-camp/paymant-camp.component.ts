import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PaymentsService } from 'src/services/payments.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-paymant-camp',
  templateUrl: `./paymant-camp.component.html`,
  styleUrls: ['./paymant-camp.component.css'],
})
export class PaymantCampComponent {
  cards = [
    { amount: 189800.0, title: 'Pagos recibidos', transactions: 98, bgClass: 'green-background', iconClass: 'pi pi-money-bill' },
    { amount: 6500.0, title: 'Depósito Bbva Kin Camp', transactions: 3, bgClass: 'blue-background', iconClass: 'pi pi-building' },
    { amount: 176800.0, title: 'Depósito Bbva Patricia', transactions: 93, bgClass: 'blue-background', iconClass: 'pi pi-building' },
    { amount: 6500.0, title: 'Paypal Patricia', transactions: 2, bgClass: 'blue-background', iconClass: 'pi pi-paypal' },
    { amount: 29, title: 'Registros activos', transactions: '', bgClass: 'orange-background', iconClass: 'pi pi-users' }
  ];
  @ViewChild("content")content:ElementRef;
  info;
  updatePage:FormGroup;
  tiposMovimiento: any;
  tiposPago: any;
  camp =0;
  camper=[]
  showAll = false;
  loading= true;
  showAllCards = false;
  contatorTotal=0;
  transaciones=0;
  pagostipo:any
  constructor(private routesA:ActivatedRoute,private pages: PaymentsService, private formBuild:FormBuilder,private modalService: NgbModal,config: NgbModalConfig, private render:Renderer2 ) {
    this.routesA.params.subscribe((params) => {
      this.camp = params['camp'];
     
  
        console.log('si entro ,informacion del camps');
        
        this.pages.getpage(0,0).subscribe((res)=>{
  
          this.info = res;
          this.tiposPago = this.info.payment_methods;
          this.tiposMovimiento = this.info.transaction_type;
          
          this.pages.getDatosPagosMasivo(this.camp).subscribe((res:any)=>{
            this.camper =res.camper_payments;
            this.cards=res.camp_incomes_per_payment_method
            this.camper.forEach((item:any)=>{ 
              item.payments_info.payments_by_payment_method= this.transformPayments(item.payments_info.payments_by_payment_method);
            })
              this.cards.forEach((element:any) => {
               if(element.payment_method != 'Descuentos'){
                this.contatorTotal+= parseFloat(
                  element.total_amount
                    .replace('$', '')    // quita el símbolo $
                    .replace('MXN', '')  // quita el texto MXN
                    .replace(',', '')    // quita separadores de miles
                    .trim()
                ) || 0;
                this.transaciones= this.transaciones + element.transactions;


               } 
              });
            this.pagostipo =  this.transformCampIncomes(  res.camp_incomes_per_payment_method);
            this.loading = false;
            console.log(this.pagostipo,'tipos de pagos');
            console.log(this.camper,'tipos de pagos');
 
   
        }) 

        })

    })
      
  
   }
  selectedCampers: any[] = [];
  

  onHeaderCheckboxToggle(event: any) {
      this.selectedCampers = event.value; // Actualiza la selección
  }
  
  open() {
 
   
    
		this.modalService.open(this.content);
	}
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getObjectKeysField(obj: any) {
    console.log();
    
  }
  toggleView() {
    this.showAll = !this.showAll;
  }

  transformPayments(paymentsArray: any[]): any {
    const paymentsObject: { [key: string]: any } = {};
  
    paymentsArray.forEach(payment => {
      // Reemplaza espacios y caracteres especiales para formar nombres de propiedades válidos
      const key = payment.payment_method.replace(/\s+/g, "").toLowerCase();
      paymentsObject[key] = {
        id: payment.id,
        total_amount: payment.total_amount,
        transactions: payment.transactions,
      };
    });
  
    return   paymentsObject ;
  }

  transformCampIncomes(campIncomesArray: any[]): any {
    const campIncomesObject: { [key: string]: any } = {};
  
    campIncomesArray.forEach(income => {
      // Reemplaza espacios y caracteres especiales para formar nombres de propiedades válidos
      const key = income.payment_method.replace(/\s+/g, "").toLowerCase();
      campIncomesObject[key] = {
        transactions: income.transactions,
        total_amount: income.total_amount,
        name:income.payment_method,
        key: key

      };
    });
  
    return campIncomesObject;
  }


  update(){
    this.loading= true;
    let campers =[]
    this.selectedCampers.forEach(element => {
        campers.push(element.camper_id)
    });
    const data = {
      campers: campers,
      payment :this.updatePage.value
    }
      this.pages.setDatosPagosMasivo(this.camp,data).subscribe((res)=> {
            console.log(res);
            this.pages.getDatosPagosMasivo(this.camp).subscribe((res:any)=>{
              this.camper =res.camper_payments;
              this.cards=res.camp_incomes_per_payment_method
              this.camper.forEach((item:any)=>{ 
                item.payments_info.payments_by_payment_method= this.transformPayments(item.payments_info.payments_by_payment_method);
              })
  
              this.pagostipo =  this.transformCampIncomes(  res.camp_incomes_per_payment_method);
  
              console.log(this.pagostipo,'tipos de pagos');
              this.selectedCampers =[]
              this.loading = false;

     
          })  
      })
      this.modalService.dismissAll(this.content);
      this.updatePage = this.formBuild.group({

        paid: [true],
        payment_amount: [0,[Validators.required]],
        payment_date: ["",[Validators.required,Validators.minLength(2)]],
        txn_number: ["",[Validators.required,Validators.minLength(2)]],
    
        currency_id:[2],
       
        payment_method_id:[0,[Validators.required,Validators.min(1)]],
        txn_type_id:[0,[Validators.required,Validators.min(1)]],
    
  
      });

  }
  ngOnInit(): void {
    

    this.updatePage = this.formBuild.group({

      paid: [true],
      payment_amount: [0,[Validators.required]],
      payment_date: ["",[Validators.required,Validators.minLength(2)]],
      txn_number: ["",[Validators.required,Validators.minLength(2)]],
  
      currency_id:[2],
     
      payment_method_id:[0,[Validators.required,Validators.min(1)]],
      txn_type_id:[0,[Validators.required,Validators.min(1)]],
  

    });
  }

  getPaymentMethodField(key: string, tipodepagos: any): string {
    // Elimina espacios y convierte `name` a minúsculas si es necesario
    const paymentMethodKey = tipodepagos[key].name.replace(/\s+/g, "").toLowerCase();
    console.log(paymentMethodKey); // Verifica si es correcto
  
    // Usa el valor procesado en la cadena de retorno
    return `payments_info.payments_by_payment_method.${paymentMethodKey}.total_amount`;
  }
  getReporte(){
    this.pages.getReporte(this.camp).subscribe({
      next:(res)=>{
        this.exportToExcel(res, 'Reporte_Pagos');

      }
    })
  }
  exportToExcel(data: any, fileName: string) {
    // 1. Convertimos JSON → Hoja
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // 2. Creamos el libro
    const workbook = {
      Sheets: { 'Reporte': worksheet },
      SheetNames: ['Reporte']
    };
  
    // 3. Escribimos el archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // 4. Guardamos en el navegador
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  }
  sortNested(event: any) {
    const field = event.field;
    const order = event.order;
  
    const resolve = (obj: any, path: string) =>
      path.split('.').reduce((acc, key) => acc?.[key], obj);
  
    event.data.sort((a: any, b: any) => {
      const valA = resolve(a, field);
      const valB = resolve(b, field);
  
      if (valA == null) return 1 * order;
      if (valB == null) return -1 * order;
  
      if (valA < valB) return -1 * order;
      if (valA > valB) return 1 * order;
      return 0;
    });
  }
  
  
  
}
