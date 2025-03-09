import { ResourceActionEnum } from "./resource_action_enum";

export interface ResourceProposalModel {
  id: string | null;
  name: string;
  type: string;
  size: string;
  action: ResourceActionEnum;
}
