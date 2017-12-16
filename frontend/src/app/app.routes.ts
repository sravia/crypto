import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Route, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './home/services/services.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './user/signup/signup.component';

import { ProfileComponent } from './user/profile/profile.component';
import { AuthenticatedGuard } from './user/authenticated.guard';
import { UnauthenticatedGuard } from './user/unauthenticated.guard';

const APP_ROUTES: Routes = [
    { path: 'user', component: UserComponent,
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent, canActivate: [UnauthenticatedGuard] },
        { path: 'profile', component: ProfileComponent, canActivate: [AuthenticatedGuard] },
        { path: 'signup', component: SignupComponent, canActivate: [UnauthenticatedGuard] },
      ]
    },
    { path: 'home', component: HomeComponent, canActivate: [AuthenticatedGuard],
      children: [
        { path: '', redirectTo: 'services', pathMatch: 'full' },
        { path: 'services', component: ServicesComponent },
      ]
    },
    { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule {}
