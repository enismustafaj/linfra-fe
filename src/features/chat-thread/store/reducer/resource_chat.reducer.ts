import { createReducer, on } from "@ngrx/store";
import { selectResourceChatAction } from "../action/resource_chat.action";
import { ResourceChatState } from "../resource_chat.store";

export const resourceChatInitState: ResourceChatState = {
    chatId: null
}

export const resourceChatReducer = createReducer(
    resourceChatInitState,
    on(selectResourceChatAction, (state, { chatId }) => ({...state, chatId: chatId}))
)