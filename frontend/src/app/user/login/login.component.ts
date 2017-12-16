import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './../auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(public authService: AuthService, private _fb: FormBuilder) {
    }

    public login(): void {
        const form = this.loginForm.value;
        this.authService.login(form);
    }

    ngOnDestroy() {
        this.authService.error = null;
    }

    ngOnInit() {
        this.loginForm = this._fb.group({
            'email': ['', [
                Validators.required
            ]],
            'password': ['', [
                Validators.required,
                Validators.minLength(6)
            ]]
        });
    };
}
