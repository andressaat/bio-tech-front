import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Credentials, User } from './user';
import { Token } from './token';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private loggedIn = new BehaviorSubject<boolean>(false);

  private currentToken = new BehaviorSubject<Token>(undefined);
  private token: Token;

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

  login(credentials: Credentials): void {
    if (credentials.email !== '' && credentials.password !== '') {
      this.oauth(credentials).subscribe((token) => {
        this.loggedIn.next(true);
        this.currentToken.next(token);
        this.token = token;
        localStorage.setItem('token', token.token);
        this.router.navigate(['/']);
      });
    }
  }

  currentUser(): Observable<User>{
    return this.http
      .get<User>(`${environment.API_ENDPOINT}/whoAmI`);
  }

  private oauth(credentials: Credentials): Observable<Token> {
      return this.http
        .post<Token>(`${environment.API_ENDPOINT}/users/login`, credentials);
      // .pipe(catchError(this.handleError<Token>('oauth')));
  }

  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
