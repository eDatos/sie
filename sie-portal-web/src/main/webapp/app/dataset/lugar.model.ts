export class Lugar {

    public readonly nombreConGranularidad;

    constructor(
        public id: string,
        public variableElementId: string,
        public nombre: string,
        public granularidad: string
    ) {
        this.nombreConGranularidad = this.nombre + ' (' + this.granularidad + ')';
    }
}
