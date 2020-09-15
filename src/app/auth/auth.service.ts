import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Token } from './token';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private loggedIn = new BehaviorSubject<boolean>(false);

  private currentToken = new BehaviorSubject<Token>(undefined);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get hasToken(): Observable<Token> {
    return this.currentToken.asObservable();
  }

  constructor(
    public http: HttpClient,
    private router: Router
  ) {
   }

  login(user: User): void {
    if (user.login !== '' && user.senha !== '') {
      this.oauth(user).subscribe((token) => {
        this.loggedIn.next(true);
        this.currentToken.next(token);
        this.router.navigate(['/']);
      });
    }
  }

  private oauth(user: User): Observable<Token> {
      return this.http
        .post<Token>(`${environment.API_ENDPOINT}/login`, user);
      // .pipe(catchError(this.handleError<Token>('oauth')));
  }

  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
