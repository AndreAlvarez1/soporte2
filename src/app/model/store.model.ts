export class StoreModel {
        id: number;
        sucursalID: string;
        name: string;
        marcaId: number;
        status: number;
        logistics: number;
        external: string;
        poligonos: string;
        cooking: number;
        efectivo: number;
        redcompra: number;
        webpay: number;
        mercadopago: number;
        marca: string;

    constructor() {
        this.id = 0;
        this.marca = '';
        this.sucursalID = '';
        this.logistics = 0;
        this.status = 1;
        this.efectivo = 1;
        this.redcompra = 1;
        this.webpay = 0;
        this.mercadopago = 0;
    }
}

