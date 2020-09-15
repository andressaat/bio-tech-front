import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Token } from '../auth/token';

@Component({
  selector: 'app-home',
  template: `<p>Seja bem vindo, {{ (currentToken$ | async)?.user.nome }}!</p>`,
  styles: []
})
export class HomeComponent implements OnInit {

  currentToken$: Observable<Token>;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.currentToken$ = this.authService.hasToken;
  }
}
