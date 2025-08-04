import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage',
})
export class PercentagePipe implements PipeTransform {
    transform(value: any): any {
        if (value != null && value.trim() !== '') {
            return value + ' %';
        }
        return value;
    }
}
