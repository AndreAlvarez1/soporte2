import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppetitoService } from 'src/app/services/appetito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  loading = true;
  marcas: any[]        = [];
  searchString: string;
  marca = {
            id: 0,
            name: '',
            status: 1
          };
  editar = false;

  constructor(private appetito: AppetitoService,
              private router: Router) { 
                this.traerMarcas();
              }

  ngOnInit() {
  }


  traerMarcas(){
    console.log('traigo marcas');
    this.appetito.traeDatos('/marcas').subscribe( resp => {
      console.log('respuesta', resp);
      this.marcas = resp['datos'];
      this.loading = false;
    });
  }


  selectMarca(m){
    this.marca = m;
    this.editar = true;
    console.log('this.marca', this.marca);
  }




  guardar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    let accion = 'insert';

    this.marca.name = this.marca.name.replace(/[']+/g, '');
    console.log('body', this.marca);

    if (this.editar) {
      console.log('update');
      accion = 'update';
    }

    this.appetito.guardarDato(`/post/marcas/${accion}`, this.marca)
                 .subscribe( resp => {
                   console.log('marca guardado', resp);
                   this.ok('Guardado con exito');
                   this.traerMarcas(); 

                  }, err => {console.log('error', err);
                  });
  }

  abrirMarca() {
    this.router.navigateByUrl(`/appetito/sucursales/${this.marca.id}`);
  }



  limpiar() {
    this.marca = {
      id: 0,
      name: '',
      status: 1
    };
    this.editar = false;
  }

  ok(texto) {
    Swal.fire({
    title: 'Ok',
    text: texto,
    icon: 'success',
    confirmButtonText: 'Ok'
    });
  }
}
