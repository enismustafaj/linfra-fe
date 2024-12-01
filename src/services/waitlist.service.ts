import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WaitlistRequest, WaitlistResponse } from '../data/waitlist.interface';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root',
})
export class WaitlistService {
    constructor(private readonly restService: RestService) {
    }

    get(): Observable<WaitlistResponse> {
        return this.restService.getRequest('/waitlist');
    }

    create(data: WaitlistRequest): Observable<WaitlistResponse> {
        return this.restService.postRequest('/waitlist', data);
    }
}
