import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { UsuarioModel } from 'src/app/model/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private conex: ConexionesService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.logout();
    this.loading = true;

    this.conex.getUsuarios()
        .subscribe( resp => {
          console.log(resp);
          this.usuarios = resp;
          this.loading = false;
    });

  }

  validarMail(form) {
    const mailForm = form.controls.mail["value"];
    const usuarioWeb = this.usuarios.find( user => user.mail === mailForm);
    if (usuarioWeb){
      console.log('encontré', usuarioWeb);
      this.usuario = usuarioWeb;
      this.showPassword = true;

    } else {
      console.log('error');
      this.error('Email no coincide', 'No encontramos ese correo, intentalo de nuevo por favor');
    }
  }

  validarPass(form) {
    const passForm = form.controls.pass["value"];
    console.log(passForm);
    if (passForm === this.usuario.password) {
      localStorage.setItem('nombre', this.usuario.nombre);
      localStorage.setItem('nivel', this.usuario.nivel.toString() );
      this.router.navigateByUrl('/conexiones');

    } else {
      this.error('Password equivocado', 'intentalo de nuevo');
    }
  }





  error(titulo, texto) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }




}
