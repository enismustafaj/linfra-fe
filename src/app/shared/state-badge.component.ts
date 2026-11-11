import { Component, computed, input } from '@angular/core';

const TONES: Record<string, string> = {
  SUCCEEDED: 'ok', ACTIVE: 'ok', RESOLVED: 'ok', CLEARED: 'ok',
  FAILED: 'bad', NEEDS_ATTENTION: 'bad', MISSING: 'bad', REJECTED: 'bad', OPEN: 'bad',
  APPLYING: 'busy', APPROVED: 'busy', PLANNED: 'busy', PROPOSED: 'neutral', EXPIRED: 'neutral',
};

/** A status pill, coloured by whether the status is fine, in progress, or needs someone. */
@Component({
  selector: 'app-state-badge',
  standalone: true,
  template: `<span class="badge {{ tone() }}">{{ label() }}</span>`,
})
export class StateBadgeComponent {
  readonly state = input.required<string>();
  readonly tone = computed(() => TONES[this.state()] ?? 'neutral');
  readonly label = computed(() => this.state().replace(/_/g, ' ').toLowerCase());
}
