import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppetitoService } from 'src/app/services/appetito.service';
import { SucursalModel } from 'src/app/model/sucursal.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  id: any;
  searchString: string;
  editar = false;
  sucursal: SucursalModel = new SucursalModel();
  stores: any[] = [];
  store = {
            id: 0,
            marca: '',
            sucursalID: 0,
            status: 1
        };



  constructor(private appetito: AppetitoService,
              private router: Router,
              private route: ActivatedRoute) {
              this.id = Number(this.route.snapshot.paramMap.get('id'));
              this.store.sucursalID = this.id;
              this.traerSucursales();
              }

  ngOnInit() {
    this.traerStores();
    console.log('this.store', this.store);
  }

  info(){
    console.log('sucursal', this.sucursal);
    console.log('stores', this.stores);
    console.log('store', this.store);
  }

  traerSucursales() {
    console.log('traigo sucursales');
    this.appetito.traeDatos('/sucursales').subscribe( resp => {
      const sucursales = resp['datos'];
      this.sucursal = sucursales.find( s => s.id === this.id);
    });
  }

  traerStores() {
    console.log('traigo stores');
    this.appetito.traeDatos('/buscarStores/' + this.id).subscribe( resp => {
      console.log('respuesta', resp);
      this.stores = resp['datos'];
      console.log('stores', this.stores);
    });
  }

  guardar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    let accion = 'insert';

    this.store.marca = this.store.marca.replace(/[']+/g, '');
    console.log('body', this.store);

    if (this.editar) {
      console.log('update');
      accion = 'update';
    }
    console.log('this.store', accion, this.store);

    this.appetito.guardarDato(`/post/stores/${accion}`, this.store)
                 .subscribe( resp => {
                   console.log('store guardado', resp);
                   this.traerStores();
                   this.limpiar();
                  }, err => {console.log('error', err);
                  });
  }

  limpiar() {
    this.store = {
                      id: 0,
                      marca: '',
                      sucursalID: this.id,
                      status: 1
                };
    this.editar = false;
  }


  selectStore(item) {
    this.store = item;
    console.log('store', this.store);
    this.editar = true;
  }

}



