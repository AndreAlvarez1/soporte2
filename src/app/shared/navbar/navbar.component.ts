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
  user = JSON.parse(localStorage.getItem('usuarioM'));


  constructor(private auth: AuthService,
              public ws: WebsocketService,
              private conex: ConexionesService) { }

  ngOnInit() {
    this.admin = this.auth.esAdmin();
    this.getNoticias();
  }


  cerrarSesion() {
    this.ws.logoutWs();
 }

 getNoticias() {
   this.ws.listen('noticias').subscribe( resp => {
      const noticia: NoticiaModel = resp;
      if (noticia.para === this.user.nombre || noticia.para === 'gournet') {
        this.alertaNoticia(noticia);
      } else {
        return;
      }
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

alertaNoticia(noticia) {
  this.conex.sonido('notificacion.mp3')
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

}
