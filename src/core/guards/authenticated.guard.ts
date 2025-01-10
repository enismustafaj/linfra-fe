import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { UserState } from "../store/user.store";
import { map, take } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

    constructor(
        private userStore: Store<UserState>,
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

        return true;
        
        return this.userStore.pipe(
            select(state => state.user),
            take(1),
            map(state => {
                if (state) {
                    return true;
                } else {
                    this.router.navigate(["/login"]);
                    return false;
                }
            })
        )
    }

}