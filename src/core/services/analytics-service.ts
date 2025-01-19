import {Injectable} from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
declare let gtag : Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {

  event(action: string, category: string, label: string, value: unknown, ): void {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
