import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService, describeError } from '../api/api.service';
import { Conversation, ConversationSummary, IntentSummary, Message } from '../api/models';
import { DraftSummaryComponent } from '../shared/draft-summary.component';
import { StateBadgeComponent } from '../shared/state-badge.component';

/** Thread list on the left, the open thread (/chat/:id) on the right. */
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink, RouterLinkActive, DraftSummaryComponent, StateBadgeComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  /** The :id route parameter. */
  readonly id = input<string>();

  readonly threads = signal<ConversationSummary[]>([]);
  readonly conversation = signal<Conversation | null>(null);
  readonly busy = signal(false);
  readonly error = signal('');
  text = '';

  /** Only the latest draft can be confirmed (the backend refuses older ones). */
  readonly latestDraftId = computed(
    () => this.conversation()?.messages.filter((m) => m.draft).at(-1)?.id ?? null,
  );

  constructor() {
    this.loadThreads();
    effect(
      () => {
        const id = this.id();
        this.error.set('');
        this.text = '';
        if (id) this.load(id);
        else this.conversation.set(null);
      },
      { allowSignalWrites: true },
    );
  }

  newConversation(): void {
    this.run(this.api.startConversation(), ({ id }) => {
      this.loadThreads();
      this.router.navigate(['/chat', id]);
    });
  }

  send(): void {
    const conversation = this.conversation();
    const text = this.text.trim();
    if (!conversation || !text || this.busy()) return;
    this.run(
      this.api.send(conversation.id, text),
      () => {
        this.text = '';
        this.load(conversation.id);
        this.loadThreads(); // the first message names the thread
      },
      // The backend keeps the user's message even when the assistant is unavailable.
      () => {
        this.load(conversation.id);
        this.loadThreads();
      },
    );
  }

  confirm(message: Message): void {
    const conversation = this.conversation();
    if (conversation) this.run(this.api.confirmDraft(conversation.id, message.id), () => this.load(conversation.id));
  }

  intentFor(message: Message): IntentSummary | undefined {
    return this.conversation()?.intents.find((i) => i.sourceMessageId === message.id);
  }

  private loadThreads(): void {
    this.api.conversations().subscribe({
      next: (list) => this.threads.set(list),
      error: (e) => this.error.set(describeError(e)),
    });
  }

  private load(id: string): void {
    this.api.conversation(id).subscribe({
      next: (c) => this.conversation.set(c),
      error: (e) => {
        this.conversation.set(null);
        this.error.set(describeError(e));
      },
    });
  }

  private run<T>(call: Observable<T>, onDone: (value: T) => void, onError?: () => void): void {
    this.busy.set(true);
    this.error.set('');
    call.subscribe({
      next: (value) => {
        this.busy.set(false);
        onDone(value);
      },
      error: (e) => {
        this.busy.set(false);
        this.error.set(describeError(e));
        onError?.();
      },
    });
  }
}
