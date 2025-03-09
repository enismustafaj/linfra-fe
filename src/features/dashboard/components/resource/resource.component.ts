import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzCollapseComponent, NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzListModule } from "ng-zorro-antd/list";
import { ResourceProperty } from "../../../../core/model/resource_property.model";

@Component({
  selector: "app-resource",
  templateUrl: "./resource.component.html",
  styleUrl: "./resource.component.scss",

  standalone: true,
  imports: [CommonModule, NzCollapseModule, NzCollapseComponent, NzListModule],
})
export class ResourceComponent {
  @Input()
  resourceName = "";

  @Input()
  resourceProperties: ResourceProperty[] = [];
}
