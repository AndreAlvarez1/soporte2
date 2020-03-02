import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ConexionModel } from 'src/app/model/conexion.model';
import { ConexionesService } from 'src/app/services/conexiones.service';

import { Observable} from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-conexion',
  templateUrl: './conexion.component.html',
  styleUrls: ['./conexion.component.css']
})
export class ConexionComponent implements OnInit {

  conexion = new ConexionModel();
  admin = false;

  constructor( private conex: ConexionesService,
               private route: ActivatedRoute,
               private auth: AuthService) { }

  ngOnInit() {
    this.admin = this.auth.esAdmin();
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo') {
      this.conex.getDato('Conexiones', id)
                .subscribe( (resp: ConexionModel) => {
                   this.conexion = resp;
                   this.conexion.id = id;
                 });
    }
  }
 ////////////////////////////////////

 // LE AGREGA "." Y "-" AL RUT
cambiaRut(tecla) {
  if (tecla["keyCode"] != 8 && tecla["keyCode"] != 8 ) {
          if (this.conexion.rut.length === 2 || this.conexion.rut.length === 6) {
            this.conexion.rut = this.conexion.rut + '.';
          } else if ( this.conexion.rut.length === 10 ) {
            this.conexion.rut = this.conexion.rut + '-';
          } else if ( this.conexion.rut.length === 13 ) {
            this.conexion.rut = this.conexion.rut.slice(0, -1);
          }
  }
  console.log(this.conexion.rut);
}







  /////////////////////////////////

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


    if (this.conexion.id ) {
      peticion = this.conex.actualizarConexion(this.conexion);
          // .subscribe( resp => {
          //   console.log(resp);
          // });
    } else {
      peticion = this.conex.crearConexion(this.conexion);
      //     .subscribe(resp => {
      //      console.log(resp);
      //      this.conexion = resp;
      // });
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.conexion.cliente ,
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
