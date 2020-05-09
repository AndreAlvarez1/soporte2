import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConexionesComponent } from './components/conexiones/conexiones.component';
import { ConexionComponent } from './components/conexion/conexion.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { VersionesComponent } from './components/versiones/versiones.component';
import { VersionComponent } from './components/version/version.component';
import { LoginComponent } from './components/login/login.component';
import { TokensComponent } from './components/tokens/tokens.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './soporte/chat/chat.component';
import { ListaUsuariosComponent } from './soporte/lista-usuarios/lista-usuarios.component';
import { NoticiasComponent } from './admin/noticias/noticias.component';

import { WebsocketService } from './services/websocket.service';
import { FilterPipe } from './pipes/filter.pipe';
import { NoticiaComponent } from './admin/noticia/noticia.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { HorariosComponent } from './soporte/horarios/horarios.component';


@NgModule({
  declarations: [
    AppComponent,
    ConexionesComponent,
    ConexionComponent,
    NavbarComponent,
    UsuariosComponent,
    UsuarioComponent,
    VersionesComponent,
    VersionComponent,
    LoginComponent,
    TokensComponent,
    FilterPipe,
    HomeComponent,
    ChatComponent,
    ListaUsuariosComponent,
    NoticiasComponent,
    NoticiaComponent,
    LoadingComponent,
    HorariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    WebsocketService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
