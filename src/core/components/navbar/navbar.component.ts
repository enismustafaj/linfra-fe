import { Component } from "@angular/core";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",

    standalone: true,
    imports: [
        NzLayoutModule,
        NzMenuModule
    ]
})
export class NavBarComponent {

}