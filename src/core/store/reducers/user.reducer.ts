import { createFeature, createReducer, on } from "@ngrx/store";
import { UserState } from "../user.store";
import { userloggedInAction } from "../actions/user.actions";

const userInitState: UserState = {
    user: null
}

const userReducer = createReducer(
    userInitState,
    on(userloggedInAction, (state, { user }) => ({...state, user: user}))
)

export const userFeature = createFeature({
    name: "user",
    reducer: userReducer
})