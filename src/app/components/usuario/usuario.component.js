"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var usuario_model_1 = require("src/app/model/usuario.model");
var sweetalert2_1 = __importDefault(require("sweetalert2"));
var UsuarioComponent = /** @class */ (function () {
    function UsuarioComponent(conex, route, auth) {
        this.conex = conex;
        this.route = route;
        this.auth = auth;
        this.admin = false;
        this.usuario = new usuario_model_1.UsuarioModel();
    }
    UsuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.admin = this.auth.esAdmin();
        if (id !== 'nuevo') {
            this.conex.getDato('Usuarios', id)
                .subscribe(function (resp) {
                _this.usuario = resp;
                _this.usuario.id = id;
            });
        }
    };
    UsuarioComponent.prototype.guardar = function (form) {
        var _this = this;
        if (form.invalid) {
            this.error();
            return;
        }
        sweetalert2_1.default.fire({
            title: 'Espere',
            text: 'Guardando Info',
            icon: 'info',
            confirmButtonText: 'Ok'
        });
        sweetalert2_1.default.showLoading();
        var peticion;
        if (this.usuario.id) {
            peticion = this.conex.actualizarUsuario(this.usuario);
            // .subscribe( resp => {
            //   console.log(resp);
            // });
        }
        else {
            peticion = this.conex.crearUsuario(this.usuario);
            //     .subscribe(resp => {
            //      console.log(resp);
            //      this.conexion = resp;
            // });
        }
        peticion.subscribe(function (resp) {
            sweetalert2_1.default.fire({
                title: _this.usuario.nombre,
                text: 'Datos guardados con Exito',
                icon: 'success'
            });
        });
    };
    UsuarioComponent.prototype.error = function () {
        sweetalert2_1.default.fire({
            title: 'Error',
            text: 'Rellena todos los campos por favor',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    };
    UsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-usuario',
            templateUrl: './usuario.component.html',
            styleUrls: ['./usuario.component.css']
        })
    ], UsuarioComponent);
    return UsuarioComponent;
}());
exports.UsuarioComponent = UsuarioComponent;
