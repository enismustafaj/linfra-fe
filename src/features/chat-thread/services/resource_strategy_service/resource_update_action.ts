import { Injectable } from "@angular/core";
import { RestService } from "../../../../core/services/rest.service";
import { ResourceActionEnum } from "../../model/resource_action_enum";
import { ResourceProposalModel } from "../../model/resource_proposal.model";
import { ResourceActionStrategy } from "../resource_action_strategy";

@Injectable()
export class ResourceUpdateAction extends ResourceActionStrategy {
  private updateResourceUrl = "";

  constructor(private restClient: RestService) {
    super();
  }

  override supportAction(actionType: ResourceActionEnum): boolean {
    return actionType == ResourceActionEnum.UPDATE;
  }

  override execute(resource: ResourceProposalModel): void {
    console.log("sending request to update resource");
  }
}
