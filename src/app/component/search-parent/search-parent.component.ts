import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { CatalogosService } from 'src/services/catalogos.service';

@Component({
  selector: 'app-search-parent',
  templateUrl: './search-parent.component.html',
  styleUrls: ['./search-parent.component.scss']
})
export class SearchParentComponent implements OnInit {
  listcatalogos:any=[];
  search="";
  @Output() eventoAlPadre = new EventEmitter<any>();
  resSearch:boolean=false;
  constructor(private catalogos: CatalogosService,private routerN:Router) {
   }

  ngOnInit(): void {
  }

  searchparten(){
      this.catalogos.searchPerent(this.search).subscribe((res:any)=>{
        this.listcatalogos = res.data;
        this.resSearch= true;
        console.log(this.listcatalogos);
        
        
      },error=>{
        console.log(error);
        
      })
    

  }

  vercamper(id){
    console.log(id);
    
    this.routerN.navigate(['/dashboard/parents/camper/'+id])


  }
  udpate(parent){
    this.eventoAlPadre.emit(parent)
  }

}
