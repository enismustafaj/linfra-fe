import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { ChatThreadsService } from "../../services/chat_threads.service";
import { Observable, of, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { ResourceChatState } from "../../store/resource_chat.store";
import { chatIdSelector } from "../../store/selector/resource_chat.selector";

@Component({
    selector: 'app-resource-thread',
    templateUrl: './resource_thread.component.html',
    styleUrls: ['./resource_thread.component.scss'],

    standalone: true,
    imports:[
        CommonModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule
    ],
    providers: [
        ChatThreadsService
    ]
})
export class ResourceThreadComponent implements OnInit, OnDestroy {

    chatId$: Observable<string | null> = of(null)
    private chatIdSubscription: Subscription | null = null

    inputMessage: string = ''

    messages: string[] = []

    constructor(
        private resourceChatService: ChatThreadsService,
        private resourceChatStore: Store<ResourceChatState>
    ) { }

    ngOnInit(): void {
        this.chatId$ = this.resourceChatStore.select(chatIdSelector)

        this.chatIdSubscription = this.chatId$.subscribe(chatId => {
            if(chatId) {
                this.getChatMessages(chatId)
            }
        })
    }

    ngOnDestroy(): void {
        if (this.chatIdSubscription) {
            this.chatIdSubscription.unsubscribe()
        }
    }

    getResourceChats() {
        console.log('Getting resource chats')
    }

    sendMessage() {
        console.log('Sending message')
    }

    getChatMessages(chatId: string) {
        console.log('Getting chat messages')
    }
}