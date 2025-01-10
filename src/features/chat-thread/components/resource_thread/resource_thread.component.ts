import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";

@Component({
    selector: 'app-resource-thread',
    templateUrl: './resource_thread.component.html',
    styleUrls: ['./resource_thread.component.scss'],

    standalone: true,
    imports:[
        CommonModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule
    ]
})
export class ResourceThreadComponent {
    
    constructor() { }

    inputMessage: string = ''

    messages: string[] = []

    getResourceChats() {
        console.log('Getting resource chats')
    }

    sendMessage() {
        console.log('Sending message')
    }
}