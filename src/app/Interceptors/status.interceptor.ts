import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuthenticationService } from '../Services/authentication.service';


@Injectable({
    providedIn: 'root'
})
export class StatusHttpInterceptor implements HttpInterceptor {

    constructor() {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {

            //debugger;

            if (error.status === 401) {

                // se borra el token guardado y se reinicia la pagina para luego redireccionar con el Guard                
                localStorage.clear();
                window.location.reload();
            }

            // console.log('Fin Status Interceptor');
            return throwError(error);
        }));

    }

}