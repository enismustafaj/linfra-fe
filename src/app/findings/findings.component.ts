import { DatePipe, KeyValuePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService, describeError } from '../api/api.service';
import { Finding, FindingAction } from '../api/models';
import { StateBadgeComponent } from '../shared/state-badge.component';

const DESCRIPTIONS: Record<Finding['type'], string> = {
  ORPHAN: 'A Linfra container exists that no request accounts for.',
  DUPLICATE: 'More than one container exists for the same request.',
  MISSING: 'A recorded resource no longer exists.',
  DRIFT: 'A resource was changed outside Linfra.',
  STUCK: 'A request is in progress but no worker is on it.',
};

const ACTION_LABELS: Record<FindingAction, string> = {
  DESTROY: 'Destroy',
  ADOPT: 'Adopt',
  DISMISS: 'Dismiss',
  KEEP: 'Keep',
  MARK_DESTROYED: 'Mark destroyed',
  ACCEPT: 'Accept change',
  RETRY_NOW: 'Retry now',
  MARK_NEEDS_ATTENTION: 'Stop retrying',
};

@Component({
  selector: 'app-findings',
  standalone: true,
  imports: [DatePipe, KeyValuePipe, LowerCasePipe, TitleCasePipe, StateBadgeComponent],
  templateUrl: './findings.component.html',
})
export class FindingsComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly findings = signal<Finding[] | null>(null);
  readonly openOnly = signal(true);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly describe = DESCRIPTIONS;
  readonly label = ACTION_LABELS;

  ngOnInit(): void {
    this.load();
  }

  toggle(): void {
    this.openOnly.update((v) => !v);
    this.load();
  }

  load(): void {
    this.error.set('');
    this.api.findings(this.openOnly()).subscribe({
      next: (list) => this.findings.set(list),
      error: (e) => this.error.set(describeError(e)),
    });
  }

  act(finding: Finding, action: FindingAction, cloudId?: string): void {
    this.busy.set(true);
    this.error.set('');
    this.api.act(finding.id, action, cloudId).subscribe({
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
}
