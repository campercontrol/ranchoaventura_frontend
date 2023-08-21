import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/services/auth.service';

@Component({
  selector: 'app-redirigir',
  templateUrl: './redirigir.component.html',
  styleUrls: ['./redirigir.component.scss']
})
export class RedirigirComponent implements OnInit {

  constructor(private auth :AuthenticationService) { }

  ngOnInit(): void {
    this.auth.logaot()
  }

}
