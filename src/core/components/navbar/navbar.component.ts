import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule, NzSubMenuComponent, NzSubmenuService } from 'ng-zorro-antd/menu';

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",

    standalone: true,
    imports: [
        NzLayoutModule,
        NzMenuModule,
        NzDropDownModule,
        NzButtonModule,
        NzIconModule,
        RouterModule,
        CommonModule
    ]
})
export class NavBarComponent {

}