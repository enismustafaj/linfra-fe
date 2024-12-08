import { Routes } from '@angular/router';
import { WaitlistComponent } from '../pages/waitlist/waitlist.component';
import { PrivacyPolicyComponent } from '../pages/privacy-policy/privacy-policy.component';
import { LoginComponent } from '../pages/login/login.component';

export const routes: Routes = [
  { path: '', component: WaitlistComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  // { path: 'login', component: LoginComponent } would comment out for now
];
