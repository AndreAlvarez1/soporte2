import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin = false;

  constructor(private auth: AuthService,
              public ws: WebsocketService) { }

  ngOnInit() {
    this.admin = this.auth.esAdmin();
  }


  cerrarSesion() {
    console.log('cerrar');
    this.ws.logoutWs();
 }

}
