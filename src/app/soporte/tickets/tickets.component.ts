import { Component, OnInit } from '@angular/core';
import { FechasService } from 'src/app/services/fechas.service';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  loading = false;
  hoy = new Date();
  searchString: string;

  firstDay: any  = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);
  lastDay: any = new Date(this.hoy.getFullYear(), this.hoy.getMonth() + 1, 0);
  ticketsAll = [];
  tickets = []
  usuarios          = [];

  constructor( private fechas: FechasService,
               private conex: ConexionesService,
               private router: Router) {
               this.traerTeam();
               this.firstDay = this.fechas.modificarFecha(this.firstDay);
               this.lastDay = this.fechas.modificarFecha(this.lastDay);

      }

  ngOnInit() {
    this.traerTickets(this.firstDay, this.lastDay);
  }

  traerTeam() {
    this.conex.getUsuarios()
              .subscribe( resp => {
                this.usuarios = resp;
              });

  }


  filtrar(f) {
    const locales = localStorage.getItem('mislocales');
    this.firstDay = f.value["fechaIni"]
    this.lastDay = f.value["fechaFin"]
    this.traerTickets(this.firstDay, this.lastDay);
    }


    traerTickets(fechaIni, fechaFin) {
      this.loading = true;

      const ini = new Date(fechaIni).getTime();
      const fin = new Date(fechaFin).getTime();
      this.conex.getDatosFiltrados('Tickets', `orderBy="mm"&startAt=${ini}&endAt=${fin}` )
                .subscribe( resp => {
                  this.ticketsAll = resp.reverse();
                  this.tickets = this.ticketsAll;
                  this.agregarNombres(this.tickets);
                  this.loading = false;
                }, err => {
                  console.log(err.error);
                  this.loading = false;
                });
    }

    selectTicket(ticket) {
      this.router.navigateByUrl(`soporte/ticket/${ticket.id}`);
    }

    estrellas(value) {
      if (value === 'Filtrar por valoración') {
        return;
      }

      const numero = Number(value);
      this.tickets = this.ticketsAll.filter( t => t.valoracion === numero);
    }

    agregarNombres(listado) {
      for (const item of listado) {
        const tecnico = this.usuarios.find ( u => u.id === item.tecnico);
        if (tecnico) {
          item.tecnico_name = tecnico.nombre;
        } else {
          item.tecnico_name = 'pendiente';
        }
      }
    }

}
