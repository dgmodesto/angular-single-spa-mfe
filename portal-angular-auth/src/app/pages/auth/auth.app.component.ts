import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-auth-root',
    template: '<router-outlet></router-outlet>'
})

export class AuthAppComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
    }
    
}