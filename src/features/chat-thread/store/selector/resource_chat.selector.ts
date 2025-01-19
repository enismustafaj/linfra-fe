import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ResourceChatState } from "../resource_chat.store";

export const resourceChatState =
  createFeatureSelector<ResourceChatState>("resourceChat");

export const selectChatId = (state: ResourceChatState) => state.chatId;

export const chatIdSelector = createSelector(
    resourceChatState,
    selectChatId
);