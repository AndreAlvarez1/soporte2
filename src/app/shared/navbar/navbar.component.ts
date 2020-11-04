import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { NoticiaModel } from 'src/app/model/noticia.model';
import { ConexionesService } from 'src/app/services/conexiones.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin = false;
  usuario = { mail: '',
              nivel: 0,
              nombre: '',
              password: '',
              id: '',
              cliente: '',
              sala: ''
            };

  constructor(private auth: AuthService,
              public ws: WebsocketService,
              private conex: ConexionesService) {

                if (localStorage.getItem('usuarioM')) {
                  this.usuario = JSON.parse(localStorage.getItem('usuarioM'));
                  if (JSON.parse(localStorage.getItem('usuarioM')).nombre === '') {
                    console.log('tamos mal', );
                  }
                }
              }

  ngOnInit() {
    this.admin = this.auth.esAdmin();
    this.getNoticias();
    // this.getClienteConectado();
    this.getPrivados();
  }


  cerrarSesion() {
    this.ws.logoutWs();
 }

 getNoticias() {
   this.ws.listen('noticias').subscribe( resp => {
      const noticia: NoticiaModel = resp;
      if (noticia.para === this.usuario.nombre || noticia.para === 'gournet') {
        this.alertaNoticia(noticia);
      } else {
        return;
      }
   });
 }

// getClienteConectado() {
//   this.ws.listen('usuarios-activos').subscribe( resp => {
//     console.log('Se conectó un cliente', resp);
//     for ( const client of resp) {
//       if ( client.cliente !== 'Gour-net') {
//         this.alertaCliente(client);
//       }
//     }
//   });
// }

getPrivados() {
  this.ws.listen('mensaje-privado').subscribe( resp => {
    this.alertaMensaje(resp);
  });
}

//  getConectados() {
//   console.log('estoy en', this.sala);
//   this.chat.getUsuariosActivos().subscribe( resp => {
//     this.conectados = [];
//     for ( const item of resp) {
//       if (item.sala === this.sala) {
//         this.conectados.push(item);
//       }
//     }
//     console.log(this.conectados);
//   });
// }


// alertaCliente(client) {
//   this.conex.sonido('notificacion.mp3');
//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     onOpen: (toast) => {
//       toast.addEventListener('mouseenter', Swal.stopTimer);
//       toast.addEventListener('mouseleave', Swal.resumeTimer);
//     }
//   });

//   Toast.fire({
//     icon: 'warning',
//     title: 'Nuevo Ticket',
//     text: client.cliente
//   });
// }

alertaNoticia(noticia) {
  this.conex.sonido('notificacion.mp3');
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: 'success',
    title: 'Nueva Noticia',
    text: noticia.titulo
  });

}

alertaMensaje(info) {
  this.conex.sonido('metalgear.mp3');
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: 'info',
    title: 'Mensaje de ' + info.de,
    text: info.cuerpo
  });

}





}
