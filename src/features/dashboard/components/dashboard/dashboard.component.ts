import { Component, OnInit } from "@angular/core";
import { ResourceComponent } from "../resource/resource.component";
import { ResourceService } from "../../services/resource.service";
import { Observable, of } from "rxjs";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { Resources } from "../../../../core/model/resource.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  standalone: true,

  providers: [ResourceService],
  imports: [CommonModule, ResourceComponent, NzButtonModule, NzIconModule],
})
export class DashboardComponent implements OnInit {
  resources$: Observable<Resources> = of();

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.resources$ = this.resourceService.getResources().pipe();
  }
}
