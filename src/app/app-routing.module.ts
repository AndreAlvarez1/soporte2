import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConexionesComponent } from './components/conexiones/conexiones.component';
import { ConexionComponent } from './components/conexion/conexion.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { VersionesComponent } from './components/versiones/versiones.component';
import { VersionComponent } from './components/version/version.component';
import { LoginComponent } from './components/login/login.component';
import { TokensComponent } from './components/tokens/tokens.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NoticiasComponent } from './admin/noticias/noticias.component';
import { NoticiaComponent } from './admin/noticia/noticia.component';
import { rutasSoporte } from './soporte/soporte.routes';
import { rutasAppetito } from './appetito/appetito.routes';
import { ClienteComponent } from './admin/cliente/cliente.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { ChatComponent } from './soporte/chat/chat.component';
import { LocalesComponent } from './notificador/locales/locales.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard]},
  { path: 'conexiones', component: ConexionesComponent, canActivate: [ AuthGuard]},
  { path: 'conexion/:id', component: ConexionComponent, canActivate: [ AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthGuard]},
  { path: 'usuario/:id', component: UsuarioComponent, canActivate: [ AuthGuard]},
  { path: 'versiones', component: VersionesComponent, canActivate: [ AuthGuard]},
  { path: 'version/:id', component: VersionComponent, canActivate: [ AuthGuard]},
  { path: 'tokens' , component: TokensComponent, canActivate: [ AuthGuard]},
  { path: 'noticias', component: NoticiasComponent, canActivate: [ AuthGuard]},
  { path: 'noticia/:id', component: NoticiaComponent, canActivate: [ AuthGuard]},
  { path: 'clientes', component: ClientesComponent, canActivate: [ AuthGuard]},
  { path: 'cliente/:id', component: ClienteComponent, canActivate: [ AuthGuard]},
  { path: 'chat/:sala/:ticket', component: ChatComponent, canActivate: [ AuthGuard]},
  { path: 'notificador/locales', component: LocalesComponent, canActivate: [ AuthGuard]},

  { path: 'soporte', children: rutasSoporte},
  { path: 'appetito', children: rutasAppetito},

  { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
