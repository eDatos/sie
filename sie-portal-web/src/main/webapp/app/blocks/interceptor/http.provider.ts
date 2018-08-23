import { Injector } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { JhiEventManager, JhiInterceptableHttp } from 'ng-jhipster';

import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { ErrorHandlerInterceptor } from './errorhandler.interceptor';
import { CookieService } from 'ngx-cookie';

export function interceptableFactory(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    localStorage: LocalStorageService,
    sessionStorage: SessionStorageService,
    cookieService: CookieService,
    injector: Injector,
    eventManager: JhiEventManager
) {
    return new JhiInterceptableHttp(
        backend,
        defaultOptions,
        [
        ]
    );
};

export function customHttpProvider() {
    return {
        provide: Http,
        useFactory: interceptableFactory,
        deps: [
            XHRBackend,
            RequestOptions,
            LocalStorageService,
            SessionStorageService,
            CookieService,
            Injector,
            JhiEventManager
        ]
    };
};
