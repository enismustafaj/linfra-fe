import { Component } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { ResourceChatState } from "../../store/resource_chat.store";
import { Store } from "@ngrx/store";
import { chatIdSelector } from "../../store/selector/resource_chat.selector";
import { ChatThreadsService } from "../../services/chat_threads.service";
import { ResourceOverview } from "../../model/resource_overview.model";
import { CommonModule } from "@angular/common";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
    selector: "app-resource-overview",
    templateUrl: "./resource_overview.component.html",
    styleUrls: ["./resource_overview.component.scss"],

    standalone: true,
    providers: [ChatThreadsService],
    imports: [CommonModule, NzIconModule, NzToolTipModule]
})
export class ResourceOverviewComponent {

    chatId$: Observable<string | null> = of(null)
    private chatIdSubscription: Subscription | null = null

    selectedResource: Observable<ResourceOverview | null> = of({
        "name": "resource",
        "resourceType": "DB",
        "status": "running"
    })

    constructor(
        private chatThreadsService: ChatThreadsService,
        private resourceChatStore: Store<ResourceChatState>
    ) {
        this.chatId$ = this.resourceChatStore.select(chatIdSelector)
        
        this.chatIdSubscription = this.chatId$.subscribe(chatId => {
            if(chatId) {
                this.getResourceForChatId(chatId)
            }
        })
    }

    private getResourceForChatId(chatId: string): void {
        this.selectedResource = this.chatThreadsService.getResourceOverview(chatId)
    }

    revealSecrets(): void {
        console.log("Revealing secrets")
    }

}