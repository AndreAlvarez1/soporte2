import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FechasService } from 'src/app/services/fechas.service';
import { NotificadorService } from 'src/app/services/notificador.service';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {

  loading = true;
  loading2 = false;
  loading3 = false;
  searchString: string;
  searchString2: string;

  locales: any[] = [];
  local: any;

  hoy               = new Date();
  firstDay: any     = new Date();
  lastDay: any      = new Date();
  // firstDay: any     = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);
  // lastDay: any      = new Date(this.hoy.getFullYear(), this.hoy.getMonth() + 1, 0);
  
  verLocal = false;
  uber: any;

  orders: any[] = [];
  order: any;
  cantOrders = 0;

  modalPedido = false;

  constructor(private notificador: NotificadorService,
              private fechas: FechasService) {
                this.ordersHoy();
                this.getLocales();
  }

  ngOnInit() {
  }

  info() {
    console.log('fecha ini', this.firstDay);
    console.log('fecha fin', this.lastDay);
    console.log('local', this.local);
    console.log('orders', this.orders);
  }


  ordersHoy(){ 
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.firstDay = this.fechas.modificarFecha(this.firstDay);
    this.lastDay = this.fechas.modificarFecha(tomorrow);}


  getLocales() {
    this.notificador.traeDatos('/stores')
                    .subscribe( resp => {
                      this.locales = resp['datos'];
                      this.loading = false;
                    });
  }

  selectLocal(l) {
    this.verLocal = true;
    console.log('local', l);
    this.local = l;
    this.notificador.statusUber(l.local, 'status')
                    .subscribe( resp => {
                      if (resp[0] === 'company not found'){
                        this.uber = undefined;
                        this.orders = [];
                        this.cantOrders = 0;
                        return;
                      }
                      this.uber =  resp;
                      this.loading2 = false;
                      this.getOrders(this.local.id, this.firstDay, this.lastDay);
                      console.log('uber', this.uber);
                    }, err => {
                      this.uber =  undefined;
                      console.log('error uber', err.error);
                    });

  }

  filtrar(f: NgForm){
    console.log('first', this.firstDay);
    console.log('last', this.lastDay);
    this.getOrders(this.local.id, this.firstDay, this.lastDay);
  }

  getOrders(store, fechaIni, fechaFin) {
    this.loading3 = true;
    this.orders = [];
    this.cantOrders = 0;
    this.notificador.traeDatos(`/ordersXfecha/${store}/${fechaIni}/${fechaFin}`)
        .subscribe( resp => {
            console.log('orders', resp);
            this.loading3 = false;
            this.orders = resp['datos'];
            this.cantOrders = this.orders.length;
          });
  }

  selectOrder(order) {
    console.log('order', order);
    this.order = order;
    this.order.detalle = JSON.parse(order.feed);
    this.modalPedido = true;
    console.log('detalle', this.order.detalle);
  }





// =========================================================================================== //
// =========================================================================================== //
// ============================= Funciones UBER ============================================== //
// =========================================================================================== //
// =========================================================================================== //



  activarTienda() {
    console.log('pos_integration_enabled', this.uber.pos_integration_enabled);
    console.log('local', this.local);
    if (this.uber.pos_integration_enabled) {
      this.notificador.statusUber(this.local.local, 'offline')
                      .subscribe( resp => { console.log('offline'); this.refrescarStatus(this.local); });
    } else {
      this.notificador.statusUber(this.local.local, 'online')
                      .subscribe( resp => { this.refrescarStatus(this.local);
                      }, err => { this.refrescarStatus(this.local);
                      });
    }

  }

  refrescarStatus(l) {
    console.log('refresco');
    this.notificador.statusUber(l.local, 'status')
                    .subscribe( resp => {
                      if (resp[0] === 'company not found') {
                        this.uber = undefined;
                        this.orders = [];
                        this.cantOrders = 0;
                        return;
                      }
                      this.uber =  resp;
                      console.log('uber', this.uber);
                    }, err => {
                      this.uber =  undefined;
                      console.log('error uber', err.error);
                    });
  }

  anularUber(){
    this.notificador.anularUber(this.order.restaurant_id, this.order.id)
        .subscribe( resp => {
          console.log('resp', resp);
          this.modalPedido = false;
          this.getOrders(this.local.id, this.firstDay, this.lastDay);

        }, err => {
          console.log('error', err);
          this.modalPedido = false;
        });
    }
}
