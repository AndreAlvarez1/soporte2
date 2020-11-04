import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { UsuarioModel } from 'src/app/model/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = true;
  showPassword = false;
  usuarios: UsuarioModel[] = [];
  usuario: UsuarioModel;
  mail = '';

  constructor(private conex: ConexionesService,
              private router: Router,
              private auth: AuthService,
              private ws: WebsocketService) {

                if (localStorage.getItem('usuarioM')) {
                    this.mail =  JSON.parse(localStorage.getItem('usuarioM')).mail;
                    // if (JSON.parse(localStorage.getItem('usuarioM')).id !== '') {
                    //   console.log('hay datos');
                    //   this.ws.logoutWs();
                    // }
                }

               }

  ngOnInit() {
    this.auth.logout();
    this.loading = true;
    this.conex.getUsuarios()
        .subscribe( resp => {
          this.usuarios = resp;
          this.loading = false;
    });
  }


  validarMail(form) {
    const mailForm = form.controls.mail["value"];
    const usuarioWeb = this.usuarios.find( user => user.mail === mailForm);
    if (usuarioWeb) {
      this.usuario =  new UsuarioModel();
      this.usuario = usuarioWeb;
      this.usuario.cliente = 'Gour-net';
      this.usuario.sala = 'sin-sala';
      this.showPassword = true;
    } else {
      console.log('error');
      this.error('Email no coincide', 'No encontramos ese correo, intentalo de nuevo por favor');
    }
  }

  validarPass(form) {
    const passForm = form.controls.pass["value"];
    if (passForm === this.usuario.password) {
      localStorage.setItem('usuarioM', JSON.stringify(this.usuario));
      // this.router.navigateByUrl('/home');
      this.ws.loginWs(this.usuario);
      } else {
      this.error('Password equivocado', 'intentalo de nuevo');
    }
  }




 // WARNINGS


  error(titulo, texto) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }




}
