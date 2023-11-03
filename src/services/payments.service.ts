import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http : HttpClient) {

   }

   getpage(idCamp,idCamper,id=0){
    return this.http.get('http://64.227.16.165:8000//payment/page/camper/'+idCamper+'/'+idCamp+'/'+id)
   }
   // crear pago
   setpage(info){
    return this.http.post('http://64.227.16.165:8000//payment',info)
   }
   updatepage(id,info){
    return this.http.patch('http://64.227.16.165:8000//payment/'+id,info)
   }
   getPageIndi(id){
    return this.http.get('http://64.227.16.165:8000//payment/'+id,)
   }
   deletPage(id){
    return this.http.delete('http://64.227.16.165:8000//payment_method/'+id,{})
   }
   // admi pagos catalogos
   getPagos(){

    return this.http.get('http://64.227.16.165:8000//payment/')
  }
  gettransaction_type(){

    return this.http.get('http://64.227.16.165:8000//payment_transaction_type/')
  }



}
