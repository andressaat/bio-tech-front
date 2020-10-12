import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { from } from 'rxjs';
import { Token } from './token';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class OauthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next)).pipe(catchError(x => this.handleAuthError(x)));
  }


  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
    Promise<HttpEvent<any>> {
    const token: Token = JSON.parse(localStorage.getItem('token'));
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings.Authorization = 'Bearer ' + token.accessToken;
    }
    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader
    });
    return next.handle(changedRequest).toPromise();
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // 403 Access denied
    if (err.status === 403) {

      // tslint:disable-next-line: max-line-length
      this.snackBar.open('Acesso negado. Você não tem permissão para executar esta ação ou acessar este recurso.', undefined, { duration: 8000, verticalPosition: 'bottom', panelClass: ['snack-error'] });

      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}
