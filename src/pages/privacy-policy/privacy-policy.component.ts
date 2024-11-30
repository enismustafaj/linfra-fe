import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { FooterComponent } from '../../components/footer/footer.component';
import { NzContentComponent, NzFooterComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzSpaceComponent } from 'ng-zorro-antd/space';
import { WaitlistFormComponent } from '../../components/waitlist-form/waitlist-form.component';
import { WaitlistIntroComponent } from '../../components/waitlist-intro/waitlist-intro.component';

@Component({
    selector: 'app-privacy-policy',
    standalone: true,
    imports: [
        NzButtonComponent,
        NzTableComponent,
        FooterComponent,
        NzContentComponent,
        NzFooterComponent,
        NzLayoutComponent,
        NzSpaceComponent,
        WaitlistFormComponent,
        WaitlistIntroComponent
    ],
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

    onEmail(): void {
        window.open('mailto:me@sabirotmane.com', '_blank');
    }
}
