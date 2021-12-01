import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage',
})
export class PercentagePipe implements PipeTransform {
    transform(value: any): any {
        if (value && (typeof value === 'string' || typeof value === 'number')) {
            return value + ' %';
        }
        return value;
    }
}
