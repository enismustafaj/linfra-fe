import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { API } from '../util/env.utils';
import { environment } from '../environments/environment';
import { authenticationInterceptor } from '../core/interceptor/auth-interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { resourceChatFeature } from '../features/chat-thread/store/reducer/resource_chat.reducer';
import { userFeature } from '../core/store/reducers/user.reducer';
import {AnalyticsService} from '../core/services/analytics-service';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideStore(),
        provideState(resourceChatFeature),
        provideState(userFeature),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideNzI18n(en_US),
        importProvidersFrom(FormsModule),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([authenticationInterceptor])),
        {
            provide: API,
            useValue: environment.apiHost,
        },
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()),
        ScreenTrackingService,
        UserTrackingService,
        AnalyticsService,
      ]
};
