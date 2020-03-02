"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var conexiones_component_1 = require("./components/conexiones/conexiones.component");
var conexion_component_1 = require("./components/conexion/conexion.component");
var usuario_component_1 = require("./components/usuario/usuario.component");
var usuarios_component_1 = require("./components/usuarios/usuarios.component");
var versiones_component_1 = require("./components/versiones/versiones.component");
var version_component_1 = require("./components/version/version.component");
var login_component_1 = require("./components/login/login.component");
var tokens_component_1 = require("./components/tokens/tokens.component");
var auth_guard_1 = require("./guards/auth.guard");
var routes = [
    { path: 'conexiones', component: conexiones_component_1.ConexionesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'conexion/:id', component: conexion_component_1.ConexionComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'usuarios', component: usuarios_component_1.UsuariosComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'usuario/:id', component: usuario_component_1.UsuarioComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'versiones', component: versiones_component_1.VersionesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'version/:id', component: version_component_1.VersionComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'tokens', component: tokens_component_1.TokensComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
