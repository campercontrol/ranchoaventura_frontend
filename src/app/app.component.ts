import { Component , OnInit} from '@angular/core';
import { AutoHeightService } from 'ngx-owl-carousel-o/lib/services/autoheight.service';
import { AuthenticationService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(private info:AuthenticationService){
     
  }

  ngOnInit() {
    this.info.logaot()

    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
}
