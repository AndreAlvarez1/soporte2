import { Component, OnInit } from '@angular/core';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { UsuarioModel } from 'src/app/model/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  admin = false;
  usuarios: UsuarioModel[] = [];
  loading = false;

  constructor( private conex: ConexionesService,
               private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.admin = this.auth.esAdmin();
    this.conex.getUsuarios()
              .subscribe( resp => {
                this.usuarios = resp;
                this.loading = false;
              });
  }


  borrarUsuario(usuario: UsuarioModel, i: number ) {

    Swal.fire({
      title: 'Estás seguro?',
      text: `Estas seguro que quieres borrar a ${usuario.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if ( resp.value ) {
             // Esto saca del arreglo la conexion que voy a borrar.
            // Para sacarlo de la vista sin tener que refrescar la web.
            this.usuarios.splice(i, 1);

            this.conex.borrarDato('Usuarios', usuario.id)
                .subscribe();
      }
    });
  }

}

