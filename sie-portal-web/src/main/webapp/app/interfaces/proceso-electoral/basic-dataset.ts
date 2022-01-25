export interface BasicDataset {
    metadata: {
        dimensions: {
            dimension: [
                {
                    id: 'MEDIDAS' | 'TERRITORIO' | 'CANDIDATURAS';
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
                    dimensionId: 'MEDIDAS' | 'TERRITORIO' | 'CANDIDATURAS';
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
