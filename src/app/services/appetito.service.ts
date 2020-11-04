import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppetitoService {


  // public url = 'http://appetito.clubgournet.cl';
  // public port = 8080;

  // Local
  public url = 'http://localhost';
  public port = 3062;


  constructor(private http: HttpClient,
              private router: Router) { }


  traeDatos( ruta ) {
                return this.http.get( this.url + ':' + this.port + ruta );
  }

  guardarDato(ruta, body) {
    return this.http.post( this.url + ':' + this.port + ruta , body );

  }
}
