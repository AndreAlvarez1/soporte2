"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var conexiones_service_1 = require("./conexiones.service");
describe('ConexionesService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(conexiones_service_1.ConexionesService);
        expect(service).toBeTruthy();
    });
});
