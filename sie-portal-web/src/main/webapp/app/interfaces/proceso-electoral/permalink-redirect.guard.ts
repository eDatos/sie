import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ConfigService, MetadataService} from '../../config';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class PermalinkRedirectGuard implements CanActivate {
    constructor(private http: HttpClient, private configService: ConfigService, private metadataService: MetadataService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const config = this.configService.getConfig();
        const permalinkId = next.params['permalinkId'];

        return this.metadataService.getPropertyById(config.metadata.permalinksEndpointKey).pipe(
            switchMap((permalinksBaseUrl) => {
                const url = `${permalinksBaseUrl}/v1.0/permalinks/${permalinkId}`;
                return this.http.get(url);
            }),
            map((permalinkBody: any) => {
                const urlParts: string[] = permalinkBody['hash'].slice(2).split('/');
                urlParts.push('permalink', permalinkId);
                this.router.navigate(urlParts);
                return true;
            }));
    }
}
