import { RestService } from "../../../../core/services/rest.service";
import { ResourceActionEnum } from "../../model/resource_action_enum";
import { ResourceActionStrategy } from "../resource_action_strategy";
import { ResourceProposalModel } from "../../model/resource_proposal.model";
import { Injectable } from "@angular/core";

@Injectable()
export class ResourceCreateAction extends ResourceActionStrategy {
  private createResourceUrl = "";

  constructor(private restClient: RestService) {
    super();
  }

  override supportAction(actionType: ResourceActionEnum): boolean {
    return actionType == ResourceActionEnum.CREATE;
  }

  override execute(resource: ResourceProposalModel): void {
    console.log("sending request to create resource");
  }
}
