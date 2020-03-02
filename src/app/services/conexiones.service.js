"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var ConexionesService = /** @class */ (function () {
    function ConexionesService(http) {
        this.http = http;
        this.url = 'https://mantenedor-77567.firebaseio.com';
    }
    ConexionesService.prototype.getDato = function (dir, id) {
        return this.http.get(this.url + "/" + dir + "/" + id + ".json");
    };
    ConexionesService.prototype.borrarDato = function (dir, id) {
        return this.http.delete(this.url + "/" + dir + "/" + id + ".json");
    };
    /////////////////////////// CONEXIONES  //////////////////////////
    ConexionesService.prototype.getConexiones = function () {
        var _this = this;
        return this.http.get(this.url + "/Conexiones.json")
            .pipe(operators_1.map(function (resp) { return _this.crearArregloConexiones(resp); }));
    };
    ConexionesService.prototype.crearConexion = function (conexion) {
        return this.http.post(this.url + "/Conexiones.json", conexion)
            .pipe(operators_1.map(function (resp) {
            conexion.id = resp.name;
            return conexion;
        }));
    };
    ConexionesService.prototype.actualizarConexion = function (conexion) {
        // esto es para traer el objeto y borrarle el id para no grabarlo como campo.
        var conexionTemp = __assign({}, conexion);
        delete conexionTemp.id;
        return this.http.put(this.url + "/Conexiones/" + conexion.id + ".json", conexionTemp);
    };
    ConexionesService.prototype.crearArregloConexiones = function (Obj) {
        var conexiones = [];
        if (Obj === null) {
            return [];
        }
        Object.keys(Obj).forEach(function (key) {
            var conexion = Obj[key];
            conexion.id = key;
            conexiones.push(conexion);
        });
        return conexiones;
    };
    /////////////////////////// USUARIOS //////////////////////////
    ConexionesService.prototype.getUsuarios = function () {
        var _this = this;
        return this.http.get(this.url + "/Usuarios.json")
            .pipe(operators_1.map(function (resp) { return _this.crearArregloUsuarios(resp); }));
    };
    ConexionesService.prototype.crearArregloUsuarios = function (Obj) {
        var usuarios = [];
        if (Obj === null) {
            return [];
        }
        Object.keys(Obj).forEach(function (key) {
            var usuario = Obj[key];
            usuario.id = key;
            usuarios.push(usuario);
        });
        return usuarios;
    };
    ConexionesService.prototype.crearUsuario = function (usuario) {
        return this.http.post(this.url + "/Usuarios.json", usuario)
            .pipe(operators_1.map(function (resp) {
            usuario.id = resp.name;
            return usuario;
        }));
    };
    ConexionesService.prototype.actualizarUsuario = function (usuario) {
        // esto es para traer el objeto y borrarle el id para no grabarlo como campo.
        var usuarioTemp = __assign({}, usuario);
        delete usuarioTemp.id;
        return this.http.put(this.url + "/Usuarios/" + usuario.id + ".json", usuarioTemp);
    };
    ///////////////////////////// VERSIONES //////////////////////
    ConexionesService.prototype.getVersiones = function () {
        var _this = this;
        return this.http.get(this.url + "/Versiones.json")
            .pipe(operators_1.map(function (resp) { return _this.crearArregloVersiones(resp); }));
    };
    ConexionesService.prototype.crearArregloVersiones = function (Obj) {
        var versiones = [];
        if (Obj === null) {
            return [];
        }
        Object.keys(Obj).forEach(function (key) {
            var version = Obj[key];
            version.id = key;
            versiones.push(version);
        });
        return versiones;
    };
    ConexionesService.prototype.crearVersion = function (version) {
        return this.http.post(this.url + "/Versiones.json", version)
            .pipe(operators_1.map(function (resp) {
            version.id = resp.name;
            return version;
        }));
    };
    ConexionesService.prototype.actualizarVersion = function (version) {
        // esto es para traer el objeto y borrarle el id para no grabarlo como campo.
        var versionTemp = __assign({}, version);
        delete versionTemp.id;
        return this.http.put(this.url + "/Versiones/" + version.id + ".json", versionTemp);
    };
    ////////////////// CLIENTES ///////////
    ConexionesService.prototype.getClientes = function () {
        return this.http.get('http://apipdv.clubgournet.cl/api/v1/ventasdiarias/empresas');
    };
    ConexionesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ConexionesService);
    return ConexionesService;
}());
exports.ConexionesService = ConexionesService;
