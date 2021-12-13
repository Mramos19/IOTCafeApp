import { environment } from './../../environments/environment';
import { AuthenticationService } from './../Services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(private _Router: Router) {
        console.log(_Router);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        if (localStorage.getItem(environment.tokenKey) === null) {
            this._Router.navigate(['/Authentication/Login']);
            return false;
        }

        return true;
    }

}