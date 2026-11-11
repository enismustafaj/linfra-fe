import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Conversation, ConversationSummary, Finding, FindingAction, Intent, Message, Policy, PolicyUpdate, Resource,
} from './models';

// Relative: the dev server proxies /api to the backend (proxy.conf.json).
const BASE = '/api/v1';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  conversations(): Observable<ConversationSummary[]> {
    return this.http.get<ConversationSummary[]>(`${BASE}/conversations`);
  }

  startConversation(): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${BASE}/conversations`, {});
  }

  conversation(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${BASE}/conversations/${id}`);
  }

  send(conversationId: string, text: string): Observable<Message> {
    return this.http.post<Message>(`${BASE}/conversations/${conversationId}/messages`, { text });
  }

  confirmDraft(conversationId: string, messageId: number): Observable<unknown> {
    return this.http.post(`${BASE}/conversations/${conversationId}/drafts/${messageId}/confirm`, {});
  }

  intents(): Observable<Intent[]> {
    return this.http.get<Intent[]>(`${BASE}/intents`);
  }

  /** plan: PROPOSED or EXPIRED intents. approve / reject: intents the policy left for a human. */
  intentAction(id: string, action: 'plan' | 'approve' | 'reject'): Observable<Intent> {
    return this.http.post<Intent>(`${BASE}/intents/${id}/${action}`, {});
  }

  policy(): Observable<Policy> {
    return this.http.get<Policy>(`${BASE}/policy`);
  }

  updatePolicy(update: PolicyUpdate): Observable<Policy> {
    return this.http.put<Policy>(`${BASE}/policy`, update);
  }

  resources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${BASE}/resources`);
  }

  findings(openOnly: boolean): Observable<Finding[]> {
    return this.http.get<Finding[]>(`${BASE}/findings`, { params: openOnly ? { status: 'OPEN' } : {} });
  }

  act(findingId: string, action: FindingAction, cloudId?: string): Observable<Finding> {
    return this.http.post<Finding>(`${BASE}/findings/${findingId}/actions`, { action, cloudId });
  }
}

/** A short, human-readable message for a failed call. */
export function describeError(e: unknown): string {
  if (e instanceof HttpErrorResponse) {
    if (e.status === 0) return 'Backend unreachable. Is it running on :8080?';
    if (e.status === 401) return 'Not authorised: check the API key in proxy.conf.json.';
    if (e.status === 404) return 'Not found (or not yours).';
    const body = e.error as { error?: string } | null;
    return body?.error ?? `Request failed (${e.status}).`;
  }
  return 'Something went wrong.';
}
