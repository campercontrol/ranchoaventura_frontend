import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http : HttpClient) {

   }
   // crear pago
   getpage(idCamp,idCamper,id=0){
    return this.http.get('https://api.ranchoaventuramexico.com/payment/page/camper/'+idCamp+'/'+idCamper+'/'+id)
   } 

   getReporte(id){
    return this.http.get('https://api.ranchoaventuramexico.com/camps/'+id+'/payments_report')

   }

   // crear pago
   setpage(info){
    return this.http.post('https://api.ranchoaventuramexico.com/payment/',info)
   }
     // crear pago
   updatepage(id,info){
    return this.http.patch('https://api.ranchoaventuramexico.com/payment/'+id,info)
   }
     // crear pago
   getPageIndi(id){
    return this.http.get('https://api.ranchoaventuramexico.com/payment/'+id,)
   }
     // crear pago
   deletPage(id){
    return this.http.delete('https://api.ranchoaventuramexico.com/payment_method/'+id,{})
   }
   // admi pagos catalogos
   getPagos(){

    return this.http.get('https://api.ranchoaventuramexico.com/payment/')
  }
    // crear pago
  gettransaction_type(){

    return this.http.get('https://api.ranchoaventuramexico.com/payment_transaction_type/')
  }


  /// pagos masivos

  getDatosPagosMasivo(id){

    return this.http.get('https://api.ranchoaventuramexico.com/camp/'+id+'/incomes')
  }

  setDatosPagosMasivo(id,data){

    return this.http.post('https://api.ranchoaventuramexico.com/camps/'+id+'/campers/0/massive_payment',data)
  }


}
