import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Router, ActivatedRoute, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { TicketModel } from 'src/app/model/ticket.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  ticket: any = {
                  tipo: 'loading',
                  fecha: '',
                  hora: '',
                  consulta: '',
                  tecnico: '',
                };
  user;
  estado                  = true;

  mensajesSubscription: Subscription;
  elemento: HTMLElement;

  mensajes: any[]         = [];
  salas: any[]            = [];
  conectados: any[]       = [];

  sala: string;
  id: string;

  constructor(public chat: ChatService,
              public router: Router,
              public auth: AuthService,
              private route: ActivatedRoute,
              public ws: WebsocketService,
              public conex: ConexionesService) {

                this.sala = this.route.snapshot.paramMap.get('sala');
                this.id = this.route.snapshot.paramMap.get('ticket');

              }

  ngOnInit() {

    this.traerChat(); // Trae el ticket
    this.actualizarUsuario();
    this.getConectados();

    this.conex.sonido('home.mp3');

    // funcion para tomar el div del chat y bajar cuando entra un mensaje
    this.elemento = document.getElementById('chat-mensajes');

    // trae los mensajes desde el socket
    this.mensajesSubscription = this.chat.getMessages().subscribe( msg => {
      this.conex.sonido('mensaje.mp3');
      this.mensajes.push(msg);
      console.log('aca', this.mensajes);

      // this.actualizarTicket(this.id); //  <-- Guarda los mensajes en la bd para respaldo
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });


    this.escucharCierre();

  }

  ngOnDestroy() {
    this.user.sala = 'sin-sala';
    this.ws.loginWs(this.user);
    this.mensajesSubscription.unsubscribe();

    // if (localStorage.getItem('noLeidosT')) {
    //   localStorage.removeItem('noLeidosT');
    // }
  }

  traerChat() {
    this.conex.getDato(`/Tickets/`, this.id)
              .subscribe(resp => {
                this.ticket = resp;
                console.log('ticket', this.ticket);
                for (const mensaje of resp['historial']) {
                  this.mensajes.push(mensaje);
                }
                this.actualizarTicket(this.id);
              });
  }

  actualizarTicket(id) {
    console.log('actualizado ticket', this.user.id);
    this.ticket.tecnico = this.user.id;
    this.conex.actualizarTicket(this.ticket, `/Tickets/${id}`)
              .subscribe(resp => {
                console.log('ticket actualizado');
              });
  }


  actualizarUsuario() {
    if (localStorage.getItem('usuarioM')) {
      this.user = JSON.parse(localStorage.getItem('usuarioM'));
      this.sala = this.sala;
      this.user.sala = this.sala;
      this.ws.loginWs(this.user);
      console.log('estoy en la sala', this.user);

    } else {
        this.auth.logout();
        this.router.navigateByUrl('/login');
    }
  }

  enviar() {
    if (this.texto.trim().length < 1) {
      return;
    }

    const  now = new Date();
    const hora = now.toLocaleTimeString();

    this.chat.sendMessage(this.user.id, this.user.nombre, this.texto, this.user.sala, hora, 'Gour-net');
    this.texto = '';
  }

  escucharCierre() {
    this.chat.getClose().subscribe( resp => {
      console.log('ticket cerrado', resp);
      this.estado = false;
      this.alertCerrado(`El cliente ya cerró el ticket de ${this.sala}, gracias por tu asistencia!`);
      this.router.navigateByUrl('/home');
    });
  }


  getConectados() {
    console.log('estoy en', this.sala);
    this.chat.getUsuariosActivos().subscribe( resp => {
      this.conectados = [];
      for ( const item of resp) {
        if (item.sala === this.sala) {
          this.conectados.push(item);
        }
      }
      console.log(this.conectados);
    });
  }


  async cerrarTicket() {
    this.conex.sonido('klick.mp3');
    this.ticket.cerrado = this.user.id;
    this.ticket.tiempo = await this.calcularTiempo();
    this.ticket.valoracion = 2.5;
    this.alertCerrado(`El ticket demoró: ${this.ticket.tiempo} mins en ser resuelto`);
    this.actualizarTicket(this.id);
    this.router.navigateByUrl('/home');
  }


     // Calcula los minutos transcurridos entre que empezó el chat y que se cerró
     async calcularTiempo() {
      const now = new Date();
      this.ticket.horaFin = now.toLocaleTimeString();

      const ini: any = new Date(this.ticket.fecha + ' ' + this.ticket.horaIni);
      const fin: any = new Date(now.toDateString() + ' ' + this.ticket.horaFin);

      const diff = Math.abs(fin - ini);
      return Math.floor((diff / 1000) / 60);

    }


    solicitarCierre() {
      console.log(this.texto);
      this.texto = 'CerrarTicket99';
      this.enviar();
    }

  // ============================================================================ //
  // ============================================================================ //
  // ================================== WARNINGS ================================ //
  // ============================================================================ //
  // ============================================================================ //


  alertCerrado(texto) {
    Swal.fire({
      title: 'Ticket Cerrado',
      text: texto,
      icon: 'success'
    });
  }



}
