import {Injectable} from '@angular/core';
import {Request, XSRFStrategy} from '@angular/http';

/**
 * Angular 4 has XSRF protection enabled by default. The XSRF token should be handled by the
 * eDatos header logic and not by Angular, but by including header authentication Angular
 * started sending the token to domains that were not ready to receive it, so CORS errors
 * started popping up everywhere. This class disables XSRF protection for Angular, leaving
 * the eData header to take care of it.
 */
@Injectable()
export class XsrfNoopInterceptor implements XSRFStrategy {
    configureRequest(req: Request): void {}
}
