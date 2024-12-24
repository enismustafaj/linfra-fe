import { Component, Input } from "@angular/core";
import { ResourceProperty } from "../../model/resource_property.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-resource",
  templateUrl: "./resource.component.html",
  styleUrl: "./resource.component.scss",

  standalone: true,
  imports: [CommonModule]
})
export class ResourceComponent{

  @Input()
  resourceName: string = "";

  @Input()
  resourceProperties: ResourceProperty[] = [];
}
