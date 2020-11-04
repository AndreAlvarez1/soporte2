import { Component, OnInit } from '@angular/core';
import { FechasService } from 'src/app/services/fechas.service';
import { ConexionesService } from 'src/app/services/conexiones.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, SingleDataSet, Label } from 'ng2-charts';
import { NumberSymbol } from '@angular/common';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  loading           = false;
  hoy               = new Date();
  usuarios          = [];

  firstDay: any     = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);
  lastDay: any      = new Date(this.hoy.getFullYear(), this.hoy.getMonth() + 1, 0);
  tickets = [];

  //// CIFRAS
  resueltos         = 0;
  pendientes        = 0;
  notaPromedio      = 0;
  tiempoPromedio    = 0;
  tecnicos          = [];
  clientes          = [];
  
  ticketsDiarios    = [];
  ticketsPorCliente = [];
  public donutColors = [
    {
      backgroundColor: [
        '#D6425B',
        '#62A0EB',
        '#BB76AC',
        '#73E7F8',
        '#99CEF1',
        '#CF4C60',
      ]
    }
  ];


  public tiposLabels: Label[] = [];
  public tiposData: SingleDataSet = [];
  public dona: ChartType = 'doughnut';


  public personasOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public personasLabels: Label[] = [];
  public personasType: ChartType = 'bar';
  public personasLegend = true;
  public personasData: ChartDataSets[] = [
    { data: [], label: 'Tickets' },
  ];


  public diasOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public diasLabels: Label[] = [];
  public diasType: ChartType = 'line';
  public diasLegend = true;

  public diasData: ChartDataSets[] = [
    { data: [], label: 'Tickets' },
  ];



  constructor(private fechas: FechasService,
              private conex: ConexionesService) {

              this.firstDay = this.fechas.modificarFecha(this.firstDay);
              this.lastDay = this.fechas.modificarFecha(this.lastDay);
              this.traerTeam();
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
                            this.tickets = resp.reverse();
                            // this.tickets = this.ticketsAll;
                            console.log('tickets', this.tickets);
                            this.recorrerTickets();
                          }, err => {
                            console.log(err.error);
                            this.loading = false;
                          });
    }


  recorrerTickets() {
    this.borrarDatos();
    let nota       = 0;
    let tiempo     = 0;
    const tipos    = [];
    const personas = [];
    this.clientes  = [];
    const dias     = [];

    for (const ticket of this.tickets ) {

      // filtro para sacar las cifras tipo cantidad de tickets etc.
      if (ticket.valoracion > 0) {
        this.resueltos ++;
        nota += ticket.valoracion;
        tiempo += ticket.tiempo;
      } else {
        this.pendientes ++;
      }

      // Filtro los tickets por clientes
      const cliente = this.clientes.find( c => c.cliente === ticket.cliente);
      if (!cliente) {
        this.clientes.push({cliente: ticket.cliente, cantidad: 1});
      } else {
        cliente.cantidad ++;
      }

      // Filtro los tipos de ticket
      const tipo = tipos.find( t => t.tipo === ticket.tipo);
      if (!tipo) {
          tipos.push({tipo: ticket.tipo, cantidad: 1});
        } else {
          tipo.cantidad ++;
        }

      // Filtro los tickets por Persona
      const persona = personas.find( p => p.tecnico === ticket.tecnico);
      if (!persona) {
        const tecnico = this.usuarios.find ( u => u.id === ticket.tecnico);
        if (tecnico) {
          personas.push({tecnico: ticket.tecnico, tickets: 1, tiempo: ticket.tiempo, nota: ticket.valoracion, nombre: tecnico.nombre });
        }
      } else {
        persona.tickets ++;
        persona.nota += ticket.valoracion;
        persona.tiempo += ticket.tiempo;
      }

      // Filtro por dia
      const dia = dias.find( d => d.fecha === ticket.fecha);
      if (!dia ) {
        dias.push({fecha: ticket.fecha, tickets: 1});
      } else {
        dia.tickets ++;
      }

    }
    // fin del ciclo
    console.log('dias', dias);

    this.notaPromedio = nota / this.resueltos;
    this.tiempoPromedio = tiempo / this.resueltos;

    this.dibujarDona(tipos);
    this.dibujarBarrasPersonas(personas);
    this.dibujardias(dias);
    this.loading = false;
  }


  dibujarDona(valores) {
    const numeros = [];
    for (const item of valores) {
      this.tiposLabels.push(item.tipo);
      numeros.push(item.cantidad);
    }
    this.tiposData = numeros;
  }


  dibujarBarrasPersonas(valores) {
    this.tecnicos = valores;
    const numeros = [];
    for (const item of valores) {
        this.personasLabels.push(item.nombre);
        numeros.push(item.tickets);
    }
    this.personasData[0].data = numeros;
  }

  dibujardias(valores) {
    const numeros = [];
    for (const item of valores) {
        console.log('aca', new Date(item.fecha).toLocaleDateString('ar-EG'));
        this.diasLabels.push(new Date(item.fecha).toLocaleDateString());
        numeros.push(item.tickets);
    }
    this.diasData[0].data = numeros;

  }

 borrarDatos() {
   this.resueltos = 0;
   this.pendientes = 0;

 }



}
