export class TicketModel {
    id: string;
    fecha: string;
    horaFin: string;
    horaIni: string;
    local: string;
    persona: string;
    tipo: string;
    consulta: string;
    tecnico: string;
    valoracion: number;
    cliente: string;
    rut: string;
    historial: object;
    tiempo: number;
    cerrado: string;
    mm: number;

    constructor() {
        this.horaFin = 'pendiente';
        this.valoracion = 0;
        this.tipo = 'Escoge un tipo de consulta';
    }
}

