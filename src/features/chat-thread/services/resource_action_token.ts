import { InjectionToken } from "@angular/core";
import { ResourceActionStrategy } from "./resource_action_strategy";

export const ResourceActionToken = new InjectionToken<ResourceActionStrategy[]>(
  "ResourceActionToken",
  {
    factory: () => [],
  },
);
