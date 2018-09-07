export class YElement {
    public name: string;
    public color: string;
    public type: string;
    public data: any[];
    public alternativeName: string;
    public stacking: string;
}

export class Chart {
    public xAxis: any[];
    public yAxis: YElement[];
}
