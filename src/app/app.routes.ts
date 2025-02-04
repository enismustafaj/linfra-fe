import { Routes } from '@angular/router';
import { WaitlistComponent } from '../features/waitlist/waitlist.component';
import { PrivacyPolicyComponent } from '../features/privacy-policy/privacy-policy.component';
import { LoginComponent } from '../features/login/components/login.component';
import { DashboardComponent } from '../features/dashboard/components/dashboard/dashboard.component';
import { AuthenticatedGuard } from '../core/guards/authenticated.guard';
import { SignupComponent } from '../features/signup/components/signup/signup.component';
import { ChatThreadsComponent } from '../features/chat-thread/components/chat_threads/chat_threads.component';

export const routes: Routes = [
  { path: 'waitlist', component: WaitlistComponent },
  { path: '', redirectTo: 'waitlist', pathMatch: 'full' },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'login', component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthenticatedGuard] },
  { path: "resource-chats", component: ChatThreadsComponent, canActivate: [AuthenticatedGuard] },
  { path: "signup", component: SignupComponent },
];
