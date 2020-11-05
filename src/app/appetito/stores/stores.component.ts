import { Component, OnInit } from '@angular/core';
import { AppetitoService } from 'src/app/services/appetito.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StoreModel } from 'src/app/model/store.model';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {



store: StoreModel = new StoreModel();

stores: any[]        = [];
searchString: string;
editar = false;


  constructor(private appetito: AppetitoService,
              private router: Router,
              private route: ActivatedRoute) {
              }

  ngOnInit() {
    this.traerStores();

  }


traerStores() {
    console.log('traigo stores');
    this.appetito.traeDatos('/stores').subscribe( resp => {
      console.log('respuesta', resp);
      this.stores = resp['datos'];
    });
  }

  selectStore(item) {
    this.store = item;
    console.log('store', this.store);
    this.router.navigateByUrl(`/appetito/sucursal/${item.sucursalID}`);
  }


}
