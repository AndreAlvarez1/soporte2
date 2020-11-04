import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor() { }

  modificarFecha(fecha) {
    const ano = (fecha.getFullYear()).toString();
    let mes = (fecha.getMonth() + 1).toString();
    let dia = (fecha.getDate()).toString();

    if ( mes.length < 2 ) {
      mes = '0' + mes;
    }

    if ( dia.length < 2 ) {
     dia = '0' + dia;
   }

    const fechaModif = ano + '-' + mes + '-' + dia;
    // console.log('fecha Modif', fechaModif);
    return fechaModif;
  }



  // ============================================ //
// ============================================ //
// ============== ARREGLA FECHAS ============== //
// ============================================ //
// ============================================ //

//  formatoFecha( fecha ) {
//   const dia        = fecha.slice( 8, 10 );
//   const mesPalabra = fecha.slice( 4, 7 );
//   const mesNumero  = this.mesAnumero( mesPalabra );
//   //
//   const anno = fecha.slice( 11, 15 );
//   const hora = fecha.slice( 16, 24 );

//   const fechaSql = anno+ '-' + mesNumero + '-' + dia;
//   return fechaSql;
// }


mesAnumero( mesAbreviado: any ) {
  let mesNum: any;
  switch (mesAbreviado) {
  case 'Jan': case 'Enero'      : mesNum = '01'; break;
  case 'Feb': case 'Febrero'    : mesNum = '02'; break;
  case 'Mar': case 'Marzo'      : mesNum = '03'; break;
  case 'Apr': case 'Abril'      : mesNum = '04'; break;
  case 'May': case 'Mayo'       : mesNum = '05'; break;
  case 'Jun': case 'Junio'      : mesNum = '06'; break;
  case 'Jul': case 'Julio'      : mesNum = '07'; break;
  case 'Aug': case 'Agosto'     : mesNum = '08'; break;
  case 'Sep': case 'Septiembre' : mesNum = '09'; break;
  case 'Oct': case 'Octubre'    : mesNum = '10'; break;
  case 'Nov': case 'Noviembre'  : mesNum = '11'; break;
  case 'Dec': case 'Diciembre'  : mesNum = '12';
  }
  return mesNum;
}
}
