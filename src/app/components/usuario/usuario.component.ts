import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from 'src/app/model/usuario.model';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { AuthService } from 'src/app/services/auth.service';

import { Observable} from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  admin = false;
  usuario = new UsuarioModel();

  constructor( private conex: ConexionesService,
               private route: ActivatedRoute,
               private auth: AuthService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.admin = this.auth.esAdmin();

    if ( id !== 'nuevo') {
      this.conex.getDato('Usuarios', id)
                .subscribe( (resp: UsuarioModel) => {
                   this.usuario = resp;
                   this.usuario.id = id;
                 });
    }

  }


  guardar( form: NgForm ) {
    if (form.invalid) {
      this.error();
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Info',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
    Swal.showLoading();

    let peticion: Observable<any>;


    if (this.usuario.id ) {
      peticion = this.conex.actualizarUsuario(this.usuario);
          // .subscribe( resp => {
          //   console.log(resp);
          // });
    } else {
      peticion = this.conex.crearUsuario(this.usuario);
      //     .subscribe(resp => {
      //      console.log(resp);
      //      this.conexion = resp;
      // });
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.usuario.nombre ,
        text: 'Datos guardados con Exito',
        icon: 'success'
      });
    });
 }



error() {
  Swal.fire({
  title: 'Error',
  text: 'Rellena todos los campos por favor',
  icon: 'error',
  confirmButtonText: 'Ok'
});

}

}
