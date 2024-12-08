import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WaitlistIntroComponent } from '../../components/waitlist-intro/waitlist-intro.component';
import { WaitlistFormComponent } from '../../components/waitlist-form/waitlist-form.component';
import { NzContentComponent, NzFooterComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { FooterComponent } from '../../components/footer/footer.component';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';


@Component({
  selector: 'app-waitlist',
  standalone: true,
  imports: [
    WaitlistIntroComponent,
    WaitlistFormComponent,
    NzLayoutComponent,
    NzContentComponent,
    NzFooterComponent,
    FooterComponent,
    NzSpaceComponent,
    NzSpaceItemDirective
  ],
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitlistComponent {
}
