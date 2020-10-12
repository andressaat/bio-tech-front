import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Credentials, User } from './user';
import { JWTDecoded, Token } from './token';
import decode from 'jwt-decode';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentToken = new BehaviorSubject<Token>(undefined);
  private currentJWT = new BehaviorSubject<JWTDecoded>(undefined);

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
    let token: Token;

    try{
     token  = JSON.parse(localStorage.getItem('token'));
    }catch (err){
      localStorage.removeItem('token');
      token = undefined;
    }

    if (token){
      const decoded: JWTDecoded = decode(token.accessToken);
      this.currentJWT.next(decoded);
      const { exp } = decoded;
      console.log(new Date(exp * 1000));
      if (exp && Date.now() >= exp * 1000) {
        console.log('token is expired');
        this.loggedIn.next(false);
        this.currentToken.next(undefined);
      } else {
        console.log('token is not expired');
        this.loggedIn.next(true);
        this.currentToken.next(token);
      }
    }
   }

  login(credentials: Credentials): void {
    if (credentials.email !== '' && credentials.password !== '') {
      this.oauth(credentials).subscribe((token) => {
        this.loggedIn.next(true);
        this.currentToken.next(token);
        localStorage.setItem('token', JSON.stringify(token));
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
        .post<Token>(`${environment.API_ENDPOINT}/users/refresh-login`, credentials);
      // .pipe(catchError(this.handleError<Token>('oauth')));
  }

  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
