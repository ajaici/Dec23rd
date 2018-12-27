import { Injectable } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http/';
import { HttpRequest } from '@angular/common/http/src/request';
import { HttpHandler } from '@angular/common/http/src/backend';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http/';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {

                    if (error.status === 401) {
                        return throwError(error.statusText);
                    }

                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modelStateErrors = '';

                    if (serverError && serverError === 'object') {
                        // tslint:disable-next-line:forin
                        for (const key in serverError) {
                            if (serverError[key]) {
                            modelStateErrors += serverError[key] + '\n';
                            }
                        }
                        console.error(modelStateErrors);
                        console.error(serverError);
                    }

                    return throwError(modelStateErrors || serverError || 'Server Error');
                }
            })
        );

    }
}


export const ErrorInterceptorProvider = {

    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
