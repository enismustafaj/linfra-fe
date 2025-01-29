import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { ChatThreadsService } from "../../services/chat_threads.service";
import { Observable, of, Subscription, take } from "rxjs";
import { Store } from "@ngrx/store";
import { ResourceChatState } from "../../store/resource_chat.store";
import { chatIdSelector } from "../../store/selector/resource_chat.selector";
import { ChatPrompt } from "../../model/chat_prompt.model";

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

    responseLoading: boolean = false

    messageInputEnabled: boolean = false

    messages: ChatPrompt[] = []

    constructor(
        private resourceChatService: ChatThreadsService,
        private resourceChatStore: Store<ResourceChatState>
    ) { }

    ngOnInit(): void {
        this.chatId$ = this.resourceChatStore.select(chatIdSelector)

        this.chatIdSubscription = this.chatId$.subscribe(chatId => {
            if(chatId) {
                this.getChatMessages(chatId)
                this.messageInputEnabled = true
            } else {
                this.messageInputEnabled = false
            }
        })
    }

    ngOnDestroy(): void {
        if (this.chatIdSubscription) {
            this.chatIdSubscription.unsubscribe()
        }
    }

    sendMessage() {
        this.chatId$.pipe(
            take(1)
        ).subscribe(chatId => {
            if(chatId) {
                this.messages.push({
                    id: '',
                    role: 'user',
                    text: this.inputMessage,
                    metadata: null
                })
                this.resourceChatService.sendMessage(chatId, this.inputMessage)
                .pipe(
                    take(1)
                ).subscribe((prompts: ChatPrompt[]) => {
                    this.messages[this.messages.length - 1].id = prompts[0].id
                    this.messages.push(prompts[prompts.length - 1])
                })
            }
        })
    }

    getChatMessages(chatId: string) {
        this.resourceChatService.getChatMessages(chatId)
        .pipe(
            take(1)
        ).subscribe(messages => {
            this.messages = messages
        })
    }

    applyAction() {
        console.log("Applying action")
    }
}