import { Component, OnInit } from '@angular/core';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { NoticiaModel } from 'src/app/model/noticia.model';
import { WebsocketService } from 'src/app/services/websocket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  usuario = JSON.parse(localStorage.getItem('usuarioM'));
  date = new Date();
  hoy = '';
  noticias: any[] = [];
  pasado = this.date.getTime() - 5259500000; // resto 2 meses en milisegundos a la fecha de hoy.
  indicadores = {
                bitcoin: 0,
                uf: 0,
                dolar: 0,
                euro: 0,
                desempleo: 0,
                cobre:0,
                imacec:0
                };

  constructor( private conex: ConexionesService,
               private ws: WebsocketService) {

    this.formatoFecha();
   }

  ngOnInit() {
    this.traerNoticias();
    this.getIndicadores();
    this.escucharNoticias();

  }


  getIndicadores() {
    this.conex.apiFinansas()
        .subscribe( resp => {
      // this.indicadores = resp;
      this.indicadores.bitcoin = resp['bitcoin'].valor;
      this.indicadores.uf = resp['uf'].valor;
      this.indicadores.dolar = resp['dolar'].valor;
      this.indicadores.euro = resp['euro'].valor;
      this.indicadores.desempleo = resp['tasa_desempleo'].valor;
      this.indicadores.cobre = resp['libra_cobre'].valor;
      this.indicadores.imacec = resp['imacec'].valor;
      console.log('indicadores', resp);
    });
  }

  traerNoticias() {
    this.conex.getDatosFiltrados('Noticias', `orderBy="mm"&startAt=${this.pasado}&endAt=${this.date.getTime()}` )
    .subscribe( resp => {
              this.filtrarNoticias(resp);
    });
  }

  filtrarNoticias(datos) {
    this.noticias = [];
    let contador = 0;
    for (const noticia of datos) {
      if ( contador > 9) {
        return;
      }
      if ( noticia.para === this.usuario.nombre || noticia.para === 'gournet') {
        contador ++;
        this.noticias.unshift(noticia);
      }

    }
    this.loading = false;


  }

 

  escucharNoticias() {
    this.ws.listen('noticias').subscribe( resp => {
       const noticia: NoticiaModel = resp;
       if (noticia.para === this.usuario.razon || noticia.para === 'todos') {
         this.traerNoticias();
       } else {
         return;
       }
    });
  }




  formatoFecha() {
    const d = this.date.getDay();
    const dd = this.date.getDate();
    const m = this.date.getMonth();
    const y = this.date.getFullYear();

    const dia = this.diaWord(d);
    const mes = this.mesWord(m);
    this.hoy = this.diaWord(d) + ' ' + dd + ' de ' + this.mesWord(m);
  }

  diaWord(numero) {
    let day = '';

    switch ( numero ) {
      case 0:
        day = 'Domingo';
        break;
      case 1:
        day = 'Lunes';
        break;
      case 2:
         day = 'Martes';
         break;
      case 3:
        day = 'Miércoles';
        break;
      case 4:
        day = 'Jueves';
        break;
      case 5:
        day = 'Viernes';
        break;
      case 6:
        day = 'Sábado';
    }
    return day;
    }

mesWord(numero) {
  let mes = '';

  switch ( numero ) {
    case 0:
      mes = 'Enero';
      break;
    case 1:
      mes = 'Febrero';
      break;
    case 2:
       mes = 'Marzo';
       break;
    case 3:
      mes = 'Abril';
      break;
    case 4:
      mes = 'Mayo';
      break;
    case 5:
      mes = 'Junio';
      break;
    case 6:
      mes = 'Julio';
      break;
    case 7:
      mes = 'Agosto';
      break;
    case 8:
      mes = 'Septiembre';
      break;
    case 9:
      mes = 'Octubre';
      break;
    case 10:
      mes = 'Noviembre';
      break;
    case 11:
      mes = 'Diciembre';
      break;
  }
  return mes;
  }





}
