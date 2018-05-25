export class ProcesoElectoral {

    constructor(
        public id: string,
        public indiceDimension: number,
        public idLugar: string,
        public fechaEleccion?: string,
        public tipoProcesoElectoral?: string,
        public indicadores: any = {}
    ) { }
}
