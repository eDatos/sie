import { ProcesoElectoral } from './proceso-electoral.model';

export class ResultadoElectoral {
    constructor(
        public territorio: string,
        public procesoElectoral: ProcesoElectoral,
    ) {
    }
}
