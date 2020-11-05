import { Component, OnInit } from '@angular/core';
import { AppetitoService } from 'src/app/services/appetito.service';
import { SucursalModel } from 'src/app/model/sucursal.model';
import { AddressModel } from 'src/app/model/address.model';
// import regiones from 'src/assets/js/regiones.json';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  loading = true;
  id: any;
  sucursal: SucursalModel;
  sucursales: any[]        = [];
  sucursalesAll: any[]        = [];
  marcas: any[]        = [];
  searchString: string;
  editar = false;
  sugerencias = [];
  token: string;

  constructor(private appetito: AppetitoService,
              private router: Router,
              private route: ActivatedRoute
               ) {
                this.id = Number(this.route.snapshot.paramMap.get('id'));
               }

  ngOnInit() {
    this.token = uuidv4();
    console.log('token', this.token);
    this.traerMarcas();
    this.sucursal = new SucursalModel();
    // this.regionesAll = regiones;

  }

  info() {
    console.log('marcas', this.marcas);
    console.log('sucursales', this.sucursales);
    console.log('sucursal', this.sucursal);
  }

traerMarcas() {
  console.log('traigo marcas');
  this.appetito.traeDatos('/marcas').subscribe( resp => {
    console.log('respuesta marcas', this.id, resp);
    this.marcas = resp['datos'];
    this.traerSucursales();
  });
}

  traerSucursales() {
    console.log('traigo sucursales');
    this.appetito.traeDatos('/sucursales').subscribe( resp => {
      console.log('respuesta', resp);
      this.sucursalesAll = resp['datos'];

      if ( this.id === 0) {
        this.sucursales = resp['datos'];
      } else {
        this.sucursales = resp['datos'].filter( m => m.marcaId === this.id);
      }
      this.loading = false;
    });
  }


filtrar(value) {
  console.log('value', value);
  const marca = this.marcas.find( m => m.name === value);
  console.log('aca', marca);
  if (value === 'Todas') {
    this.sucursales = this.sucursalesAll;
  } else {
    this.sucursales = this.sucursalesAll.filter( m => m.marcaId === marca.id);
  }
}

  selectSucursal(item) {
    this.sucursal = item;
    this.editar = true;
    console.log('sucursal', this.sucursal);
  }


  selectMarca(value) {
    if ( value === 'Escoge una Marca') {
      this.sucursal.marcaId = 0;
      return;
    }

    console.log('marca', value);
    const marca = this.marcas.find( m => m.name === value);
    this.sucursal.marcaId = marca.id;
  }

  // --------------------------------------------//
  //                                             //
  //                                             //
  // ============ GOOGLE MAPS ================== //
  //                                             //
  //                                             //
  // --------------------------------------------//

  predicciones() {
    if (this.sucursal.direccion.length < 3) {
        return;
    }
    this.sugerencias = [];
    this.appetito.traeDatos(`/predicciones/${this.sucursal.direccion}/${this.token}`)
              .subscribe(resp => {
                  this.sugerencias = resp['predictions'];
              });
  }

  selectSugerencia(dir) {
  console.log('direccion', dir);
  this.sugerencias = [];

  this.sucursal.direccion = dir.description;
  const param = 'place_id=';

  this.appetito.traeDatos(`/geocode/${param}/${dir.place_id}`)
              .subscribe(resp => {
                console.log('resp geocode', resp['results'][0]);
                const data = resp['results'][0];
                this.sucursal.direccion = data.formatted_address;
                this.sucursal.lat = data.geometry.location.lat;
                this.sucursal.lng = data.geometry.location.lng;
                console.log('addressData', data);
              });
  }

  // --------------------------------------------//
  //                                             //
  //                                             //
  // ============ Guardar ====================== //
  //                                             //
  //                                             //
  // --------------------------------------------//
  guardar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    if (this.sucursal.marcaId === 0 || this.sucursal.marcaId === undefined){
      this.error('escoge una sucursal');
      return;
    }

    let accion = 'insert';

    this.sucursal.direccion = this.sucursal.direccion.replace(/[']+/g, '');
    this.sucursal.name = this.sucursal.name.replace(/[']+/g, '');
    this.sucursal.descripcion = this.sucursal.descripcion.replace(/[']+/g, '');
    console.log('body', this.sucursal);

    if (this.editar) {
      console.log('update');
      accion = 'update';
    }

    this.appetito.guardarDato(`/post/sucursales/${accion}`, this.sucursal)
                 .subscribe( resp => {
                   console.log('sucursal guardado', resp);
                   this.traerSucursales();
                   this.limpiar();
                  }, err => {console.log('error', err);
                  });
  }

  limpiar() {
    this.sucursal = new SucursalModel();
    this.editar = false;
  }

  abrirSucursal() {
    this.router.navigateByUrl(`/appetito/sucursal/${this.sucursal.id}`);
  }


  // filtrarComunas(regionSelect) {
  //   this.mostrarComunas = true;
  //   const filtrado = regiones.filter( resp => resp.region === regionSelect );
  //   this.comunas = filtrado[0].comunas;
  // }



  error(texto) {
    Swal.fire({
    title: 'Error',
    text: texto,
    icon: 'error',
    confirmButtonText: 'Ok'
    });
  }


}