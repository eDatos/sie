import {Injectable} from '@angular/core';
import {Request, XSRFStrategy} from "@angular/http";

@Injectable()
export class XsrfNoopInterceptor implements XSRFStrategy {
    configureRequest(req: Request): void {
        console.debug("Request intercepted, XSRF-TOKEN header won't be added");
    }
}
