import { Component, Input } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./resource.component.html",
  styleUrl: "./resource.component.scss"
})
export class ResourceComponent {

  @Input()
  private resourceName: string;
}
