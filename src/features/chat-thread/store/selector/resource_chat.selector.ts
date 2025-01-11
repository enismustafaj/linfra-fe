import { createSelector } from "@ngrx/store";
import { ResourceChatState } from "../resource_chat.store";

export const selectChatId = (state: ResourceChatState) => state.chatId;

export const chatIdSelector = createSelector(
    (state: ResourceChatState) => state,
    selectChatId
);