import { ResourceProperty } from "./resource_property.model";

export interface Resource {
  resouceName: string,
  resourceType: string,
  resourceProperties: ResourceProperty[]
}
