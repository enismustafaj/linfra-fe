import { createReducer, on } from "@ngrx/store";
import { UserState } from "../user.store";
import { userloggedInAction } from "../actions/user.actions";

export const userInitState: UserState = {
    user: null
}

export const userReducer = createReducer(
    userInitState,
    on(userloggedInAction, (state, { user }) => ({...state, user: user}))
)   