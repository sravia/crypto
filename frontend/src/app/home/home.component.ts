import { Component } from '@angular/core';
import { Http }      from '@angular/http';
import { AuthService } from '../user/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor(public auth: AuthService) {}


};