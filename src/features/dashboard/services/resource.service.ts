import { RestService } from "../../../core/services/rest.service";
import { Observable } from "rxjs";
import { Resource } from "../model/resource.model";
import { Injectable } from "@angular/core";

@Injectable()
export class ResourceService {

  constructor(private restClient: RestService) { }

  getResources(): Observable<Resource[]> {
    return this.restClient.getRequest("/api/v1/resources")
  }

}
