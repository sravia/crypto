import { Component } from '@angular/core';
import { Http }      from '@angular/http';
import {Router} from '@angular/router';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})

export class ServicesComponent {
  constructor(private router: Router,public auth: AuthService) {}


  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/user/login']);
  }
};