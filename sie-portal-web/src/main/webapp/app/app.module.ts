import './vendor.ts';

import { Http } from '@angular/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';
import { MissingTranslationHandler, TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { SieConfigModule } from './config/config.module';
import { SieDatasetServiceModule } from './dataset/dataset.module';
import { SieInterfacesModule } from './interfaces/interfaces.module';
import { JhiMainComponent, LayoutRoutingModule, ErrorComponent, notFoundRoute, NavbarComponent, FooterComponent } from './layouts';
import { SieSharedModule } from './shared';
import { catchError } from 'rxjs/operators';
import { AVAILABLE_LANGUAGES, DEFAULT_LANG } from './app.constants';
import { ConfigService } from './config';
import { MissingTranslationHandlerImpl } from './config/missing-translation-handler-impl';
import { JhiLanguageService } from 'ng-jhipster';

class CustomTranslateHttpLoader extends TranslateHttpLoader {

    private readonly defaultLang: string;

    constructor(http: Http, defaultLang: string, prefix?: string, suffix?: string) {
        super(http, prefix, suffix);
        this.defaultLang = defaultLang;
    }
    getTranslation(lang: string) {
        return super.getTranslation(lang).pipe(catchError(() => {
            return super.getTranslation(this.defaultLang);
        }));
    }
}

export function createTranslateLoader(http: Http) {
    return new CustomTranslateHttpLoader(http, DEFAULT_LANG, './i18n/', '.json');
}

export function initTranslations(translateService: TranslateService, cookieService: CookieService, configService: ConfigService) {
    const languageCookie = configService.getConfig().metadata.internationalizationCookieKey;
    const currentLang: string = cookieService.get(languageCookie) || DEFAULT_LANG;
    translateService.setDefaultLang(DEFAULT_LANG);
    translateService.addLangs(AVAILABLE_LANGUAGES);
    return () => translateService.use(currentLang).toPromise();
}

const APP_ROUTES = [
    notFoundRoute
]

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),

        SieConfigModule,
        SieDatasetServiceModule,
        SieInterfacesModule,
        SieSharedModule,
        TranslateModule.forRoot({
            missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationHandlerImpl },
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [Http],
            },
        }),

        // jhipster-needle-angular-add-module JHipster will add new module here
        RouterModule.forRoot(APP_ROUTES, { useHash: true })
    ],
    declarations: [
        JhiMainComponent,
        ErrorComponent,
        NavbarComponent,
        FooterComponent
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initTranslations,
            deps: [TranslateService, CookieService, ConfigService],
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (languageService: JhiLanguageService) => () => languageService.init(),
            deps: [JhiLanguageService],
            multi: true,
        },
        customHttpProvider(),
        PaginationConfig,
    ],
    bootstrap: [JhiMainComponent]
})
export class SieAppModule { }
