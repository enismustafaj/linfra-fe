import { DecimalPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, describeError } from '../api/api.service';
import { Policy, PolicyUpdate } from '../api/models';

/** The tenant's policy: what may be created, the monthly budget, and when a human must approve. */
@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './policy.component.html',
})
export class PolicyComponent implements OnInit {
  private readonly api = inject(ApiService);

  readonly policy = signal<Policy | null>(null);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly saved = signal(false);

  /** The form; loaded from the server, sent back on save. */
  form: PolicyUpdate = {
    allowedInstanceTypes: [],
    allowedRegions: [],
    monthlyBudgetEur: 0,
    autoApproveMaxEur: 0,
    requireApprovalForProd: true,
  };

  readonly usedPercent = computed(() => {
    const p = this.policy();
    return p && p.monthlyBudgetEur > 0 ? Math.min(100, (p.committedSpendEur / p.monthlyBudgetEur) * 100) : 0;
  });

  ngOnInit(): void {
    this.api.policy().subscribe({
      next: (p) => this.show(p),
      error: (e) => this.error.set(describeError(e)),
    });
  }

  toggle(list: string[], value: string, checked: boolean): void {
    const i = list.indexOf(value);
    if (checked && i < 0) list.push(value);
    if (!checked && i >= 0) list.splice(i, 1);
    this.saved.set(false);
  }

  save(): void {
    this.busy.set(true);
    this.error.set('');
    this.saved.set(false);
    this.api.updatePolicy(this.form).subscribe({
      next: (p) => {
        this.busy.set(false);
        this.saved.set(true);
        this.show(p);
      },
      error: (e) => {
        this.busy.set(false);
        this.error.set(describeError(e));
      },
    });
  }

  private show(p: Policy): void {
    this.policy.set(p);
    this.form = {
      allowedInstanceTypes: [...p.allowedInstanceTypes],
      allowedRegions: [...p.allowedRegions],
      monthlyBudgetEur: p.monthlyBudgetEur,
      autoApproveMaxEur: p.autoApproveMaxEur,
      requireApprovalForProd: p.requireApprovalForProd,
    };
  }
}
