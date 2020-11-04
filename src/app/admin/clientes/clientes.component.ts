import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  admin = false;
  clientes: any[] = [];
  loading = false;
  searchString: any;

  constructor(private conex: ConexionesService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.admin = this.auth.esAdmin();
    this.conex.getDatos('/Clientes')
              .subscribe( resp => {
                this.clientes = resp;
                console.log('clientes', this.clientes);
                this.loading = false;
              });
  }

  borrarCliente(cliente, i: number ) {

    Swal.fire({
      title: 'Estás seguro?',
      text: `Estas seguro que quieres borrar a ${cliente.Marca}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if ( resp.value ) {
             // Esto saca del arreglo la conexion que voy a borrar.
            // Para sacarlo de la vista sin tener que refrescar la web.
            this.clientes = this.clientes.filter( c => c.id !== cliente.id);

            this.conex.borrarDato('Clientes', cliente.id)
                .subscribe();
      }
    });
  }


}
