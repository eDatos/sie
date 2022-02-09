import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'defaultNull',
})
export class DefaultNullPipe implements PipeTransform {
    transform(value: any, defaultText= ''): any {
        if (!value) {
            return defaultText;
        }
        return value;
    }
}
