export class ConexionModel {
    id: string;
    cliente: string;
    rut: string;
    user: string;
    password: string;
    server: string;
    port: number;
    database: string;
    options: string;

    constructor() {
        this.options = '{ "encrypt": false, "enableArithAbort": true}';
    }

}
