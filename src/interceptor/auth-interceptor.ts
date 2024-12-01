import { Injectable } from '@angular/core';
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, mergeMap, of } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        return this.auth.token.pipe(
            catchError(() => of('')),
            mergeMap(token =>
                next.handle(
                    req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                )
            )
        );
    }
}
