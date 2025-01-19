import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../core/components/footer/footer.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NavBarComponent} from '../core/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NzLayoutModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
