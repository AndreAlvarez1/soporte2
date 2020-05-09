import { Component, OnInit } from '@angular/core';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  searchString;
  loading = true;
  admin = false;
  clientes: any[] = [];

  constructor( private conex: ConexionesService,
               private auth: AuthService) { }

  ngOnInit() {
    this.admin = this.auth.esAdmin();
    this.traerClientes();
  }

  traerClientes() {
    this.conex.getClientes()
        .subscribe( data => {
          this.clientes = data["Data"];
          this.loading = false;
        });
  }
}
