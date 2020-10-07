import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Token } from '../auth/token';
import { User } from '../auth/user';

@Component({
  selector: 'app-home',
  template: `<p>Seja bem vindo, {{user?.name}}!</p>`,
  styles: []
})
export class HomeComponent implements OnInit {

  currentToken$: Observable<Token>;
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.currentToken$ = this.authService.hasToken;
    this.authService.currentUser().subscribe(user => {
      this.user = user;
    });
  }
}
