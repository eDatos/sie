export interface BasicDataset {
    metadata: {
        dimensions: {
            dimension: [
                {
                    id: 'MEDIDAS' | 'TERRITORIO' | 'CANDIDATURAS' | 'CANDIDATURA';
                    dimensionValues: {
                        value: [
                            {
                                id: string;
                                name: {
                                    text: [
                                        {
                                            value: string;
                                            lang: string;
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    data: {
        dimensions: {
            dimension: [
                {
                    dimensionId: 'MEDIDAS' | 'TERRITORIO' | 'CANDIDATURAS' | 'CANDIDATURA';
                    representations: {
                        representation: [
                            {
                                code: string;
                                index: number;
                            }
                        ]
                    }
                }
            ]
        };
        observations: string;
    };
}
