import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../user.store";

export const userState =
  createFeatureSelector<UserState>("user");

export const selectChatId = (state: UserState) => state.user;

export const userSelector = createSelector(
    userState,
    selectChatId
);