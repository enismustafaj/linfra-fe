import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WaitlistRequest, WaitlistResponse } from '../models/waitlist.interface';
import { RestService } from '../../../core/services/rest.service';

@Injectable({
    providedIn: 'root',
})
export class WaitlistService {
    constructor(private readonly restService: RestService) {
    }

    get(): Observable<WaitlistResponse> {
        return this.restService.getRequest('/v1/user/waitlist');
    }

    create(data: WaitlistRequest): Observable<WaitlistResponse> {
        return this.restService.postRequest('/v1/user/waitlist', data);
    }
}
