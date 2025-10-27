import { JhiEventManager, JhiHttpInterceptor } from "ng-jhipster";
import { RequestOptions, RequestOptionsArgs, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ConfigService } from "../../config";

export class HeadersInterceptor extends JhiHttpInterceptor {

    private headers: Headers;
    constructor(private eventManager: JhiEventManager, private configService: ConfigService) {
        super();
        this.headers = new Headers({'api-key': this.configService.getConfig().metadata.sieApiKeyValue});
    }

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
              options = new RequestOptions();
            }
        
            // Combinar cabeceras personalizadas con la común
            options.headers = options.headers || new Headers();
            this.headers.forEach((value, name) => {
              if (!options.headers.has(name)) {
                options.headers.set(name, value);
              }
            });
          
            return options;
    }

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        return observable;
    }
}
