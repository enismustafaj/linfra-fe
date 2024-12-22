import { Inject } from "@angular/core";
import { RestService } from "../../../services/rest.service";
import { Observable } from "rxjs";
import { Resource } from "../model/resource.model";

@Inject
export class ResourceService {

  constructor(private restClient: RestService) { }

  getResources(): Observable<Resource[]> {
    return this.restClient.getRequest("")
  }

}
