import { DatePipe, LowerCasePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService, describeError } from '../api/api.service';
import { Intent } from '../api/models';
import { DraftSummaryComponent } from '../shared/draft-summary.component';
import { StateBadgeComponent } from '../shared/state-badge.component';

@Component({
  selector: 'app-intents',
  standalone: true,
  imports: [DatePipe, LowerCasePipe, DraftSummaryComponent, StateBadgeComponent],
  templateUrl: './intents.component.html',
})
export class IntentsComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly intents = signal<Intent[] | null>(null);
  readonly error = signal('');
  readonly busy = signal(false);

  ngOnInit(): void {
    this.load();
  }

  act(intent: Intent, action: 'plan' | 'approve' | 'reject'): void {
    this.busy.set(true);
    this.error.set('');
    this.api.intentAction(intent.id, action).subscribe({
      next: () => {
        this.busy.set(false);
        this.load();
      },
      error: (e) => {
        this.busy.set(false);
        this.error.set(describeError(e));
        this.load();
      },
    });
  }

  load(): void {
    this.error.set('');
    this.api.intents().subscribe({
      next: (list) => this.intents.set(list),
      error: (e) => this.error.set(describeError(e)),
    });
  }
}
