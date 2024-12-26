import { Component, OnInit } from "@angular/core";
import { ResourceComponent } from "../resource/resource.component";
import { ResourceService } from "../../services/resource.service";
import { Observable, of } from "rxjs";
import { Resource } from "../../model/resource.model";
import { CommonModule } from "@angular/common";
import { NzCollapseComponent } from "ng-zorro-antd/collapse";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss",
    standalone: true,   

    providers: [ResourceService],
    imports: [CommonModule, ResourceComponent]
    
})
export class DashboardComponent implements OnInit {

    resources$: Observable<Resource[]> = of([{
        resouceName: "resource",
        resourceType: "database",
        resourceProperties: [
            {
                propertyName: "prop1",
                propertyValue: "val1"
            }
        ]
    },
    {
        resouceName: "resource",
        resourceType: "database",
        resourceProperties: []
    },
    {
        resouceName: "resource",
        resourceType: "database",
        resourceProperties: []
    },
    {
        resouceName: "resource",
        resourceType: "database",
        resourceProperties: []
    }]);

    constructor(private resourceService: ResourceService){}


    ngOnInit(): void {
        // this.resources$ = this.resourceService.getResources();
    }

}