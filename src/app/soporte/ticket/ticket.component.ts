import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { TicketModel } from 'src/app/model/ticket.model';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  id: string;
  user;
  ticket: any = new TicketModel();
  modalEditar = false;
  mensajes = [];
  texto: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private conex: ConexionesService,
              private fechas: FechasService) {
              this.id = this.route.snapshot.paramMap.get('id');
              this.traerTicket();

              if (localStorage.getItem('usuarioM')) {
                this.user = JSON.parse(localStorage.getItem('usuarioM'));          
              }
  }

  ngOnInit() {
  }

  traerTicket() {
    this.conex.getDato('Tickets', this.id)
              .subscribe( resp => {
                console.log('ticket', resp);
                this.ticket = resp;
                this.mensajes = this.ticket.historial;
              });
  }

  guardar(f) {
     const now = new Date();
     const hoy = now.toLocaleDateString();
     const horaNow = now.toLocaleTimeString('en-US', { hour12: false,
                                                      hour: "numeric",
                                                      minute: "numeric"} );

     const msg = {
                    cliente: this.ticket.cliente,
                    cuerpo: '-- Post Cierre --' + this.texto,
                    de: this.user.nombre,
                    fecha: hoy,
                    hora: horaNow
     };

     this.mensajes.push(msg);
     this.actualizarTicket(this.id);
     this.modalEditar = false;
  }



  actualizarTicket(id) {
    this.ticket.historial = [];
    for (const msg of this.mensajes) {
      this.ticket.historial.push(msg);
    }
    this.conex.actualizarTicket(this.ticket, `/Tickets/${id}`)
              .subscribe(resp => {
                console.log('ticket actualizado');
                this.router.navigateByUrl('/soporte/tickets');
              });
  }

}
