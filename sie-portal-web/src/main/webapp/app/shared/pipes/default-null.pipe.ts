import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'defaultNull',
})
export class DefaultNullPipe implements PipeTransform {
    transform(value: any): any {
        if (!value) {
            return 0;
        }
        return value;
    }
}
