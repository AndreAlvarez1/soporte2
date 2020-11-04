import { Component, OnInit } from '@angular/core';
import { ConexionesService } from 'src/app/services/conexiones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { ClienteModel } from 'src/app/model/cliente.model';
import { LocalModel } from 'src/app/model/local.model';
import Swal from 'sweetalert2';
import { LicenciaModel } from 'src/app/model/licencia.model';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  id: string;
  uf = 0;
  Total = 0;

  admin = false;
  cliente = new ClienteModel();
  local = new LocalModel();
  licencia: any[] = [];

  modalLicencia = false;
  productos = ['Gour-net', 'Soporte', 'Inventarios', 'Producción', 'Tablet', 'Notificador', 'Carta Digital', 'Facturación Electrónica'];
  monedas = ['CL $', 'UF'];

  newLicencia = new LicenciaModel();
  newLocal = new LocalModel();
  // newLocal = {
  //                 name: '',
  //                 dir: '',
  //                 namespace: '',
  //                 licencias: []
  //               };


  constructor( private conex: ConexionesService,
               private route: ActivatedRoute,
               private router: Router,
               private auth: AuthService ) {
                this.getUf();
               }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.admin = this.auth.esAdmin();
    if ( this.id !== 'nuevo') {
        this.getDatos();
  }
}

info() {
  console.log('cliente', this.cliente);
}


getUf() {
    this.conex.apiFinansas()
      .subscribe( resp => {
        this.uf = resp['uf'].valor;
      });
}

getDatos() {
    this.conex.getDato('Clientes', this.id)
        .subscribe( (resp: any) => {
          this.cliente = resp;
          this.cliente.id = this.id;
          if (resp.Locales) {
            this.filtrarLocales(resp.Locales);
          }
          console.log('cliente', this.cliente);
        });
}


  filtrarLocales(locales) {
    this.cliente.Locales = this.conex.crearArreglo(locales);

    for ( const l of this.cliente.Locales) {
      let prev: any[] = [];
      if (l.Licencias) {
        prev = this.conex.crearArreglo(l.Licencias);
        l.Licencias = prev;
      }
    }
    this.local = this.cliente.Locales[0];
    this.sumaLicencias();

  }


sumaLicencias() {
  let total = 0;
  for ( const local of this.cliente.Locales) {
    if (local.Licencias) {
      for (const lic of local.Licencias) {
        if (lic.moneda === 'UF') {
          const enPesos =  this.uf * Number(lic.precio) ;
          total += enPesos;
        } else {
          total += Number(lic.precio);
        }
      }
    }
  }

  this.Total = total;
}


  selectLocal(value) {
    console.log('value', value);
    this.local = this.cliente.Locales.find( f => f.name === value);
    console.log('seleccione', this.local);
  }

  guardar( form: NgForm) {
    if (form.invalid) {
      this.error();
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Info',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
    Swal.showLoading();

    if (this.cliente.id ) {
      console.log('actualizar', this.cliente);
      this.conex.actualizarDato('/Clientes', this.id, this.cliente)
                            .subscribe( resp => {
                              console.log('actualizado', resp);
                              Swal.fire({
                                    title: 'Actualizado' ,
                                    text: 'Datos guardados con Exito',
                                    icon: 'success'
                                  });
                            });
    } else {
      console.log('crear', this.cliente);
      this.conex.guardarDato(`/Clientes`, this.cliente)
                .subscribe( resp => {
                  console.log('guardé cliente', resp.id);
                  Swal.fire({
                          title: this.cliente.Marca ,
                          text: 'Datos guardados con Exito',
                          icon: 'success'
                          });
                  this.router.navigateByUrl(`/clientes`);
                });
    }
 }


// ========================================================================= //
// ========================================================================= //
// ========================================================================= //
// =============================== Locales ================================= //
// ========================================================================= //
// ========================================================================= //
// ========================================================================= //

guardarLocal(f: NgForm) {
  console.log('form', this.newLocal);
  this.conex.guardarDato(`/Clientes/${this.id}/Locales`, this.newLocal)
          .subscribe(resp => {
             if ( !this.cliente.Locales ) {
              this.cliente.Locales = [];
             }
             this.cliente.Locales.push(this.newLocal);
             this.selectLocal(this.newLocal.name);
          });
}


borrarLocal() {
  this.cliente.Locales  = this.cliente.Locales.filter( l => l.id !== this.local.id);

  this.conex.actualizarDato('/Clientes', this.id, this.cliente)
      .subscribe( resp => {
      Swal.fire({
            title: 'Actualizado' ,
            text: 'Datos guardados con Exito',
            icon: 'success'
          });
      this.getDatos();
    });
}





// ========================================================================= //
// ========================================================================= //
// ========================================================================= //
// =============================== LICENCIAS =============================== //
// ========================================================================= //
// ========================================================================= //
// ========================================================================= //

editarLicencia(licencia) {
  this.modalLicencia = true;
  this.licencia = licencia;
}

guardarLicencia(f: NgForm) {
  console.log('form', this.newLicencia);
  this.conex.guardarDato(`/Clientes/${this.id}/Locales/${this.local.id}/Licencias`, this.newLicencia)
          .subscribe(resp => {
             if ( !this.local.Licencias ) {
               this.local.Licencias = [];
             }
             this.local.Licencias.push(this.newLicencia);
             this.sumaLicencias();
             this.newLicencia = new LicenciaModel();
          });
}


borrarLicencia(licencia) {
    this.local.Licencias  = this.local.Licencias.filter( l => l.id !== licencia.id);
    this.conex.actualizarDato('/Clientes', this.id, this.cliente)
    .subscribe( resp => {
      Swal.fire({
            title: 'Actualizado' ,
            text: 'Datos guardados con Exito',
            icon: 'success'
          });
    });

}


alertaBorrarLocal() {
    Swal.fire({
      title: 'Estás seguro?',
      text: `Estas seguro que quieres borrar a ${this.local.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(resp => {
      if ( resp.value ) {
            this.borrarLocal();
      }
    });
}


error() {
  Swal.fire({
  title: 'Error',
  text: 'Rellena todos los campos por favor',
  icon: 'error',
  confirmButtonText: 'Ok'
  });
}

}
