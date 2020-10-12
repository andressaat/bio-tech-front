import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { JWTDecoded, Token } from './token';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(public authService: AuthService, public router: Router, private snackBar: MatSnackBar) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // this will be passed from the route config
    // on the data property
    const allowedRoles: string[] = route.data.allowedRoles;
    const token: Token = JSON.parse(localStorage.getItem('token'));
    // decode the token to get its payload
    const jwt: JWTDecoded = decode(token.accessToken);

    return this.authService.isLoggedIn
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn || !allowedRoles?.includes(jwt.role)) {
            // tslint:disable-next-line: max-line-length
            this.snackBar.open('Acesso negado. Você não tem permissão para executar esta ação ou acessar este recurso.', undefined, { duration: 8000, verticalPosition: 'bottom', panelClass: ['snack-error'] });
            return false;
          }
          return true;
        })
      );
  }
}
