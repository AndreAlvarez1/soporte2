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
var version_model_1 = require("src/app/model/version.model");
var sweetalert2_1 = __importDefault(require("sweetalert2"));
var VersionComponent = /** @class */ (function () {
    function VersionComponent(conex, route, auth) {
        this.conex = conex;
        this.route = route;
        this.auth = auth;
        this.admin = false;
        this.version = new version_model_1.VersionModel();
        this.hoy = new Date();
    }
    VersionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.admin = this.auth.esAdmin();
        console.log(this.hoy);
        if (id !== 'nuevo') {
            this.conex.getDato('Versiones', id)
                .subscribe(function (resp) {
                _this.version = resp;
                _this.version.id = id;
            });
        }
    };
    /////////////////////////////////
    VersionComponent.prototype.guardar = function (form) {
        var _this = this;
        if (form.invalid) {
            this.error();
            return;
        }
        this.version.actualizacion = new Date();
        console.log(this.version);
        sweetalert2_1.default.fire({
            title: 'Espere',
            text: 'Guardando Info',
            icon: 'info',
            confirmButtonText: 'Ok'
        });
        sweetalert2_1.default.showLoading();
        var peticion;
        if (this.version.id) {
            peticion = this.conex.actualizarVersion(this.version);
        }
        else {
            peticion = this.conex.crearVersion(this.version);
        }
        peticion.subscribe(function (resp) {
            sweetalert2_1.default.fire({
                title: _this.version.app,
                text: 'Datos guardados con Exito',
                icon: 'success'
            });
        });
    };
    VersionComponent.prototype.error = function () {
        sweetalert2_1.default.fire({
            title: 'Error',
            text: 'Rellena todos los campos por favor',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    };
    VersionComponent = __decorate([
        core_1.Component({
            selector: 'app-version',
            templateUrl: './version.component.html',
            styleUrls: ['./version.component.css']
        })
    ], VersionComponent);
    return VersionComponent;
}());
exports.VersionComponent = VersionComponent;
