import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppetitoService } from 'src/app/services/appetito.service';
import { SucursalModel } from 'src/app/model/sucursal.model';
import { StoreModel } from 'src/app/model/store.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  id: any;
  searchString: string;
  editar = false;
  stores: any[] = [];
  sucursal: SucursalModel = new SucursalModel();
  store: StoreModel = new StoreModel();


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

  info() {
    console.log('sucursal', this.sucursal);
    console.log('stores', this.stores);
    console.log('store', this.store);
    console.log('editar', this.editar)
  }

  traerSucursales() {
    console.log('traigo sucursales');
    this.appetito.traeDatos('/sucursales').subscribe( resp => {
      const sucursales = resp['datos'];
      this.sucursal = sucursales.find( s => s.id === this.id);
      this.store.marcaId = this.sucursal.marcaId;
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

    // this.store.marca = this.store.marca.replace(/[']+/g, '');
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
                   this.alertOk('grabado con exito');
                  }, err => {console.log('error', err);
                  });
  }

  limpiar() {
    this.store = new StoreModel();
    this.store.marcaId = this.sucursal.marcaId;

  }


  selectStore(item) {
    this.store = item;
    console.log('store', this.store);
    this.editar = true;
  }


  cambiarEstado(tipo, valor){
    let newValor = valor;
    if (valor === 1){
      newValor = 0;
    } else{
      newValor = 1
    };

    console.log('objeto', tipo);
    console.log('valor', valor);
    switch (tipo) {
      case 'status': 
        this.store.status = newValor;
        break;
      case 'delivery': 
        this.store.delivery = newValor;
        break;
      case 'delivery': 
        this.store.pickup = newValor;
        break;
      case 'efectivo': 
        this.store.efectivo = newValor;
        break;
      case 'redcompra': 
        this.store.redcompra = newValor;
        break;
      case 'webpay': 
        this.store.webpay = newValor;
        break;
      case 'mercadopago': 
        this.store.mercadopago = newValor;
        break;
      case 'logistics': 
        this.store.logistics = newValor;
        break;

    }

  }



  alertOk(texto) {
    Swal.fire({
    title: 'Ok',
    text: texto,
    icon: 'success',
    confirmButtonText: 'Ok'
   });
  }


}



