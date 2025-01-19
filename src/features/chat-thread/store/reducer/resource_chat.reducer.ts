import { createFeature, createReducer, on } from "@ngrx/store";
import { selectResourceChatAction } from "../action/resource_chat.action";
import { ResourceChatState } from "../resource_chat.store";

const resourceChatInitState: ResourceChatState = {
    chatId: ""
}

const resourceChatReducer = createReducer(
    resourceChatInitState,
    on(selectResourceChatAction, (state, { chatId }) => {
        return {
            ...state,
            chatId: chatId
        }
    })
)


export const resourceChatFeature = createFeature({
    name: "resourceChat",
    reducer: resourceChatReducer
})
