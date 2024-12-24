import { Component } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzContentComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzSpaceComponent } from 'ng-zorro-antd/space';

@Component({
    selector: 'app-privacy-policy',
    standalone: true,
    imports: [
        NzTableComponent,
        NzContentComponent,
        NzLayoutComponent,
        NzSpaceComponent
    ],
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

    onEmail(): void {
        window.open('mailto:me@sabirotmane.com', '_blank');
    }
}
