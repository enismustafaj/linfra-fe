import { User } from "@angular/fire/auth"
import { createAction, props } from "@ngrx/store"

export const userloggedInAction = createAction(
    "User Logged in",
    props<{user: User}>()
)