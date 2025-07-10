import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http : HttpClient) {

   }

   getpage(idCamp,idCamper,id=0){
    return this.http.get('http://api-dev.kincamp.com/payment/page/camper/'+idCamp+'/'+idCamper+'/'+id)
   }
   // crear pago
   setpage(info){
    return this.http.post('http://api-dev.kincamp.com/payment/',info)
   }
   updatepage(id,info){
    return this.http.patch('http://api-dev.kincamp.com/payment/'+id,info)
   }
   getPageIndi(id){
    return this.http.get('http://api-dev.kincamp.com/payment/'+id,)
   }
   deletPage(id){
    return this.http.delete('http://api-dev.kincamp.com/payment_method/'+id,{})
   }
   // admi pagos catalogos
   getPagos(){

    return this.http.get('http://api-dev.kincamp.com/payment/')
  }
  gettransaction_type(){

    return this.http.get('http://api-dev.kincamp.com/payment_transaction_type/')
  }


  /// pagos masivos

  getDatosPagosMasivo(id){

    return this.http.get('http://api-dev.kincamp.com/camp/'+id+'/incomes')
  }

  setDatosPagosMasivo(id,data){

    return this.http.post('http://api-dev.kincamp.com/camps/'+id+'/campers/0/massive_payment',data)
  }


}
