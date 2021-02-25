import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppetitoService {




  // Local
  // public url = 'http://localhost';
  // public port = 3062;

  // Web
  public url = 'https://appetito-aa531.ue.r.appspot.com';
  public port = 3070;

  constructor(private http: HttpClient,
              private router: Router) { }


  // traeDatos( ruta ) {
  //               return this.http.get( this.url + ':' + this.port + ruta );
  // }

  // guardarDato(ruta, body) {
  //   return this.http.post( this.url + ':' + this.port + ruta , body );
  // }

  traeDatos( ruta ) {
                return this.http.get( this.url  + ruta );
  }

  guardarDato(ruta, body) {
    return this.http.post( this.url + ':' + this.port + ruta , body );
  }
}
