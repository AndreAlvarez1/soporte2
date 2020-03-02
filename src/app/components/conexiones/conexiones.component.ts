import { Component, OnInit } from '@angular/core';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { ConexionModel } from 'src/app/model/conexion.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-conexiones',
  templateUrl: './conexiones.component.html',
  styleUrls: ['./conexiones.component.css']
})
export class ConexionesComponent implements OnInit {

  conexiones: ConexionModel[] = [];
  loading = false;
  admin = false;


  constructor(private conex: ConexionesService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.admin = this.auth.esAdmin();

    this.conex.getConexiones()
              .subscribe( resp => {
                this.conexiones = resp;
                this.loading = false;
              });
  }


  borrarConexion(conexion: ConexionModel, i: number ) {

    Swal.fire({
      title: 'Estás seguro?',
      text: `Estas seguro que quieres borrar a ${conexion.cliente}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if ( resp.value ) {
             // Esto saca del arreglo la conexion que voy a borrar.
            // Para sacarlo de la vista sin tener que refrescar la web.
            this.conexiones.splice(i, 1);

            this.conex.borrarDato('Conexiones', conexion.id)
                .subscribe();
      }
    });
  }


}
