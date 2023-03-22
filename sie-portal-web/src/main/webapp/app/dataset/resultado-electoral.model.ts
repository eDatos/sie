import { ProcesoElectoral } from './proceso-electoral.model';
import { Lugar } from "./lugar.model";

export class ResultadoElectoral {
    constructor(
        public territorio: Lugar,
        public procesoElectoral: ProcesoElectoral,
        public data: any = {},
    ) {
    }
}
