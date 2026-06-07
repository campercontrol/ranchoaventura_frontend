import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) {

   }
   // crear pago
   getpage(idCamp,idCamper,id=0){
    return this.http.get(this.apiUrl+'/payment/page/camper/'+idCamp+'/'+idCamper+'/'+id)
   } 

   getReporte(id){
    return this.http.get(this.apiUrl+'/camps/'+id+'/payments_report')

   }

   // crear pago
   setpage(info){
    return this.http.post(this.apiUrl+'/payment/',info)
   }
     // crear pago
   updatepage(id,info){
    return this.http.patch(this.apiUrl+'/payment/'+id,info)
   }
     // crear pago
   getPageIndi(id){
    return this.http.get(this.apiUrl+'/payment/'+id,)
   }
     // crear pago
   deletPage(id){
    return this.http.delete(this.apiUrl+'/payment_method/'+id,{})
   }
   // admi pagos catalogos
   getPagos(){

    return this.http.get(this.apiUrl+'/payment/')
  }
    // crear pago
  gettransaction_type(){

    return this.http.get(this.apiUrl+'/payment_transaction_type/')
  }


  /// pagos masivos

  getDatosPagosMasivo(id){

    return this.http.get(this.apiUrl+'/camp/'+id+'/incomes')
  }

  setDatosPagosMasivo(id,data){

    return this.http.post(this.apiUrl+'/camps/'+id+'/campers/0/massive_payment',data)
  }


}
