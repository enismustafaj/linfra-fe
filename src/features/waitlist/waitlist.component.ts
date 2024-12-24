import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WaitlistIntroComponent } from './components/waitlist-intro/waitlist-intro.component';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { WaitlistFormComponent } from './components/waitlist-form/waitlist-form.component';


@Component({
  selector: 'app-waitlist',
  standalone: true,
  imports: [
    WaitlistIntroComponent,
    WaitlistFormComponent,
    NzSpaceComponent,
    NzSpaceItemDirective
  ],
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitlistComponent {
}
