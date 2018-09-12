import { ConfigService } from './config.service';
import { NgModule } from '@angular/core';
import { MetadataService } from './metadata.service';

@NgModule({
    providers: [
        ConfigService,
        MetadataService
    ],
})
export class SieConfigModule { }
