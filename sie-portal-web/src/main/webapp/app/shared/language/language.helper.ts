import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MetadataService, ConfigService } from '../../config';
import { CookieService } from 'ngx-cookie';
import { GenericConfig } from '../../config/generic-config.interface';


@Injectable()
export class JhiLanguageHelper {
    renderer: Renderer2 = null;

    constructor(
        private configService: ConfigService,
        private metadataService: MetadataService,
        private cookieService: CookieService,
        private translateService: TranslateService,
        private rootRenderer: RendererFactory2,
        private titleService: Title,
        private router: Router
    ) {
        this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
        this.init();
    }

    /**
     * Update the window title using params in the following
     * order:
     * 1. titleKey parameter
     * 2. $state.$current.data.pageTitle (current state page title)
     * 3. 'global.title'
     */
    updateTitle(titleKey?: string) {
        if (!titleKey) {
             titleKey = this.getPageTitle(this.router.routerState.snapshot.root);
        }

        this.translateService.get(titleKey).subscribe((title) => {
            this.titleService.setTitle(title);
        });
    }

    private init() {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.renderer.setAttribute(document.querySelector('html'), 'lang', this.translateService.currentLang);
            this.updateTitle();
        });
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'sieApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    getLanguages(config: GenericConfig): Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            this.metadataService.getPropertyById(config.metadata.internationalizationLanguages).subscribe((languages) => {
                resolve(languages.split(',').map((lang) => lang.trim()));
            });
        });
    }

    getInternationalizationCookieValue(config: GenericConfig): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.metadataService.getPropertyById(config.metadata.internationalizationCookieKey).subscribe((cookieName) => {
                if (cookieName !== null) {
                    const cookies = Object.keys(this.cookieService.getAll()).map(key => (key));
                    if (cookies.find((cookie) => cookie === cookieName) !== undefined) {
                        resolve(this.cookieService.get(cookieName));
                    }
                }
                resolve(null);
            });
        });
    }

    getCurrentLocale(cookieValue: string, languages: string[]): Promise<string> {
        return new Promise<string>((resolve) => {
            if (cookieValue && this.findLanguageValue(languages, cookieValue)) {
                resolve(cookieValue);
            } else {
                // No cookie
                //  No cookie - show navigator language
                const navigatorValue = this.findNavigatorValue(languages);
                if (navigatorValue !== null) {
                    resolve(navigatorValue);
                } else {
                    //  No navigator language - show default language
                    resolve(languages[0]);
                }
            }
        });
    }

    findNavigatorValue(internationalizationLanguages: string[]) {
        return this.findLanguageValue(internationalizationLanguages, window.navigator.language);
    }

    findLanguageValue(internationalizationLanguages: string[], value: string) {
        let languageValue = internationalizationLanguages.find((element) => element === value);
        return languageValue !== undefined ? languageValue : null;
    }
}
