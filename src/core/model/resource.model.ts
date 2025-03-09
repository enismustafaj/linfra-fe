import { ResourceProperty } from "./resource_property.model";

export interface Resource {
  id: string | null;
  name: string;
  resourceType: string;
  status: string;
  properties: ResourceProperty[];
}

export interface Resources {
  resources: Resource[];
}
