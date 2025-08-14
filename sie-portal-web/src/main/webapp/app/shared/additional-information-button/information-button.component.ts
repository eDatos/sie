import {AfterViewInit, Component, Input, ChangeDetectorRef} from '@angular/core';
import {ConfigService, MetadataService} from '../../config';

@Component({
    selector: 'jhi-information-button',
    templateUrl: './information-button.component.html',
    styleUrls: ['./information-button.component.scss'],
})
export class InformationButtonComponent implements AfterViewInit {

    @Input()
    titleKey: string;

    @Input()
    metadataObjKey: string;

    url: string;

    constructor(private configService: ConfigService, private metadataService: MetadataService, private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
        const config = this.configService.getConfig();
        this.metadataService.getPropertyById(config.metadata[this.metadataObjKey]).subscribe((url) => {
            this.url = url;
            this.cdr.detectChanges();
        }, (error) => {
            console.log(error);
            this.url = null;
        });
    }
}
