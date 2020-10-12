import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pacote } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class PacotesService {

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  listAll(): Observable<Pacote[]> {
    return this.http
      .get<Pacote[]>(`${environment.API_ENDPOINT}/pacotes`);
  }
}
