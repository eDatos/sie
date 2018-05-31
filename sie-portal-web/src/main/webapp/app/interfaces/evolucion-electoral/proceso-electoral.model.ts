export class ProcesoElectoral {

    constructor(
        public id: string,
        public indiceDimension: number,
        public idLugar: string,
        public fechaEleccion?: Date,
        public tipoProcesoElectoral?: string,
        public indicadores: any = {}
    ) { }
}