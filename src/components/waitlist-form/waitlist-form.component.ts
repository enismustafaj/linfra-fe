import { Component } from '@angular/core';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-waitlist-form',
  standalone: true,
    imports: [
        NzFormItemComponent,
        NzFormControlComponent,
        NzFormLabelComponent,
        NzColDirective,
        NzInputDirective,
        NzButtonComponent,
        NzFormDirective
    ],
  templateUrl: './waitlist-form.component.html',
  styleUrl: './waitlist-form.component.scss'
})
export class WaitlistFormComponent {

}
