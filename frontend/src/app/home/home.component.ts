import {Component} from '@angular/core';
import {AuthService} from '../user/auth.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    constructor(public auth: AuthService) {
    }


}