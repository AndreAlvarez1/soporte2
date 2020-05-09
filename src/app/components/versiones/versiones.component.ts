import { Component, OnInit } from '@angular/core';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { AuthService } from 'src/app/services/auth.service';
import { VersionModel } from 'src/app/model/version.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-versiones',
  templateUrl: './versiones.component.html',
  styleUrls: ['./versiones.component.css']
})
export class VersionesComponent implements OnInit {

  admin = false;
  versiones: VersionModel[] = [];

  constructor( private conex: ConexionesService,
               private auth: AuthService) { }

  ngOnInit() {
    this.admin = this.auth.esAdmin();
    this.conex.getVersiones()
        .subscribe( data => {
          this.versiones = data;
        });
  }




  borrarVersion(version: VersionModel, i: number ) {
    Swal.fire({
      title: 'Estás seguro?',
      text: `Estas seguro que quieres borrar a ${version.app}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if ( resp.value ) {
             // Esto saca del arreglo la conexion que voy a borrar.
            // Para sacarlo de la vista sin tener que refrescar la web.
            this.versiones.splice(i, 1);

            this.conex.borrarDato('Versiones', version.id)
                .subscribe();
      }
    });
  }



}
