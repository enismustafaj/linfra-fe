import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WaitlistComponent } from '../pages/waitlist/waitlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, WaitlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'linfra-fe';
}
