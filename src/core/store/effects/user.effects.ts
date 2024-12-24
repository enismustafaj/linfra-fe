import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { map } from "rxjs";
import { userloggedInAction } from "../actions/user.actions";

@Injectable({
    providedIn: "root"
})
export class UserEffects {

    constructor(
        private actions$: Actions,
        private router: Router
    ){}

    handleSuccessfulLogin$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(userloggedInAction),
                map(_ => {
                    return this.router.navigate(["/dashboard"])
                })
            )
        },
        {dispatch: false}   
    )
}