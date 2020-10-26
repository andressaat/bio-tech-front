import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '@shared/models';

import { BaseService } from './base.service';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super()
  }

  listAll(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(`${environment.API_ENDPOINT}/produtos`);
  }
}
