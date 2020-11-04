import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias: any = [];
  loading = false;
  admin = true;
  searchString: string;
  hoy = new Date();

  firstDay: any  = new Date(this.hoy.getTime() - 5259500000); // Hace Dos meses
  lastDay: any = new Date(this.hoy.getFullYear(), this.hoy.getMonth() + 1, 0);




  constructor(public conex: ConexionesService,
              public auth: AuthService,
              public router: Router,
              public fechas: FechasService ) {

              this.loading = true;
              this.admin = this.auth.esAdmin();

              this.firstDay = this.fechas.modificarFecha(this.firstDay);
              this.lastDay = this.fechas.modificarFecha(this.lastDay);
              }



  ngOnInit() {
    if (!this.admin) {
      this.router.navigateByUrl('/home');
    }
    this.traerNoticias(this.hoy.getTime() - 5259500000, this.hoy.getTime());
  }

  traerNoticias(ini, fin) {
    this.conex.getDatosFiltrados('Noticias', `orderBy="mm"&startAt=${ini}&endAt=${fin}` )
    .subscribe( resp => {
      this.noticias = resp.reverse();
      // console.log('noticias', this.noticias);
      this.loading = false;
  });
  }


  abrirNoticia(noticia) {
    this.router.navigateByUrl(`/noticia/${noticia.id}`);
  }

  buscar(value) {
    const ini = new Date(this.firstDay).getTime();
    const fin = new Date(this.lastDay).getTime();
    this.traerNoticias(ini, fin);
  }

  iniciodelostiempos() {
    const diaCero = 1583592939613;
    this.traerNoticias(diaCero, this.hoy.getTime());
  }

}
