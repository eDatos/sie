import { ProcesoElectoralDataset } from './proceso-electoral-dataset.model';

export class MultidatasetProcesosElectorales {

    constructor(
        public id: string,
        public datasetList: ProcesoElectoralDataset[]
    ) { }
}
