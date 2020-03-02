"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var usuario_model_1 = require("../model/usuario.model");
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.usuario = new usuario_model_1.UsuarioModel();
    }
    AuthService.prototype.estaAutenticado = function () {
        if (localStorage.getItem('nombre')) {
            return true;
        }
    };
    AuthService.prototype.esAdmin = function () {
        if (localStorage.getItem('nivel') === '3') {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('nombre');
        localStorage.removeItem('nivel');
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
