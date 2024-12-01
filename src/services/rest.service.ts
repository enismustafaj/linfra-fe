import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { API } from '../util/env.utils';

@Injectable({
    providedIn: 'root',
})
export class RestService {
    constructor(
        @Inject(API) private readonly api: string,
        private readonly http: HttpClient
    ) {}

    static prepareOptions(params?: HttpParams) {
        return {
            headers: RestService.prepareHeaders(),
            params,
        };
    }

    private static prepareHeaders(): HttpHeaders {
        return new HttpHeaders({
            Accept: 'application/json, text/plain, */*',
        });
    }

    request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        options: {
            body?: unknown;
            headers?:
                | HttpHeaders
                | {
                      [header: string]: string | string[];
                  };
        }
    ): Observable<T> {
        return this.http.request(method, `${url}`, {
            body: options.body,
            headers: options.headers || RestService.prepareHeaders(),
        }) as Observable<T>;
    }

    getRequest<T>(url: string, params?: any): Observable<T> {
        return this.http.get(
            `${this.api}${url}`,
            RestService.prepareOptions(params)
        ) as Observable<T>;
    }

    postRequest<T, K = unknown, H = unknown>(
        url: string,
        body: K,
        params?: H,
        prefix = this.api
    ): Observable<T> {
        return this.http.post<T>(
            `${prefix}${url}`,
            body,
            RestService.prepareOptions(params as HttpParams)
        );
    }

    putRequest<T, K = unknown, H = unknown>(
        url: string,
        body: K,
        params?: H,
        prefix = this.api
    ): Observable<T> {
        return this.http.put<T>(
            `${prefix}${url}`,
            body,
            RestService.prepareOptions(params as HttpParams)
        );
    }

    deleteRequest<T>(url: string, params?: any): Observable<T> {
        return this.http.delete(
            `${this.api}${url}`,
            RestService.prepareOptions(params)
        ) as Observable<T>;
    }

    patchRequest<T>(url: string, body: unknown, params?: any): Observable<T> {
        return this.http.patch(
            `${this.api}${url}`,
            body,
            RestService.prepareOptions(params)
        ) as Observable<T>;
    }

    deleteRequestWithBody<T>(url: string, body: unknown): Observable<T> {
        return this.http.request('delete', `${this.api}${url}`, {
            body,
        }) as Observable<T>;
    }
}
