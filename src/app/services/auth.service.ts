import { Injectable } from '@angular/core';
import { UsuarioModel } from '../model/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario = new UsuarioModel();

  constructor() {
  }


  estaAutenticado(): boolean {
    if (localStorage.getItem('nombre') ) {
      return true;
    }
  }

  esAdmin(): boolean {
    if ( localStorage.getItem('nivel') === '3') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('nombre');
    localStorage.removeItem('nivel');
  }



}
