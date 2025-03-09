import { ResourceActionEnum } from "../model/resource_action_enum";
import { ResourceProposalModel } from "../model/resource_proposal.model";

export abstract class ResourceActionStrategy {
  abstract supportAction(actionType: ResourceActionEnum): boolean;

  abstract execute(resource: ResourceProposalModel): void;
}
