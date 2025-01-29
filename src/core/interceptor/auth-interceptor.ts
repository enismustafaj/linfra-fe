import { inject, Injectable } from '@angular/core';
import {
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { catchError, mergeMap, of } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { NzNotificationService } from 'ng-zorro-antd/notification';



export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
HttpHandlerFn) => {
    const auth = inject(AuthService);

    const notification = inject(NzNotificationService);

    return auth.token.pipe(
        catchError(() => of('')),
        mergeMap(token =>
            next(
                req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ).pipe(catchError(err => {
                notification.error('', "An error occured while fetching data", { nzDuration: 5000 });
                return of(err);
                })
            )
        )
    );
};
