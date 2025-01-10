import { Routes } from '@angular/router';
import { WaitlistComponent } from '../features/waitlist/waitlist.component';
import { PrivacyPolicyComponent } from '../features/privacy-policy/privacy-policy.component';
import { LoginComponent } from '../features/login/components/login.component';
import { DashboardComponent } from '../features/dashboard/components/dashboard/dashboard.component';
import { AuthenticatedGuard } from '../core/guards/authenticated.guard';
import { ChatThreadsComponent } from '../features/chat-thread/components/chat-threads/chat_threads.component';

export const routes: Routes = [
  { path: '', component: WaitlistComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'login', component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthenticatedGuard] },
  { path: "resource-chats", component: ChatThreadsComponent, canActivate: [AuthenticatedGuard] }
];
