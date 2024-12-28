import { RestService } from "../../../core/services/rest.service";
import { Observable } from "rxjs";
import { Resources } from "../model/resource.model";
import { Injectable } from "@angular/core";

@Injectable()
export class ResourceService {

  constructor(private restClient: RestService) { }

  getResources(): Observable<Resources> {
    return this.restClient.getRequest("/v1/resources")
  }

}
