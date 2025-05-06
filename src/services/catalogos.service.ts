import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { 

  }

  order(id,info){
    return this.http.post('app.campercontrol.com:5050/update/order/catalogs?catalog_type='+id,info);

  }

  getParentAdmiSearc(filters: any){
    let params = new HttpParams()
  

    // Agregar los filtros de búsqueda dinámicamente
    Object.keys(filters).forEach(key => {
      if (filters[key] && key !== 'page' && key !== 'per_page' && key !== 'order') {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<any>('app.campercontrol.com:5050/search_admin_parent/', { params });
  }


  getAlimentos(){
    return this.http.get('app.campercontrol.com:5050/food_restriction/');
  }

  postAlimentos(a:any){
    return this.http.post('app.campercontrol.com:5050/food_restriction/',a);
  }
  updateAlimentos(a:any,id){
    return this.http.post('app.campercontrol.com:5050/food_restriction/'+id,a);
  }
  delerAlimentos(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete_food_restriction/'+id);
  }

  getGener(id = 'es'){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/get_all_gender/'+id);
  }


  getcurrency(){
    return this.http.get('app.campercontrol.com:5050/currency/');
  }

  postcurrency(a:any){
    return this.http.post('app.campercontrol.com:5050/currency/',a);
  }
  updatcurrency(a:any,id){
    return this.http.patch('app.campercontrol.com:5050/currency/'+id,a);
  }
  delecurrency(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete_currency/'+id);
  }




  getPathological_background(){
    return this.http.get('app.campercontrol.com:5050/pathological_background/');
  }

  posPathological_background(a:any){
    return this.http.post('app.campercontrol.com:5050/pathological_background/',a);
  }
  updatPathological_background(a:any,id){
    return this.http.post('app.campercontrol.com:5050/pathological_background/'+id,a);
  }
  delePathological_background(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete_pathological_back/'+id);
  }



  getPathological_backgroundFamily(){
    return this.http.get('app.campercontrol.com:5050/pathological_background_family/');
  }

  posPathological_backgroundFamily(a:any){
    return this.http.post('app.campercontrol.com:5050/pathological_background_family/',a);
  }
  updatPathological_backgroundFamily(a:any,id){
    return this.http.post('app.campercontrol.com:5050/pathological_background_family/'+id,a);
  }
  delePathological_backgroundFamily(id){
    console.log(id);
    
    return this.http.delete('app.campercontrol.com:5050/delete_pathological_back_fm/'+id);
  }



  getpaymentaccounts(){
    return this.http.get('app.campercontrol.com:5050/payment_account/');
  }

  postpaymentaccounts(a:any){
    return this.http.post('app.campercontrol.com:5050/payment_account/',a);
  }
  updatpaymentaccounts(a:any,id){
    return this.http.post('app.campercontrol.com:5050/payment_account/'+id,a);
  }
  delepaymentaccounts(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete_payment_account/'+id);
  }



  getlicensed_medicine(){
    return this.http.get('app.campercontrol.com:5050/licensed_medicine/');
  }

  postlicensed_medicine(a:any){
    return this.http.post('app.campercontrol.com:5050/licensed_medicine/',a);
  }
  updatlicensed_medicine(a:any,id){
    return this.http.post('app.campercontrol.com:5050/licensed_medicine/'+id,a);
  }
  delelicensed_medicine(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete_licensed_medicine/'+id);
  }


  getVaccine(){
    return this.http.get('app.campercontrol.com:5050/vaccine/');
  }

  postVaccine(a:any){
    return this.http.post('app.campercontrol.com:5050/vaccine/',a);
  }
  updatVaccine(a:any,id){
    return this.http.patch('app.campercontrol.com:5050/vaccine/'+id,a);
  }

  deleVaccine(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete_vaccine/'+id);
  }


  getStaffroles(){
    return this.http.get('app.campercontrol.com:5050/staff_role/');
  }

  postStaffroles(a:any){
    return this.http.post('app.campercontrol.com:5050/staff_role/',a);
  }
  updatStaffroles(a:any,id){
    return this.http.post('app.campercontrol.com:5050/staff_role/'+id,a);
  }

  deleStaffroles(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete_staff_role/'+id);
  }
  //metodos de pago
  getpayment_method(){
    return this.http.get('app.campercontrol.com:5050/payment_method/');
  }

  postpayment_method(a:any){
    return this.http.post('app.campercontrol.com:5050/payment_method/',a);
  }
  upddatepayment_method(a:any,id){
    return this.http.patch('app.campercontrol.com:5050/payment_method/'+id,a);
  }

  deletpayment_method(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete/payment_method/'+id);
  }
  //Preguntas extras

  getcamp_extra_question(){
    return this.http.get('app.campercontrol.com:5050/camp_extra_question/');
  }

  postcamp_extra_question(a:any){
    return this.http.post('app.campercontrol.com:5050/camp_extra_question/',a);
  }
  upddatcamp_extra_question(a:any,id){
    return this.http.patch('app.campercontrol.com:5050/camp_extra_question/'+id,a);
  }

  deletcamp_extra_question(id){
    console.log(id);
    return this.http.delete('app.campercontrol.com:5050/delete/camp_extra_question/'+id);
  }
    //Cargos extras

    getcamp_extra_charge(){
      return this.http.get('app.campercontrol.com:5050/camp_extra_charge/');
    }
  
    postcamp_extra_charge(a:any){
      return this.http.post('app.campercontrol.com:5050/camp_extra_charge/',a);
    }
    upddatcamp_extra_charge(a:any,id){
      return this.http.patch('app.campercontrol.com:5050/camp_extra_charge/'+id,a);
    }
  
    deletcamp_extra_charge(id){
      console.log(id);
      return this.http.delete('app.campercontrol.com:5050/delete/camp_extra_charge/'+id);
    }
    ///
     getSchool(){
      return this.http.get('app.campercontrol.com:5050/school/');

     }
     postSchool(info){
      return this.http.post('app.campercontrol.com:5050/school/',info);
     }
     updateSchool(a:any,id){
      return this.http.patch('app.campercontrol.com:5050/school/'+id,a);
    }
    deleteSchool(id){
      return this.http.delete('app.campercontrol.com:5050/delete_school/'+id);
    }

    searchPerent(id){
      return this.http.get('app.campercontrol.com:5050/search/parent/'+id);

    }
    searchCamper(id){
      return this.http.get('app.campercontrol.com:5050/search/camper/'+id);

    }
    searchUser(id){
      return this.http.get('app.campercontrol.com:5050/search/user/'+id);

    }

    getcampers(){
      return this.http.get('app.campercontrol.com:5050/camper/');

    }
    getCamperAdmi(page=1,per_page=10){
      return this.http.get('app.campercontrol.com:5050/admin/camper/?page='+page+'&per_page='+per_page+'&order=desc');
    }

    searchCampers(filters: any, page: number = 1, perPage: number = 10) {
      const params = new HttpParams()
        .set('camper_name', filters.camper_name || '')
        .set('camper_lastname_father', filters.camper_lastname_father || '')
        .set('camper_lastname_mother', filters.camper_lastname_mother || '')
        .set('tutor_1_name', filters.tutor_1_name || '')
        .set('tutor_1_lastname_father', filters.tutor_1_lastname_father || '')
        .set('tutor_1_lastname_mother', filters.tutor_1_lastname_mother || '')
        .set('tutor_1_email', filters.tutor_1_email || '')
        .set('tutor_2_name', filters.tutor_2_name || '')
        .set('tutor_2_lastname_father', filters.tutor_2_lastname_father || '')
        .set('tutor_2_lastname_mother', filters.tutor_2_lastname_mother || '')
        .set('tutor_2_email', filters.tutor_2_email || '')
        .set('page', page.toString())
        .set('per_page', perPage.toString())
        .set('order', 'desc');
  
      return this.http.get<any>('app.campercontrol.com:5050/admin/search_camper/', { params });
    }
    getCamper(){
      return this.http.get('app.campercontrol.com:5050/camper/');
    }
    serachCamper(id){
      return this.http.get('app.campercontrol.com:5050/camper/'+id);

    }
    serachCamps(id){
      return this.http.get('app.campercontrol.com:5050/camp/'+id);

    }
    // parent admi

    getParent(){
      return this.http.get('app.campercontrol.com:5050/parent/');
     }
     getStaff(page=1,per_page=10){
      return this.http.get('app.campercontrol.com:5050/staff/?page='+page+'&per_page='+per_page+'&order=desc');
     }
     searchUusario(filters: any, page: number = 1, perPage: number = 10) {
      const params = new HttpParams()
        .set('is_active', filters.is_active || true)
        .set('email', filters.email || '')
        .set('page', page.toString())
        .set('per_page', perPage.toString())
        .set('order', 'desc');
  
      return this.http.get<any>('app.campercontrol.com:5050/search_usuario/', { params });
    }
    searchStaff(filters: any, page: number = 1, perPage: number = 10) {
      const params = new HttpParams()
        .set('name', filters.name || '')
        .set('email', filters.email || '')
        .set('page', page.toString())
        .set('per_page', perPage.toString())
        .set('order', 'desc');
  
      return this.http.get<any>('app.campercontrol.com:5050/search_staff/', { params });
    }
     getProspectos(){
      return this.http.get('app.campercontrol.com:5050/prospect/');

     }
     getParentAdmi(page=1,per_page=10){
      return this.http.get('app.campercontrol.com:5050/admin/parent/?page='+page+'&per_page='+per_page+'&order=desc');
     }

     getParentAdmiSearcg(filters: any, page: number = 1, per_page: number = 10){
      let params = new HttpParams()
        .set('page', page.toString())
        .set('per_page', per_page.toString())
        .set('order', 'desc'); // Parámetro común de orden
  
      // Agregar filtros, solo si no están vacíos
      Object.keys(filters).forEach(key => {
        if (filters[key]) { // Solo agregar filtros no vacíos
          params = params.set(key, filters[key]);
        }
      });
  
      // Realizamos la solicitud GET con los filtros y parámetros como query string
      return this.http.get<any>(`app.campercontrol.com:5050/search_admin_parent/`, { params });
    }
     getParentU(id){
      return this.http.get('app.campercontrol.com:5050/parent/'+id);

     }
     postParent(info){
      return this.http.post('app.campercontrol.com:5050/parent/',info);
     }
     patchParent(id,a:any){
      return this.http.patch('app.campercontrol.com:5050/parent/'+id,a);
    }
    deletParent(id){
      return this.http.delete('app.campercontrol.com:5050/delete_parent/'+id);
    }
     // user admi

    

     getUsuarios(isActive: boolean, page: number, perPage: number, order: string) {
      let params = new HttpParams()
        .set('is_active', String(isActive))
        .set('page', String(page))
        .set('per_page', String(perPage))
        .set('order', order);
  
      return this.http.get<any>('app.campercontrol.com:5050/usuario/', { params });
    }
     getUserF(){
      return this.http.get('app.campercontrol.com:5050/usuario?is_active=false');

     }
    
     postUser(info){
      return this.http.post('app.campercontrol.com:5050/usuario/',info);
     }
     patchUser(a:any,id){
      return this.http.patch('app.campercontrol.com:5050/usuario/'+id,a);
    }
    deletUser(id){
      return this.http.delete('app.campercontrol.com:5050/delete_usuario/'+id);
    }

    getRol(){
      return this.http.get('app.campercontrol.com:5050/rol?is_active=true');
    }

    getinfodelet(id){
      return this.http.get('app.campercontrol.com:5050/user_delete_info?user_id='+id);


    }
  
    // admi camper
    getCamps( ){
      return this.http.get('app.campercontrol.com:5050/camp/');

     }
     patchCamps(a:any,id){
      return this.http.patch('app.campercontrol.com:5050/camp/'+id,a);
    }
    deletCamps(id){
      return this.http.delete('app.campercontrol.com:5050/delete_camp/'+id);
    }
  
}
