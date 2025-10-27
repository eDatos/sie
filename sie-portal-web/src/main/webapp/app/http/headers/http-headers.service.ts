import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { ConfigService } from "../../config";
import { Observable } from "rxjs";

/**
 * @description
 * @class
 */
@Injectable()
export class HttpHeadersService {

  constructor(private http: Http, private configService: ConfigService) {
    
  }

  private headers = new Headers({'api-key': this.configService.getConfig().metadata.sieApiKeyValue});

  get(url: string, options?: RequestOptions): Observable<Response> {
    const reqOptions = this.mergeOptions(options);
    return this.http.get(url, reqOptions);
  }

  post(url: string, body: any, options?: RequestOptions): Observable<Response> {
    const reqOptions = this.mergeOptions(options);
    return this.http.post(url, body, reqOptions);
  }


  private mergeOptions(options?: RequestOptions): RequestOptions {
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

}
