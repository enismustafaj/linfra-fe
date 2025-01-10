import { Component } from "@angular/core";

@Component({
    selector: 'app-resource-thread',
    templateUrl: './resource_thread.component.html',
    styleUrls: ['./resource_thread.component.scss'],

    standalone: true
})
export class ResourceThreadComponent {
    
    constructor() { }

    getResourceChats() {
        console.log('Getting resource chats')
    }
}