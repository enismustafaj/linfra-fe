import { Injectable } from "@angular/core";
import { RestService } from "../../../core/services/rest.service";
import { Observable, of } from "rxjs";
import { ChatThread } from "../model/chat_thread.model";

@Injectable()
export class ChatThreadsService {

    private chatThreadsUtl: string = '/v1/threads'

    constructor(private restClient: RestService) { }

    getChatThreads(): Observable<ChatThread[]> {
        // return this.restClient.getRequest(this.chatThreadsUtl)

        return of([
            {
                threadId: "id1",
                threadName: "name1"
            },
            {
                threadId: "id2",
                threadName: "name2"
            },
            {
                threadId: "id3",
                threadName: "name3"
            },
            {
                threadId: "id4",
                threadName: "name4"
            }
        ])
    }
}