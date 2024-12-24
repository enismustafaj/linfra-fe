import { inject, Injectable } from '@angular/core';
import {
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { catchError, mergeMap, of } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
HttpHandlerFn) => {
    const auth = inject(AuthService);

    return auth.token.pipe(
        catchError(() => of('')),
        mergeMap(token =>
            next(
                req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
        )
    );
};
