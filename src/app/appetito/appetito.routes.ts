import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { StoresComponent } from './stores/stores.component';
import { MarcasComponent } from './marcas/marcas.component';


export const rutasAppetito: Routes = [
  { path: 'sucursales', component: SucursalesComponent, canActivate: [ AuthGuard]},
  { path: 'sucursal/:id', component: SucursalComponent, canActivate: [ AuthGuard]},
  { path: 'stores', component: StoresComponent, canActivate: [ AuthGuard]},
  { path: 'marcas', component: MarcasComponent, canActivate: [ AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];


