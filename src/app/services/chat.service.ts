import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public ws: WebsocketService) { }


  sendMessage(id: string, de: string, mensaje: string, sala: string, hora: string, cliente: string) {
    const payload = {
                      id,
                      de,
                      cuerpo : mensaje,
                      sala,
                      hora,
                      cliente
                   };

    this.ws.emit('mensaje-sala', payload);
  }

  getMessages() {
    return this.ws.listen('mensaje-nuevo');
  }

  getPrivates() {
    return this.ws.listen('mensaje-privado');
  }
 
  getClose() {
    return this.ws.listen('close-ticket');
  }

  getUsuariosActivos() {
    return this.ws.listen('usuarios-activos');
  }
 
  emitirUsuarioActivos() {
    this.ws.emit('obtener-usuarios');
  }
}
