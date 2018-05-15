import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiPaginationUtil, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Principal, User, UserService, ResponseWrapper, RolService, Rol } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'jhi-rol-mgmt',
    templateUrl: './rol-management.component.html'
})
export class RolMgmtComponent implements OnInit, OnDestroy {

    currentAccount: any;
    roles: Rol[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    predicate: any;
    reverse: any;
    rolListModificationSubscription: Subscription;

    constructor(
        private rolService: RolService,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
        this.rolListModificationSubscription.unsubscribe();
    }

    registerChangeInUsers() {
        this.rolListModificationSubscription = this.eventManager.subscribe('rolListModification', (response) => this.loadAll());
    }

    loadAll() {
        this.rolService.query({
            sort: this.sort(),
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers)
        );
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'nombre') {
            result.push('nombre');
        }
        return result;
    }

    transition() {
        this.router.navigate(['/rol-management'], {
            queryParams: {
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.roles = data;
    }
}
