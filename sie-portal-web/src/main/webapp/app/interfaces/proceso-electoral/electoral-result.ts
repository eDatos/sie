export interface ElectoralResult {
    candidacy: string;
    results: [
        {
            name: string;
            value: string;
        }
    ];
}
