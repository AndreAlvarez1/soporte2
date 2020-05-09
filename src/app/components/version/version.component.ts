import { Component, OnInit, Version } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ConexionesService } from 'src/app/services/conexiones.service';
import { AuthService } from 'src/app/services/auth.service';
import { VersionModel } from 'src/app/model/version.model';

import { Observable} from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

admin = false;
version = new VersionModel();
hoy = new Date();

  constructor( private conex: ConexionesService,
               private route: ActivatedRoute,
               private auth: AuthService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.admin = this.auth.esAdmin();

    if ( id !== 'nuevo') {
      this.conex.getDato('Versiones', id)
          .subscribe( (resp: VersionModel) => {
            this.version = resp;
            this.version.id = id;
       });
    }
}
     /////////////////////////////////

  guardar( form: NgForm ) {

    if (form.invalid) {
      this.error();
      return;
    }

    this.version.actualizacion = new Date();

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Info',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
    Swal.showLoading();

    let peticion: Observable<any>;


    if (this.version.id ) {
      peticion = this.conex.actualizarVersion(this.version);

    } else {
      peticion = this.conex.crearVersion(this.version);
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.version.app ,
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
