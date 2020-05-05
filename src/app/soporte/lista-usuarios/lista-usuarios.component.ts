import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs: Observable<any>;
  salas: any[] = [];

  constructor(public chat: ChatService,
              public router: Router) { }

  ngOnInit() {
   this.usuariosActivosObs = this.chat.getUsuariosActivos();
   this.chat.emitirUsuarioActivos();
   this.crearSalas();
  }

  irSala(usuario) {
    console.log('este', usuario);
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


}
