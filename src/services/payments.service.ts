import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http : HttpClient) {

   }

   getpage(idCamp,idCamper,id=0){
    return this.http.get('http://142.93.12.234:8000/payment/page/camper/'+idCamper+'/'+idCamp+'/'+id)
   }
   // crear pago
   setpage(info){
    return this.http.post('http://142.93.12.234:8000/payment',info)
   }
   updatepage(id,info){
    return this.http.patch('http://142.93.12.234:8000/payment/'+id,info)
   }
   getPageIndi(id){
    return this.http.get('http://142.93.12.234:8000/payment/'+id,)
   }
}
