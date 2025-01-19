import { Injectable } from "@angular/core";
import { RestService } from "../../../core/services/rest.service";
import { map, Observable, of } from "rxjs";
import { ChatThread } from "../model/chat_thread.model";
import { ChatPrompt } from "../model/chat_prompt.model";

@Injectable()
export class ChatThreadsService {

    private chatThreadsUtl: string = '/v1/threads'

    private chatMessagesUrl: string = '/v1/threads/:threadId'

    constructor(private restClient: RestService) { }

    getChatThreads(): Observable<ChatThread[]> {
        return this.restClient.getRequest(this.chatThreadsUtl).pipe(
            map((response: any) => {
                return response["threads"]
            })
        )
    }

    createChatThread(threadName: string): Observable<any> {
        return this.restClient.postRequest(this.chatThreadsUtl, {
            threadName: threadName
        })
    }

    getChatMessages(chatThreadId: string): Observable<ChatPrompt[]> {
        return this.restClient.getRequest(this.chatMessagesUrl.replace(':threadId', chatThreadId)).pipe(
            map((response: any) => {
                return response["prompts"]
            })
        )
    }

    sendMessage(chatThreadId: string, message: string): Observable<ChatPrompt[]> {
        return this.restClient.postRequest(this.chatMessagesUrl.replace(':threadId', chatThreadId), {
            message: message
        }).pipe(
            map((response: any) => {
                return response["prompts"]
            })
        )
    }

}