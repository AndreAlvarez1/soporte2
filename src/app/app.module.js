"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var conexiones_component_1 = require("./components/conexiones/conexiones.component");
var conexion_component_1 = require("./components/conexion/conexion.component");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var usuarios_component_1 = require("./components/usuarios/usuarios.component");
var usuario_component_1 = require("./components/usuario/usuario.component");
var versiones_component_1 = require("./components/versiones/versiones.component");
var version_component_1 = require("./components/version/version.component");
var login_component_1 = require("./components/login/login.component");
var tokens_component_1 = require("./components/tokens/tokens.component");
var filter_pipe_1 = require("./pipes/filter.pipe");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                conexiones_component_1.ConexionesComponent,
                conexion_component_1.ConexionComponent,
                navbar_component_1.NavbarComponent,
                usuarios_component_1.UsuariosComponent,
                usuario_component_1.UsuarioComponent,
                versiones_component_1.VersionesComponent,
                version_component_1.VersionComponent,
                login_component_1.LoginComponent,
                tokens_component_1.TokensComponent,
                filter_pipe_1.FilterPipe
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
