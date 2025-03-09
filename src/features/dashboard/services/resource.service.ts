import { RestService } from "../../../core/services/rest.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Resources } from "../../../core/model/resource.model";

@Injectable()
export class ResourceService {
  constructor(private restClient: RestService) {}

  getResources(): Observable<Resources> {
    return this.restClient.getRequest("/v1/resources");
  }
}
