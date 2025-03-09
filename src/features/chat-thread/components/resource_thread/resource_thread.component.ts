import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { ChatThreadsService } from "../../services/chat_threads.service";
import {
  filter,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  tap,
} from "rxjs";
import { Store } from "@ngrx/store";
import { ResourceChatState } from "../../store/resource_chat.store";
import { chatIdSelector } from "../../store/selector/resource_chat.selector";
import { ChatPrompt } from "../../model/chat_prompt.model";
import { ResourceActionStrategy } from "../../services/resource_action_strategy";
import { ResourceCreateAction } from "../../services/resource_strategy_service/resource_create_action";
import { ResourceActionDispatcherService } from "../../services/resource_action_dispatcher.service";
import { ResourceProposalModel } from "../../model/resource_proposal.model";
import { zu } from "zod_utilz";
import { ResourceUpdateAction } from "../../services/resource_strategy_service/resource_update_action";

@Component({
  selector: "app-resource-thread",
  templateUrl: "./resource_thread.component.html",
  styleUrls: ["./resource_thread.component.scss"],

  standalone: true,
  imports: [CommonModule, NzInputModule, NzButtonModule, NzIconModule],
  providers: [
    ChatThreadsService,
    {
      provide: ResourceActionStrategy,
      useClass: ResourceCreateAction,
      multi: true,
    },
    {
      provide: ResourceActionStrategy,
      useClass: ResourceUpdateAction,
      multi: true,
    },
    ResourceActionDispatcherService,
  ],
})
export class ResourceThreadComponent implements OnInit, OnDestroy {
  chatId$: Observable<string | null> = of(null);
  private chatIdSubscription: Subscription | null = null;

  inputMessage = "";

  responseLoading = false;

  messageInputEnabled = false;

  messages: ChatPrompt[] = [];

  selectedChatId: string | null = null;

  constructor(
    private resourceChatService: ChatThreadsService,
    private resourceChatStore: Store<ResourceChatState>,
    private resourceActionDispatcher: ResourceActionDispatcherService,
  ) {}

  ngOnInit(): void {
    this.chatId$ = this.resourceChatStore.select(chatIdSelector);

    this.chatIdSubscription = this.chatId$.subscribe((chatId) => {
      if (chatId) {
        this.getChatMessages(chatId);
        this.messageInputEnabled = true;
      } else {
        this.messageInputEnabled = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chatIdSubscription) {
      this.chatIdSubscription.unsubscribe();
    }
  }

  sendMessage() {
    this.messageInputEnabled = false;
    this.responseLoading = true;

    this.chatId$
      .pipe(
        take(1),
        filter((id) => id != null && id != undefined),
        tap((chatId) => {
          this.messages.push({
            id: "",
            role: "user",
            text: this.inputMessage,
            metadata: null,
          });

          this.selectedChatId = chatId;
        }),
        switchMap(() => {
          return this.resourceChatService.sendMessage(
            this.selectedChatId!,
            this.inputMessage,
          );
        }),
        tap((prompts: ChatPrompt[]) => {
          this.messages[this.messages.length - 1].id = prompts[0].id;
          this.messages.push(prompts[prompts.length - 1]);
        }),

        switchMap(() => {
          return this.resourceChatService.getResourceSuggestion(
            this.selectedChatId!,
          );
        }),
      )
      .subscribe((suggestionPrompt: ChatPrompt) => {
        this.messages.push(suggestionPrompt);

        this.messageInputEnabled = true;
        this.responseLoading = false;
      });
  }

  getChatMessages(chatId: string) {
    this.resourceChatService
      .getChatMessages(chatId)
      .pipe(take(1))
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  applyAction(chatPrompt: ChatPrompt) {
    const schema = zu.stringToJSON();
    const proposal: ResourceProposalModel = schema.parse(
      chatPrompt.text,
    ) as ResourceProposalModel;

    this.resourceActionDispatcher.displatchAction(proposal);
  }
}
