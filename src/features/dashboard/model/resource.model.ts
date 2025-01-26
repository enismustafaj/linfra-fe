import { ResourceProperty } from "./resource_property.model";

export interface Resource {
  name: string,
  resourceType: string,
  status: string,
  properties: ResourceProperty[]
}

export interface Resources {
  resources: Resource[]
}
