import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { ChatThread } from "../../model/chat_thread.model";
import { ChatThreadsService } from "../../services/chat_threads.service";
import { ResourceThreadComponent } from "../resource_thread/resource_thread.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-chat-threads',
    templateUrl: './chat_threads.component.html',
    styleUrls: ['./chat_threads.component.scss'],
    standalone: true,

    imports: [
        CommonModule,
        ResourceThreadComponent
    ],
    providers: [
        ChatThreadsService
    ]
})
export class ChatThreadsComponent implements OnInit {

    chatThreads: Observable<ChatThread[]> = of([])

    constructor(
        private chatThreadsService: ChatThreadsService
    ) { }

    ngOnInit(): void {
        this.chatThreads = this.chatThreadsService.getChatThreads()
    }

}