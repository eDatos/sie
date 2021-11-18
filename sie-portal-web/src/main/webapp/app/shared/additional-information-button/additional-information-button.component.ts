import { Component } from '@angular/core';
import { MetadataService, ConfigService } from '../../config';

@Component({
    selector: 'jhi-additional-information-button',
    templateUrl: './additional-information-button.component.html',
    styleUrls: ['./additional-information-button.component.scss'],
})
export class AdditionalInformationButtonComponent {

    additionalInfoUrl: string;

    constructor(private configService: ConfigService, private metadataService: MetadataService) {
        const config = this.configService.getConfig();
        this.metadataService.getPropertyById(config.metadata.sieAdditionalInfoUrl).subscribe((url) => {
            this.additionalInfoUrl = url;
        }, (error) => {
            console.log(error);
            this.additionalInfoUrl = null;
        });
    }
}
