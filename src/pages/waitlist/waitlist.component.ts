import { Component, OnInit, Signal, WritableSignal } from '@angular/core';
import { WaitlistIntroComponent } from '../../components/waitlist-intro/waitlist-intro.component';
import { WaitlistFormComponent } from '../../components/waitlist-form/waitlist-form.component';
import { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent } from 'ng-zorro-antd/layout';
import { FooterComponent } from '../../components/footer/footer.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { WaitlistService } from '../../services/waitlist.service';
import { WaitlistResponse } from '../../data/waitlist.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
        NzSpaceItemDirective,
        AsyncPipe
    ],
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.scss'
})
export class WaitlistComponent implements OnInit {

    submission$?: Observable<WaitlistResponse | undefined>;

    constructor(private readonly waitlistService: WaitlistService) {
    }

    ngOnInit(): void {
        this.submission$ = this.waitlistService.get();
    }

    onSubmit(data: {name: string, email: string}): void {
        this.waitlistService.create(data);
    }
}
