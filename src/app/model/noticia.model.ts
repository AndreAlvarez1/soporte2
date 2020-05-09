export class NoticiaModel {
    id: string;
    titulo: string;
    cuerpo: string;
    de: string;
    fecha: string;
    link: string;
    para: string;
    photo: string;
    mm: number;
    // video: string;


    constructor() {
        this.titulo = '';
        this.cuerpo = '';
        this.link = '';
        this.photo = '';
        this.para = 'pendiente';
        // this.video = '';
    }
}

