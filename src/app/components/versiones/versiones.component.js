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
var sweetalert2_1 = __importDefault(require("sweetalert2"));
var VersionesComponent = /** @class */ (function () {
    function VersionesComponent(conex, auth) {
        this.conex = conex;
        this.auth = auth;
        this.admin = false;
        this.versiones = [];
    }
    VersionesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.admin = this.auth.esAdmin();
        this.conex.getVersiones()
            .subscribe(function (data) {
            console.log(data);
            _this.versiones = data;
        });
    };
    VersionesComponent.prototype.borrarVersion = function (version, i) {
        var _this = this;
        sweetalert2_1.default.fire({
            title: 'Estás seguro?',
            text: "Estas seguro que quieres borrar a " + version.app,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
        }).then(function (resp) {
            if (resp.value) {
                // Esto saca del arreglo la conexion que voy a borrar.
                // Para sacarlo de la vista sin tener que refrescar la web.
                _this.versiones.splice(i, 1);
                _this.conex.borrarDato('Versiones', version.id)
                    .subscribe();
            }
        });
    };
    VersionesComponent = __decorate([
        core_1.Component({
            selector: 'app-versiones',
            templateUrl: './versiones.component.html',
            styleUrls: ['./versiones.component.css']
        })
    ], VersionesComponent);
    return VersionesComponent;
}());
exports.VersionesComponent = VersionesComponent;
