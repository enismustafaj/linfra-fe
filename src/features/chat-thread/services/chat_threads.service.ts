import { Injectable } from "@angular/core";
import { RestService } from "../../../core/services/rest.service";
import { Observable } from "rxjs";
import { ChatThread } from "../model/chat_thread.model";

@Injectable()
export class ChatThreadsService {

    private chatThreadsUtl: string = '/v1/threads'

    constructor(private restClient: RestService) { }

    getChatThreads(): Observable<ChatThread[]> {
        return this.restClient.getRequest(this.chatThreadsUtl)
    }
}