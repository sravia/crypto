import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent{

  error: string;
  status: string;

	form = new FormGroup({
		alexaId: new FormControl(),
  });
  
  constructor(public authService: AuthService) {
  }

  onSubmit(){
		
	}
}
