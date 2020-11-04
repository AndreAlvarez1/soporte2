export class SucursalModel {
    id: string;
    name: string;
    descripcion: string;
    direccion: string;
    comuna: string;
    ciudad: string;
    pais: string;
    status: number;
    marcaId: number;
    lat: number;
    lng: number;
    namespace: string;
    marca: string;

    constructor() {
        this.descripcion = '';
        this.status = 1;
        this.comuna = '';
        this.ciudad = '';
        this.pais = 'Chile';
        this.marca = 'Escoge una Marca';

    }
}




