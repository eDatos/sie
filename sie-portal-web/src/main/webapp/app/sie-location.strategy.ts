import './vendor.ts';
import {HashLocationStrategy} from '@angular/common';

export class SieLocationStrategy extends HashLocationStrategy {
    prepareExternalUrl(internal: string): string {
        return window.location.search + super.prepareExternalUrl(internal);
    }
}
