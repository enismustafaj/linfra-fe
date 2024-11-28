import { Component } from '@angular/core';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-waitlist-intro',
  standalone: true,
    imports: [
        NzDividerComponent
    ],
  templateUrl: './waitlist-intro.component.html',
  styleUrl: './waitlist-intro.component.scss'
})
export class WaitlistIntroComponent {

}
