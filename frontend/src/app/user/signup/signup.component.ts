import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder,FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from './../auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  implements OnInit{
  public signupForm: FormGroup;
  constructor(public authService: AuthService, private _fb: FormBuilder) {
  }

  public signup(): void {
    const form = this.signupForm.value;
    this.authService.signup(form);
  }

  ngOnInit() {
    this.signupForm = this._fb.group({
      'email': ['', [
        Validators.required
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      'confirmPassword': ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }
}
