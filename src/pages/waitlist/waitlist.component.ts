import { Component } from '@angular/core';
import { WaitlistIntroComponent } from '../../components/waitlist-intro/waitlist-intro.component';
import { WaitlistFormComponent } from '../../components/waitlist-form/waitlist-form.component';
import { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent } from 'ng-zorro-antd/layout';
import { FooterComponent } from '../../components/footer/footer.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-waitlist',
  standalone: true,
    imports: [
        WaitlistIntroComponent,
        WaitlistFormComponent,
        NzLayoutComponent,
        NzContentComponent,
        NzFooterComponent,
        FooterComponent
    ],
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.scss'
})
export class WaitlistComponent {

}
