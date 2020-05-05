import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario = '';
  date = new Date();
  hoy = '';

  constructor() {
    this.usuario = JSON.parse(localStorage.getItem('usuarioM'));
    this.formatoFecha();
   }

  ngOnInit() {
  }


  formatoFecha(){
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
