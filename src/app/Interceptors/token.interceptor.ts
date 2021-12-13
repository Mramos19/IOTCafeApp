
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class TokenHttpInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(_httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (localStorage.getItem(environment.tokenKey) != null)
            _httpRequest = _httpRequest.clone({ headers: _httpRequest.headers.set('Authorization', `Bearer ${localStorage.getItem(environment.tokenKey)}`) });

        return next.handle(_httpRequest);
    }
}