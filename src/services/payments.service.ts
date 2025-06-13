import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http : HttpClient) {

   }

   getpage(idCamp,idCamper,id=0){
    return this.http.get('https://api-dev.campercontrol.com/payment/page/camper/'+idCamp+'/'+idCamper+'/'+id)
   }
   // crear pago
   setpage(info){
    return this.http.post('https://api-dev.campercontrol.com/payment/',info)
   }
   updatepage(id,info){
    return this.http.patch('https://api-dev.campercontrol.com/payment/'+id,info)
   }
   getPageIndi(id){
    return this.http.get('https://api-dev.campercontrol.com/payment/'+id,)
   }
   deletPage(id){
    return this.http.delete('https://api-dev.campercontrol.com/payment_method/'+id,{})
   }
   // admi pagos catalogos
   getPagos(){

    return this.http.get('https://api-dev.campercontrol.com/payment/')
  }
  gettransaction_type(){

    return this.http.get('https://api-dev.campercontrol.com/payment_transaction_type/')
  }


  /// pagos masivos

  getDatosPagosMasivo(id){

    return this.http.get('https://api-dev.campercontrol.com/camp/'+id+'/incomes')
  }

  setDatosPagosMasivo(id,data){

    return this.http.post('https://api-dev.campercontrol.com/camps/'+id+'/campers/0/massive_payment',data)
  }


}
