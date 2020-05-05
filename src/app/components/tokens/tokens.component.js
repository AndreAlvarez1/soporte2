"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TokensComponent = /** @class */ (function () {
    function TokensComponent(conex, auth) {
        this.conex = conex;
        this.auth = auth;
        this.loading = true;
        this.admin = false;
        this.clientes = [];
    }
    TokensComponent.prototype.ngOnInit = function () {
        this.admin = this.auth.esAdmin();
        this.traerClientes();
    };
    TokensComponent.prototype.traerClientes = function () {
        var _this = this;
        console.log('clientes');
        this.conex.getClientes()
            .subscribe(function (data) {
            _this.clientes = data["Data"];
            _this.loading = false;
        });
    };
    TokensComponent = __decorate([
        core_1.Component({
            selector: 'app-tokens',
            templateUrl: './tokens.component.html',
            styleUrls: ['./tokens.component.css']
        })
    ], TokensComponent);
    return TokensComponent;
}());
exports.TokensComponent = TokensComponent;
