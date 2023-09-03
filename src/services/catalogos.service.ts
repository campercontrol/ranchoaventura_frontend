import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { 

  }

  order(id,info){
    return this.http.post('http://142.93.12.234:8000/update/order/catalogs?catalog_type='+id,info);

  }

  getAlimentos(){
    return this.http.get('http://142.93.12.234:8000/food_restriction/');
  }

  postAlimentos(a:any){
    return this.http.post('http://142.93.12.234:8000/food_restriction/',a);
  }
  updateAlimentos(a:any,id){
    return this.http.post('http://142.93.12.234:8000/food_restriction/'+id,a);
  }
  delerAlimentos(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete_food_restriction/'+id);
  }

  getGener(id = 'es'){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/get_all_gender/'+id);
  }


  getcurrency(){
    return this.http.get('http://142.93.12.234:8000/currency/');
  }

  postcurrency(a:any){
    return this.http.post('http://142.93.12.234:8000/currency/',a);
  }
  updatcurrency(a:any,id){
    return this.http.post('http://142.93.12.234:8000/currency/'+id,a);
  }
  delecurrency(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete_currency/'+id);
  }




  getPathological_background(){
    return this.http.get('http://142.93.12.234:8000/pathological_background/');
  }

  posPathological_background(a:any){
    return this.http.post('http://142.93.12.234:8000/pathological_background/',a);
  }
  updatPathological_background(a:any,id){
    return this.http.post('http://142.93.12.234:8000/pathological_background/'+id,a);
  }
  delePathological_background(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete_pathological_back/'+id);
  }



  getPathological_backgroundFamily(){
    return this.http.get('http://142.93.12.234:8000/pathological_background_family/');
  }

  posPathological_backgroundFamily(a:any){
    return this.http.post('http://142.93.12.234:8000/pathological_background_family/',a);
  }
  updatPathological_backgroundFamily(a:any,id){
    return this.http.post('http://142.93.12.234:8000/pathological_background_family/'+id,a);
  }
  delePathological_backgroundFamily(id){
    console.log(id);
    
    return this.http.delete('http://142.93.12.234:8000/delete_pathological_back_fm/'+id);
  }



  getpaymentaccounts(){
    return this.http.get('http://142.93.12.234:8000/payment_account/');
  }

  postpaymentaccounts(a:any){
    return this.http.post('http://142.93.12.234:8000/payment_account/',a);
  }
  updatpaymentaccounts(a:any,id){
    return this.http.post('http://142.93.12.234:8000/payment_account/'+id,a);
  }
  delepaymentaccounts(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete_payment_account/'+id);
  }



  getlicensed_medicine(){
    return this.http.get('http://142.93.12.234:8000/licensed_medicine/');
  }

  postlicensed_medicine(a:any){
    return this.http.post('http://142.93.12.234:8000/licensed_medicine/',a);
  }
  updatlicensed_medicine(a:any,id){
    return this.http.post('http://142.93.12.234:8000/licensed_medicine/'+id,a);
  }
  delelicensed_medicine(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete_licensed_medicine/'+id);
  }


  getVaccine(){
    return this.http.get('http://142.93.12.234:8000/vaccine/');
  }

  postVaccine(a:any){
    return this.http.post('http://142.93.12.234:8000/vaccine/',a);
  }
  updatVaccine(a:any,id){
    return this.http.patch('http://142.93.12.234:8000/vaccine/'+id,a);
  }

  deleVaccine(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete_vaccine/'+id);
  }


  getStaffroles(){
    return this.http.get('http://142.93.12.234:8000/staff_role/');
  }

  postStaffroles(a:any){
    return this.http.post('http://142.93.12.234:8000/staff_role/',a);
  }
  updatStaffroles(a:any,id){
    return this.http.post('http://142.93.12.234:8000/staff_role/'+id,a);
  }

  deleStaffroles(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete_staff_role/'+id);
  }
  //metodos de pago
  getpayment_method(){
    return this.http.get('http://142.93.12.234:8000/payment_method/');
  }

  postpayment_method(a:any){
    return this.http.post('http://142.93.12.234:8000/payment_method/',a);
  }
  upddatepayment_method(a:any,id){
    return this.http.patch('http://142.93.12.234:8000/payment_method/'+id,a);
  }

  deletpayment_method(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete/payment_method/'+id);
  }
  //Preguntas extras

  getcamp_extra_question(){
    return this.http.get('http://142.93.12.234:8000/camp_extra_question/');
  }

  postcamp_extra_question(a:any){
    return this.http.post('http://142.93.12.234:8000/camp_extra_question/',a);
  }
  upddatcamp_extra_question(a:any,id){
    return this.http.patch('http://142.93.12.234:8000/camp_extra_question/'+id,a);
  }

  deletcamp_extra_question(id){
    console.log(id);
    return this.http.delete('http://142.93.12.234:8000/delete/camp_extra_question/'+id);
  }
    //Cargos extras

    getcamp_extra_charge(){
      return this.http.get('http://142.93.12.234:8000/camp_extra_charge/');
    }
  
    postcamp_extra_charge(a:any){
      return this.http.post('http://142.93.12.234:8000/camp_extra_charge/',a);
    }
    upddatcamp_extra_charge(a:any,id){
      return this.http.patch('http://142.93.12.234:8000/camp_extra_charge/'+id,a);
    }
  
    deletcamp_extra_charge(id){
      console.log(id);
      return this.http.delete('http://142.93.12.234:8000/delete/camp_extra_charge/'+id);
    }
    ///
     getSchool(){
      return this.http.get('http://142.93.12.234:8000/school/');

     }
     postSchool(info){
      return this.http.post('http://142.93.12.234:8000/school/',info);
     }
     updateSchool(a:any,id){
      return this.http.patch('http://142.93.12.234:8000/school/'+id,a);
    }
    deleteSchool(id){
      return this.http.delete('http://142.93.12.234:8000/delete_school/'+id);
    }

    searchPerent(id){
      return this.http.get('http://142.93.12.234:8000/search/user/'+id);

    }
    searchUser(id){
      return this.http.get('http://142.93.12.234:8000/search/parent/'+id);

    }

    getcampers(){
      return this.http.get('http://142.93.12.234:8000/camper/');

    }
    // parent admi

    getParent(){
      return this.http.get('http://142.93.12.234:8000/parent/');

     }
     getParentU(id){
      return this.http.get('http://142.93.12.234:8000/parent/'+id);

     }
     postParent(info){
      return this.http.post('http://142.93.12.234:8000/parent/',info);
     }
     patchParent(id,a:any){
      return this.http.patch('http://142.93.12.234:8000/parent/'+id,a);
    }
    deletParent(id){
      return this.http.delete('http://142.93.12.234:8000/delete_parent/'+id);
    }
     // user admi

     getUser(){
      return this.http.get('http://142.93.12.234:8000/usuario/');

     }
     getUserF(){
      return this.http.get('http://142.93.12.234:8000/usuario?is_active=false');

     }
    
     postUser(info){
      return this.http.post('http://142.93.12.234:8000/usuario/',info);
     }
     patchUser(a:any,id){
      return this.http.patch('http://142.93.12.234:8000/usuario/'+id,a);
    }
    deletUser(id){
      return this.http.delete('http://142.93.12.234:8000/delete_usuario/'+id);
    }

    getRol(){
      return this.http.get('http://142.93.12.234:8000/rol?is_active=true');
    }
  
    // admi camper
    getCamps( ){
      return this.http.get('http://142.93.12.234:8000/camp/');

     }
     patchCamps(a:any,id){
      return this.http.patch('http://142.93.12.234:8000/camp/'+id,a);
    }
    deletCamps(id){
      return this.http.delete('http://142.93.12.234:8000/delete_camp/'+id);
    }
  
}
