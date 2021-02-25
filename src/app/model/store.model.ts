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
        transbankId: number;
        minTotal: number;
        delivery: number;
        pickup: number;

    constructor() {
        this.id = 0;
        this.marcaId = 0;
        this.sucursalID = '';
        this.logistics = 0;
        this.status = 1;
        this.efectivo = 1;
        this.redcompra = 1;
        this.webpay = 0;
        this.mercadopago = 0;
        this.transbankId = 0;
        this.minTotal =  0;
        this.poligonos = '';
        this.delivery = 0;
        this.pickup = 1;
    }
}

