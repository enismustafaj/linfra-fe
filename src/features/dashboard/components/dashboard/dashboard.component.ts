import { Component, OnInit } from "@angular/core";
import { ResourceComponent } from "../resource/resource.component";
import { ResourceService } from "../../services/resource.service";
import { Observable, of } from "rxjs";
import { Resource } from "../../model/resource.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss",
    standalone: true,   

    providers: [ResourceService],
    imports: [CommonModule, ResourceComponent]
    
})
export class DashboardComponent implements OnInit {

    protected resources$: Observable<Resource[]> = of();

    constructor(private resourceService: ResourceService){}


    ngOnInit(): void {
        // this.resources$ = this.resourceService.getResources();

        this.resources$ = of([{
            resouceName: "resource",
            resourceType: "database",
            resourceProperties: []
        }]);
    }

}