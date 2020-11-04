import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConexionesService } from 'src/app/services/conexiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs: Observable<any>;
  salas: any[] = [];

  constructor(public chat: ChatService,
              public router: Router,
              public conex: ConexionesService) { }

  ngOnInit() {
   this.usuariosActivosObs = this.chat.getUsuariosActivos();
   this.chat.emitirUsuarioActivos();
   this.crearSalas();

   setInterval(() => {
      this.alarmaEspera();
      }, 30000);
   }

  irSala(usuario) {
    console.log('usuario', usuario);
    this.router.navigateByUrl(`/chat/${usuario.sala}/${usuario.ticket}`);
  }

  crearSalas() {
    this.chat.getUsuariosActivos().subscribe( resp => {
      this.salas = [];
      for ( const item of resp) {
        const existe = this.salas.find( s => s.sala === item.sala);
        if (existe) {
          existe.conectados ++;
        } else {
          const chat = {
                        sala: item.sala,
                        conectados: 1
                        };
          this.salas.push(chat);
        }
      }
    });
  }

  alarmaEspera() {
    let contador = 0;
    console.log('reviso si hay clientes esperando', contador);

    for ( const salon of this.salas) {
        if ( salon.sala !== 'sin-sala' && salon.sala !== 'Gour-net') {
          if (salon.conectados < 2) {
            console.log('acaa', salon.sala);
            contador ++;
            }
        }
    }

    if (contador > 0 ) {
      console.log('contador', contador);
      this.conex.sonido('loading.mp3');
      this.alertaCliente();
    }
  }


  alertaCliente() {
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
      icon: 'warning',
      title: 'Cliente esperando',
    });
  }



}
