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
var UsuariosComponent = /** @class */ (function () {
    function UsuariosComponent(conex, auth) {
        this.conex = conex;
        this.auth = auth;
        this.admin = false;
        this.usuarios = [];
        this.loading = false;
    }
    UsuariosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.admin = this.auth.esAdmin();
        this.conex.getUsuarios()
            .subscribe(function (resp) {
            console.log(resp);
            _this.usuarios = resp;
            _this.loading = false;
        });
    };
    UsuariosComponent.prototype.borrarUsuario = function (usuario, i) {
        var _this = this;
        sweetalert2_1.default.fire({
            title: 'Estás seguro?',
            text: "Estas seguro que quieres borrar a " + usuario.nombre,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
        }).then(function (resp) {
            if (resp.value) {
                // Esto saca del arreglo la conexion que voy a borrar.
                // Para sacarlo de la vista sin tener que refrescar la web.
                _this.usuarios.splice(i, 1);
                _this.conex.borrarDato('Usuarios', usuario.id)
                    .subscribe();
            }
        });
    };
    UsuariosComponent = __decorate([
        core_1.Component({
            selector: 'app-usuarios',
            templateUrl: './usuarios.component.html',
            styleUrls: ['./usuarios.component.css']
        })
    ], UsuariosComponent);
    return UsuariosComponent;
}());
exports.UsuariosComponent = UsuariosComponent;
