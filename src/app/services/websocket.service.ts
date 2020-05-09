import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { UsuarioModel } from '../model/usuario.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // private url = 'http://localhost:5000'; // Dev
  private url = 'http://node.clubgournet.cl:9090'; // Produccion
  private socket;
  public usuario: UsuarioModel;
  public socketStatus = false;


  constructor(public auth: AuthService,
              public router: Router) {
            this.initSocketsIO();
            this.checkStatus();
            this.cargarStorage();
  }


  initSocketsIO() {
    this.socket = io(this.url,
    {
      reconnectionAttempts: 3,
      reconnectionDelay: 10000,
      transports: ['websocket']
    });
}

checkStatus() {
  this.socket.on('connect', () => {
    this.socketStatus = true;
    console.log('conectado');
    this.cargarStorage();
  });

  this.socket.on('disconnect', () => {
    this.socketStatus = false;
    console.log('desconectado');
  });
}

//////////////// SOCKET ON y EMIT ///////////////////////

public listen(evento) {
  return Observable.create(observer => {
    this.socket.on(evento, resp => {
      observer.next(resp);
    });
  });
}

emit( evento: string, payload?: any, callback?: any  ) {
  this.socket.emit( evento, payload, callback);
}



/////// FIN SOCKET ON  y EMIT///////

loginWs(usuario) {
  // console.log('LoginWs', usuario);
  this.emit('configurar-usuario', {usuario}, (resp) => {
    console.log('login resp', resp);
  });
}


logoutWs() {
  const usuario = JSON.parse(localStorage.getItem('usuarioM'));
  usuario.nombre = 'sin-nombre';
  usuario.sala = 'sin-sala';

  this.emit('configurar-usuario', {usuario}, ( resp: any ) => {
      // console.log('log out', resp);
      this.auth.logout();
      this.router.navigateByUrl('/login');
    });
}

cargarStorage() {
  if (localStorage.getItem('usuarioM')) {
    const usuario = JSON.parse(localStorage.getItem('usuarioM'));
    // console.log('CargarStorage', usuario);
    this.loginWs(usuario);
  }
}

usersActivos(evento) {
  this.socket.on(evento, resp => {
    // console.log('recibo', evento, resp);
    return resp;
  });
}


}
