import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { FindingsComponent } from './findings/findings.component';
import { IntentsComponent } from './intents/intents.component';
import { PolicyComponent } from './policy/policy.component';
import { ResourcesComponent } from './resources/resources.component';

export const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'intents', component: IntentsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'findings', component: FindingsComponent },
  { path: 'policy', component: PolicyComponent },
  { path: '**', redirectTo: 'chat' },
];
