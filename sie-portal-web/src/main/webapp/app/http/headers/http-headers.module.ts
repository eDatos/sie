import { NgModule } from "@angular/core";
import { HttpHeadersService } from "./http-headers.service";

@NgModule({
    providers: [
        HttpHeadersService
    ]
})
export class HttpHeaderModule {}