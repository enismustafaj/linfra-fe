import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService, describeError } from '../api/api.service';
import { Resource } from '../api/models';
import { StateBadgeComponent } from '../shared/state-badge.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [DatePipe, StateBadgeComponent],
  templateUrl: './resources.component.html',
})
export class ResourcesComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly resources = signal<Resource[] | null>(null);
  readonly error = signal('');

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.error.set('');
    this.api.resources().subscribe({
      next: (list) => this.resources.set(list),
      error: (e) => this.error.set(describeError(e)),
    });
  }
}
