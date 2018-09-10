import { DatasetProcesoElectoral } from './dataset-proceso-electoral.model';

export class MultidatasetProcesosElectorales {

    constructor(
        public id: string,
        public datasetList: DatasetProcesoElectoral[]
    ) { }
}
