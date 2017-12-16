import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class AuthService {
    public error: string;
    public loggedIn = false;
    private _jwtHelper: JwtHelper = new JwtHelper();
    private API = "/api/user";
    private user;

    constructor(private http: Http, private router: Router) {
        this.getAuthenticatedState();
    }

    public getAuthenticatedState(): Promise<Boolean> {
        var token = localStorage['id_token'];
        const tokenIsPresentAndExpired = token && this._jwtHelper.isTokenExpired(token);

        return this.http.get(this.API + '/authenticate')
            .map(res => res.json())
            .toPromise()
            .then(res => {
                if (res && res.token) {
                    this.setAuthenticatedUser(res);
                    return true;
                }
                return false;
            });
    }

    public login(form): void {
        this.http.post(this.API + '/login', form)
            .map(res => res.json())
            .subscribe(res => this.handleLogin.call(this, res),
                err => this.error = JSON.parse(err._body).msg);
    }

    public signup(user): void {
        this.http.post(this.API + '/signup', user)
            .toPromise()
            .then(res => {
                var formattedRes = JSON.parse(res["_body"]);
                this.error = formattedRes.message;
                if (formattedRes.success) {
                    this.login(user);
                }
                return false;
            });
    }

    public logout(): void {
        if (!localStorage['id_token']) {
            return;
        }

        this.http.get(this.API + '/logout')
            .subscribe(() => {
                this.loggedIn = false;
                localStorage.removeItem('id_token');
            });
    }

    public updateProfile(form): Observable<boolean> {
        let body = JSON.stringify(form);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.API + '/profile', body, options).map((res) => this.setProfile(res));
    }


    public setProfile(res) {
        let body = JSON.parse(res["_body"]);
        this.user = body['user'];
        return body;
    }

    public getUser() {
        return this.user;
    }

    public setAuthenticatedUser(res) {
        this.loggedIn = true;
        localStorage['id_token'] = res.token;
    }

    private handleLogin(res): void {
        console.log(res.status.message);

        this.error = res.status.message;
        if (res.status.success) {
            this.setAuthenticatedUser(res);
            this.router.navigate(['/home']);
        }

    }

}
 