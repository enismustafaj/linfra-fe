import { Component, OnInit } from "@angular/core";
import { Observable, of, take, tap } from "rxjs";
import { ChatThread } from "../../model/chat_thread.model";
import { ChatThreadsService } from "../../services/chat_threads.service";
import { ResourceThreadComponent } from "../resource_thread/resource_thread.component";
import { CommonModule } from "@angular/common";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { FormsModule } from "@angular/forms";
import { NzInputModule } from "ng-zorro-antd/input";
import { Store } from "@ngrx/store";
import { ResourceChatState } from "../../store/resource_chat.store";
import { selectResourceChatAction } from "../../store/action/resource_chat.action";
import { ResourceOverviewComponent } from "../resource_overview/resource_overview.component";

@Component({
    selector: 'app-chat-threads',
    templateUrl: './chat_threads.component.html',
    styleUrls: ['./chat_threads.component.scss'],
    standalone: true,

    imports: [
    CommonModule,
    NzIconModule,
    NzButtonModule,
    ResourceThreadComponent,
    NzFormModule,
    FormsModule,
    NzInputModule,
    ResourceOverviewComponent
],
    providers: [
        ChatThreadsService
    ]
})
export class ChatThreadsComponent implements OnInit {

    chatThreads: Observable<ChatThread[]> = of()

    isVisible: boolean = false
    private chatThreadName: string = 'Untitled thread'

    edittingThread: string = "";

    constructor(
        private chatThreadsService: ChatThreadsService,
        private resourceStore: Store<ResourceChatState>
    ) { }

    ngOnInit(): void {
        this.chatThreads = this.chatThreadsService.getChatThreads()
    }

    createThread(): void {
        this.chatThreadsService.createChatThread(this.chatThreadName)
        .pipe(
            take(1),
            tap(() => {
                this.chatThreads = this.chatThreadsService.getChatThreads()
            })
        ).subscribe()
    }

    selectChatThread(thread: ChatThread): void {
        this.resourceStore.dispatch(selectResourceChatAction({chatId: thread.chatThreadId}))
    }

    editThread(threadId: string): void {
        this.edittingThread = threadId
    }

    saveThread(threadId: string): void {
        this.chatThreadsService.editThreadName(threadId, this.chatThreadName)
    }

    cancelEdit(): void {
        this.edittingThread = ""
    }

}