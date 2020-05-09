import { Component, OnInit } from '@angular/core';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  loading = true;
  horarios = [];
  hoy = new Date().getDay();
  admin = false;

  constructor(private conex: ConexionesService,
              private auth: AuthService) { }

  day = {
          Dia: '',
          Inicio: '',
          Fin: '',
          id: ''
        };

  ngOnInit() {
    this.admin = this.auth.esAdmin();
    this.traerHorarios();
    console.log(this.hoy);
  }

  traerHorarios() {
    this.conex.getDatos('Horarios')
    .subscribe( resp => {
      this.horarios = resp;
      console.log('horarios', this.horarios);
      this.selectDia(this.horarios[this.hoy]);
      this.loading = false;
  });
  }

  selectDia(dia) {
    console.log(dia);
    this.day = dia;
  }

  guardar(form: NgForm) {
    console.log('dia', this.day);

    if (!this.admin) {
      return;
    }

    if (form.invalid) {
      return;
    }

    if ( this.day.Inicio > this.day.Fin) {
      this.error('El horario de inicio debe ser antes del horario de cierre');
      return;
    }

    Swal.fire({
          title: 'Espere',
          text:  'Enviando Noticia',
          icon:  'info',
          confirmButtonText: 'Ok'
        });
    Swal.showLoading();

    this.conex.actualizarDato('Horarios', this.day.id, this.day)
                  .subscribe( resp => {
                          Swal.close();
                          this.alertOk();
                          this.traerHorarios();
                        });

  }


  // ============================================================================ //
  // ============================================================================ //
  // ================================== WARNINGS ================================ //
  // ============================================================================ //
  // ============================================================================ //


  error(texto) {
    Swal.fire({
      title: 'Cueeec',
      text: texto,
      icon: 'error'
    });
  }

  alertOk() {
    Swal.fire({
      title: 'All right',
      text: 'Horario actualizado',
      icon: 'success'
    });
  }

}
