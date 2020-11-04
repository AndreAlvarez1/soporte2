import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificadorService {



  public url = 'http://www.localhost';
  public port = '3061';
  public urlSocket = 'https://webhook.clubgournet.cl';

  constructor(private http: HttpClient) { }



  traeDatos( ruta ) {
    return this.http.get( this.url + ':' + this.port + ruta );
 }

 statusUber(namespace, orden) {
   return this.http.get( `${this.urlSocket}/uber/send/${namespace}/${orden}`);
 }

 anularUber(storeId, orderId) {
  return this.http.get( `${this.urlSocket}/cancel/${storeId}/${orderId}?reason=RESTAURANT_TOO_BUSY&comments=No%20se%20puede%20procesar`);
 }
}
