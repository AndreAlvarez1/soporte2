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
var LoginComponent = /** @class */ (function () {
    function LoginComponent(conex, router, auth) {
        this.conex = conex;
        this.router = router;
        this.auth = auth;
        this.loading = true;
        this.showPassword = false;
        this.usuarios = [];
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.logout();
        this.loading = true;
        this.conex.getUsuarios()
            .subscribe(function (resp) {
            console.log(resp);
            _this.usuarios = resp;
            _this.loading = false;
        });
    };
    LoginComponent.prototype.validarMail = function (form) {
        var mailForm = form.controls.mail["value"];
        var usuarioWeb = this.usuarios.find(function (user) { return user.mail === mailForm; });
        if (usuarioWeb) {
            console.log('encontré', usuarioWeb);
            this.usuario = usuarioWeb;
            this.showPassword = true;
        }
        else {
            console.log('error');
            this.error('Email no coincide', 'No encontramos ese correo, intentalo de nuevo por favor');
        }
    };
    LoginComponent.prototype.validarPass = function (form) {
        var passForm = form.controls.pass["value"];
        console.log(passForm);
        if (passForm === this.usuario.password) {
            localStorage.setItem('nombre', this.usuario.nombre);
            localStorage.setItem('nivel', this.usuario.nivel.toString());
            this.router.navigateByUrl('/conexiones');
        }
        else {
            this.error('Password equivocado', 'intentalo de nuevo');
        }
    };
    LoginComponent.prototype.error = function (titulo, texto) {
        sweetalert2_1.default.fire({
            title: titulo,
            text: texto,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
