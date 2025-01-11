import { createAction, props } from "@ngrx/store";

export const selectResourceChatAction = createAction("[Resource Chat] Select Resource Chat", props<{ chatId: string }>());