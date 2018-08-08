import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    public footer = '';

    constructor(
        private templateService: TemplateService
    ) { }

    ngOnInit() {
        this.templateService.getFooter().subscribe((footerHtml) => this.footer = footerHtml);
    }
}
