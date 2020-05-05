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
var conexion_model_1 = require("src/app/model/conexion.model");
var sweetalert2_1 = __importDefault(require("sweetalert2"));
var ConexionComponent = /** @class */ (function () {
    function ConexionComponent(conex, route, auth) {
        this.conex = conex;
        this.route = route;
        this.auth = auth;
        this.conexion = new conexion_model_1.ConexionModel();
        this.admin = false;
    }
    ConexionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.admin = this.auth.esAdmin();
        var id = this.route.snapshot.paramMap.get('id');
        if (id !== 'nuevo') {
            this.conex.getDato('Conexiones', id)
                .subscribe(function (resp) {
                _this.conexion = resp;
                _this.conexion.id = id;
            });
        }
    };
    ////////////////////////////////////
    // LE AGREGA "." Y "-" AL RUT
    ConexionComponent.prototype.cambiaRut = function (tecla) {
        if (tecla["keyCode"] != 8 && tecla["keyCode"] != 8) {
            if (this.conexion.rut.length === 2 || this.conexion.rut.length === 6) {
                this.conexion.rut = this.conexion.rut + '.';
            }
            else if (this.conexion.rut.length === 10) {
                this.conexion.rut = this.conexion.rut + '-';
            }
            else if (this.conexion.rut.length === 13) {
                this.conexion.rut = this.conexion.rut.slice(0, -1);
            }
        }
        console.log(this.conexion.rut);
    };
    /////////////////////////////////
    ConexionComponent.prototype.guardar = function (form) {
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
        if (this.conexion.id) {
            peticion = this.conex.actualizarConexion(this.conexion);
            // .subscribe( resp => {
            //   console.log(resp);
            // });
        }
        else {
            peticion = this.conex.crearConexion(this.conexion);
            //     .subscribe(resp => {
            //      console.log(resp);
            //      this.conexion = resp;
            // });
        }
        peticion.subscribe(function (resp) {
            sweetalert2_1.default.fire({
                title: _this.conexion.cliente,
                text: 'Datos guardados con Exito',
                icon: 'success'
            });
        });
    };
    ConexionComponent.prototype.error = function () {
        sweetalert2_1.default.fire({
            title: 'Error',
            text: 'Rellena todos los campos por favor',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    };
    ConexionComponent = __decorate([
        core_1.Component({
            selector: 'app-conexion',
            templateUrl: './conexion.component.html',
            styleUrls: ['./conexion.component.css']
        })
    ], ConexionComponent);
    return ConexionComponent;
}());
exports.ConexionComponent = ConexionComponent;
