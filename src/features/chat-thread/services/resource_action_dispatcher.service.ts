import { Inject, Injectable } from "@angular/core";
import { ResourceActionStrategy } from "./resource_action_strategy";
import { ResourceProposalModel } from "../model/resource_proposal.model";

@Injectable()
export class ResourceActionDispatcherService {
  constructor(
    @Inject(ResourceActionStrategy)
    private resourceStrategies: ResourceActionStrategy[],
  ) {}

  displatchAction(resource: ResourceProposalModel) {
    const chosenStrategy = this.resourceStrategies.filter((strateg) =>
      strateg.supportAction(resource.action),
    );

    if (chosenStrategy.length == 0) {
      console.error("No strategy found for resource action");
    } else {
      const actionStrategy = chosenStrategy[0];

      actionStrategy.execute(resource);
    }
  }
}
