import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NoticiaModel } from 'src/app/model/noticia.model';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  id: string;
  loading = true;
  nuevo = true;
  searchString: string;

  user: any;
  date = new Date();

  noticia: any;
  clientes: any [] = [];
  team: any []     = [];

  modalClientes = false;
  modalTeam = false;



  constructor( private route: ActivatedRoute,
               private router: Router,
               private conex: ConexionesService,
               private ws: WebsocketService) {

              this.id = this.route.snapshot.paramMap.get('id');
              this.user = JSON.parse(localStorage.getItem('usuarioM'));

              if (this.id !== 'nueva') {
                  this.nuevo = false;
              }

              this.traerNoticia();
  }
  
  ngOnInit() {
  }

  traerNoticia() {
    this.noticia = new NoticiaModel();
    if (this.nuevo) {
      this.noticia = new NoticiaModel();
      this.noticia.fecha = this.date.toString();
      this.noticia.mm = this.date.getTime();
      this.noticia.de = this.user.nombre;
      this.loading = false;
    } else {
      this.conex.getDato('Noticias', this.id)
                .subscribe( resp => {
                  this.loading = false;
                  this.noticia = resp;
                });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if ( this.noticia.para === 'pendiente' ) {
      this.error('Eeepaaa', 'falta seleccionar a quien va dirigida la noticia');
      return;
    }

    Swal.fire({
          title: 'Espere',
          text:  'Enviando Noticia',
          icon:  'info',
          confirmButtonText: 'Ok'
        });
    Swal.showLoading();

    if (this.nuevo) {
        this.conex.guardarDato('Noticias', this.noticia)
                  .subscribe( resp => {
                          Swal.close();
                          this.ws.emit('nueva-noticia', this.noticia);
                          this.router.navigateByUrl(`/noticias`);
                          this.alertOk();
                    });
    } else {
       this.conex.actualizarDato('Noticias', this.id, this.noticia)
                  .subscribe( resp => {
                          Swal.close();
                          this.ws.emit('nueva-noticia', this.noticia);
                          this.router.navigateByUrl(`/noticias`);
                          this.alertOk();
                        });
         }

  }


  traerClientes() {
    this.loading = true;
    this.conex.getClientes()
        .subscribe( data => {
          this.loading = false;
          this.modalClientes = true;
          this.clientes = data["Data"];
        });
  }

  traerTeam() {
    this.loading = true;
    this.conex.getUsuarios()
              .subscribe( resp => {
                this.loading = false;
                this.modalTeam = true;
                this.team = resp;
              });


  }

  selectPara( tipo) {
    switch (tipo){
      case 'Team Gour-net':
          this.noticia.para = 'gournet';
          break;
      case 'Clientes':
          this.noticia.para = 'todos';
          break;
      case 'Cliente en Particular':
          this.noticia.para = 'pendiente';
          this.traerClientes();
          break;
      case 'Persona del Team':
          this.noticia.para = 'pendiente';
          this.traerTeam();
          break;
      case 'Selecciona a quien va dirigida la noticia':
          this.noticia.para = 'pendiente';
          break;
    }
  }

  selectCliente(value) {
    this.noticia.para = value.Razon;
    this.modalClientes = false;
  }

  selectPersona(value) {
    this.noticia.para = value.nombre;
    this.modalTeam = false;
  }


  // ============================================================================ //
  // ============================================================================ //
  // ================================== WARNINGS ================================ //
  // ============================================================================ //
  // ============================================================================ //


  error(titulo, mensaje) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning'
    });
  }

  alertOk() {
    Swal.fire({
      title: 'Impeque',
      text: 'Noticia enviada con exito',
      icon: 'success'
    });
  }

}
