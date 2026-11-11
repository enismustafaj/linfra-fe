import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Draft } from '../api/models';

/** The ranker's pick for a draft: what, where, how much, and which preferences it meets. */
@Component({
  selector: 'app-draft-summary',
  standalone: true,
  imports: [DecimalPipe, LowerCasePipe],
  templateUrl: './draft-summary.component.html',
})
export class DraftSummaryComponent {
  readonly draft = input.required<Draft>();
  readonly showExplanation = input(true);
}
