import { Injectable } from "@angular/core";
import { RestService } from "../../../core/services/rest.service";
import { map, Observable } from "rxjs";
import { ChatThread } from "../model/chat_thread.model";
import { ChatPrompt } from "../model/chat_prompt.model";
import { ResourceOverview } from "../model/resource_overview.model";
import { ResourceProposalResponse } from "../model/resource_poposal_response";

@Injectable()
export class ChatThreadsService {
  private chatThreadsUtl = "/v1/threads";

  private chatMessagesUrl = "/v1/threads/:chatThreadId/conversations";

  private resourceOverviewUrl = "/v1/resources/chat-threads/:chatThreadId";

  private resourceSuggestionUrl =
    "/v1/resources/suggestions/threads/:chatThreadId";

  constructor(private restClient: RestService) {}

  getChatThreads(): Observable<ChatThread[]> {
    return this.restClient.getRequest(this.chatThreadsUtl).pipe(
      map((response: any) => {
        return response["threads"];
      }),
    );
  }

  createChatThread(threadName: string): Observable<any> {
    return this.restClient.postRequest(this.chatThreadsUtl, {
      threadName: threadName,
    });
  }

  getChatMessages(chatThreadId: string): Observable<ChatPrompt[]> {
    return this.restClient
      .getRequest(this.chatMessagesUrl.replace(":chatThreadId", chatThreadId))
      .pipe(
        map((response: any) => {
          return response["prompts"];
        }),
      );
  }

  sendMessage(chatThreadId: string, message: string): Observable<ChatPrompt[]> {
    return this.restClient
      .postRequest(
        this.chatMessagesUrl.replace(":chatThreadId", chatThreadId),
        {
          message: message,
        },
      )
      .pipe(
        map((response: any) => {
          return response["prompts"];
        }),
      );
  }

  getResourceOverview(chatThreadId: string): Observable<ResourceOverview> {
    return this.restClient.getRequest(
      this.resourceOverviewUrl.replace(":chatThreadId", chatThreadId),
    );
  }

  editThreadName(threadId: string, threadName: string): Observable<any> {
    return this.restClient.putRequest(this.chatThreadsUtl + "/" + threadId, {
      threadName: threadName,
    });
  }

  getResourceSuggestion(threadId: string): Observable<ChatPrompt> {
    return this.getResourceProposal(threadId).pipe(
      map((resourceSuggestion) => {
        return {
          id: resourceSuggestion["chatPromptId"],
          role: resourceSuggestion["role"],
          text: resourceSuggestion["suggestion"],
          metadata: null,
        };
      }),
    );
  }

  private getResourceProposal(
    threadId: string,
  ): Observable<ResourceProposalResponse> {
    return this.restClient.putRequest(
      this.resourceSuggestionUrl.replace(":chatThreadId", threadId),
      {},
    );
  }
}
