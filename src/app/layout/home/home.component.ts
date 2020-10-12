import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { Token } from '@app/auth/token';
import { User } from '@app/auth/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
