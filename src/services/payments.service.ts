import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http : HttpClient) {

   }

   getpage(idCamp,idCamper,id=0){
    return this.http.get('app.campercontrol.com:5050/payment/page/camper/'+idCamp+'/'+idCamper+'/'+id)
   }
   // crear pago
   setpage(info){
    return this.http.post('app.campercontrol.com:5050/payment',info)
   }
   updatepage(id,info){
    return this.http.patch('app.campercontrol.com:5050/payment/'+id,info)
   }
   getPageIndi(id){
    return this.http.get('app.campercontrol.com:5050/payment/'+id,)
   }
   deletPage(id){
    return this.http.delete('app.campercontrol.com:5050/payment_method/'+id,{})
   }
   // admi pagos catalogos
   getPagos(){

    return this.http.get('app.campercontrol.com:5050/payment/')
  }
  gettransaction_type(){

    return this.http.get('app.campercontrol.com:5050/payment_transaction_type/')
  }


  /// pagos masivos

  getDatosPagosMasivo(id){

    return this.http.get('app.campercontrol.com:5050/camp/'+id+'/incomes')
  }

  setDatosPagosMasivo(id,data){

    return this.http.post('app.campercontrol.com:5050/camps/'+id+'/campers/0/massive_payment',data)
  }


}
