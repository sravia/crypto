import {Component} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {AuthService} from './user/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router, public auth: AuthService) {
    }

}
